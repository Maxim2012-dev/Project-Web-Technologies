const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const bodyParser = require('body-parser') 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())


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


let organizerModel = require('./schemas/organizer_schema')
let companyModel   = require('./schemas/company_schema')
let productModel   = require('./schemas/product_schema')


// ================== HANDLING POST REQUEST FOR ADDING USER ==================

app.post('/user/add', (req, res) => {
    console.log("user add")
    let new_user = new organizerModel;
    new_user.person_name = req.body.name;
    new_user.telnr = req.body.telnr;
    new_user.email = req.body.email;
    new_user.username = req.body.username;
    new_user.password = req.body.password;
    // save the new user with the parsed details to database
    new_user.save((err) => {
        if (err){
          res.send("error while adding user");
        } else {
          res.send("user added");
        }
    })    
})