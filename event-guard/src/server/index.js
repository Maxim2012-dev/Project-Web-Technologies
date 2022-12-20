const express  = require('express');
const cors     = require('cors');
const mongoose = require('mongoose');

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


// ========================= SERVER SETUP =========================

app.use("/", require("./controllers/user.js"));
app.use("/", require("./controllers/organizer.js"));
app.use("/", require("./controllers/provider.js"));
app.use("/", require("./controllers/product.js"));
app.use("/", require("./controllers/review.js"));

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


