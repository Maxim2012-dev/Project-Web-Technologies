const express  = require('express');
const cors     = require('cors');
const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');
const jwt      = require('jsonwebtoken');

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const JWT_SECRET = 'altan=wkdvrtuaàlmjpé)&kmqm'

// ========================= SERVER SETUP =========================

app.listen(3000, () => {
  // To check if the server is successfully running
  console.log("Server started on port 3000")
})

// =================== CONNECTION WITH DATABASE ===================

mongoose.connect("mongodb://127.0.0.1:27017/eventguardDB");

var db = mongoose.connection;
db.on('open', () => {
  // To check whether the connection is successfully established 
  console.log('Connected to mongoDB');
});
db.on('error', (error) => {
  // Catch potential exceptions upon connection
  console.log(error)
});


let Organizer    = require('./schemas/organizer_schema')
let Provider     = require('./schemas/company_schema')
let productModel = require('./schemas/product_schema')

const { check, validationResult } = require('express-validator')


// ================== HANDLING POST REQUEST FOR LOGGING IN USER ==================

app.post('/login', async (req, res) => {
  const { username, password } = req.body
  var user = await Organizer.findOne({ username }).lean()
  var typeUser = 'organizer';

  // try to find the right user either in organizer collection or in provider
  if (!user) {
    user = await Provider.findOne({ username }).lean()
    typeUser = 'provider';
    if (!user) {
      return res.json({ status: 'error', error: 'Invalid username/password'})
    } 
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET)
    return res.json({ status: 'ok', data: token, type: typeUser})
  }
  return res.json({ status: 'error', error: 'Invalid username/password'})
})


// ================== HANDLING POST REQUEST FOR REGISTERING USER ==================

app.post('/register',
  check('name').not().isEmpty().withMessage('Name is required'),
  check('telnr').not().isEmpty().isMobilePhone().withMessage('Valid phone number required'),
  check('email').not().isEmpty().isEmail().withMessage('Valid email required'),
  check('username').isLength({ min: 6 }).withMessage('Username with minimum 6 characters required'),
  check('password').not().isEmpty().matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/)
    .withMessage('Valid password is required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json(errors.array());
    } else {
      const { radioSelect, name, telnr, email, username, password: plainTextPassword } = req.body;
      // save the password as the encrypted version of the plain text one
      const password = await bcrypt.hash(plainTextPassword, 10);
      var new_user = undefined;

      if (radioSelect == 'organizer'){
        new_user = new Organizer({ name, telnr, email, username, password });
      } else {
        new_user = new Provider({ name, telnr, email, username, password });
      }
      
      // save the new user with the parsed details to database
      if (new_user != undefined) {
        new_user.save((err) => {
          if (err && err.code === 11000) {
            return res.json({ status: 'error', error: 'Username already in use' })
          } else if (!err) {
            return res.json({ status: 'success' })
          }
        })
      } else { console.log("failed");}
    }
  })  

// POST REQUEST FOR SEARCH BAR RESULTS

app.post('/getCompanies', async (req, res) => {
  let payload = req.body.keyValue.trim();
  let search = await Provider.find({ name: {$regex: new RegExp('^'+payload+'.*','i')}}).exec();
  search = search.slice(0, 10);
  res.send({ payload: search });
})


// POST REQUEST FOR GETTING SPECIFIC USER

app.post('/getUser', async (req, res) => {
  let typeUser = req.body.typeUser;
  let usernameString = req.body.username;
  var result = undefined;
  // we select all fields except for the password
  // ===> we try to limit the password exchange from/to database as much as possible
  if (typeUser === 'organizer') {
    result = await Organizer.find({ username: usernameString }, { password: 0 });
  } else if (typeUser === 'provider') {
    result = await Provider.find({ username: usernameString }, { password: 0 });
  }
  if (result != undefined) {
    res.send({ payload: result });
  } else { return res.json({ status: 'error', error: 'Something went wrong.' }) }
})