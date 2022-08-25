const express = require("express");
const app = express();
const Member = require('./models/members.js');
const methodOverride = require("method-override");
const { render } = require('ejs');


require('dotenv').config()
const PORT = process.env.PORT||4000;

// MIDDLEWARE
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(methodOverride('_method'));

//SETUP MONGOOSE
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.once('open', () =>{
  console.log('connected to mongo')
});

// IMPORTING CONTROLLERS
const membersCtrl = require('./controllers/membersController.js')
app.use('/members', membersCtrl)


app.listen(PORT,() =>{
console.log(`Server running on port ${process.env.PORT}`);
})
