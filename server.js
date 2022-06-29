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
    connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
  
  },
});



app.get("/", (req, res) => {res.send('it is working')});

app.post("/signin", (req, res)=>{signin.handleSignin(req, res,postgres,bcrypt)});


app.post("/register",(req, res)=> {register.handleRegister(req,res,postgres,bcrypt)});




app.get("/profile/:id", (req, res)=> {profile.handleprofile(req,res,postgres)});
 

app.put("/image", (req,res)=> {image.handleimage(req,res,postgres)});

app.post("/imageurl", (req,res)=> {image.handleApiCall(req,res)});

app.listen(process.env.PORT || 3000 , () => {
  console.log(`app us running on PORT ${process.env.PORT}`);
});









//  api flow
/*
/ --> res =this is working 
/signin --> POST =sucess/fail
/register -->POST= user
/profile/:userID --> GET =userID/
/image --> PUT --> user 
*/


// postgres
//   .select('*')
//   .from('users')
//   .then(data => {
//     console.log(data);
//   });
