const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const e = require("express");
const app = express();
app.use(bodyParser.json());
app.use(cors());
const register = require('./controllers/register');
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");




const postgres= knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "harshvaidh",
    password: "",
    database: "smart-brain",
  },
});




app.post("/signin", (req, res)=>{signin.handleSignin(req, res,postgres,bcrypt)});


app.post("/register",(req, res)=> {register.handleRegister(req,res,postgres,bcrypt)});



app.get("/profile/:id", (req, res)=> {profile.handleprofile(req,res,postgres)});
 

app.put("/image", (req,res)=> {image.handleimage(req,res,postgres)});

app.post("/imageurl", (req,res)=> {image.handleApiCall(req,res)});

app.listen(3000, () => {
  console.log("app is running ");
});









//  api flow
/*
/ --> res =this is working 
/signin --> POST =sucess/fail
/register -->POST= user
/profile/:userID --> GET =userID/
/image --> PUT --> user 
*/


app.get("/", (req, res) => {
  res.send('it is working');
});

// postgres
//   .select('*')
//   .from('users')
//   .then(data => {
//     console.log(data);
//   });