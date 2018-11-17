const express = require('express');
const environment = 'development';
const config = require('./knexfile.js')[environment];
const PORT = process.env.PORT || 3000;
const knex = require('knex')(config);
const app = express();
const bodyParser = require("body-parser");
require('dotenv').config()


console.log("Made it to login!")

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require("method-override")());

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});



app.post("/register" , (req, res) => {

  if (req.body.password !== req.body.passwordConfirmation){
    // confirm password && passwordConfirmation
    console.log('ERROR');
  } else {
    // encrypt password and store it
    const newUser = [{
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      profileIMG: req.body.profilePictureURL,
      location: req.body.location
    }];
    
    console.log(newUser)

    knex('users')
      .insert(newUser)
      .returning("id")
      .then((id) => {
        res.json({id: id[0], success: true});
        res.status(200);
      })

  }
});


app.post("/login" , (req, res) => {
  const email =  req.body.email;
  const password = req.body.password;

  knex("users")
    .where({email: email})
    .then((data) => { 
      //if email can be found
      if(data[0]) {
        // does password match
        if(data[0].password === password) {
          console.log("USER LOGIN SUCCESSFULL");
          res.json({id: data[0].id, success: true});
          res.status(200);
        }
      } else {
        console.log("USER LOGIN BAD BAD");
        res.json({id: "-1", success: false});
        res.status(403);
      }
    });
});


app.post("/create" , (req, res) => {
  // creates new recipe

});


app.get("/recipe_list" , (req, res) => {
  // knex
  //   .select("*")
  //   .from()
  //   .innerJoin()




});

app.get("/recipe_details" , (req, res) => {

});

app.get("/profile" , (req, res) => {
// user info
});



app.post("/fave" , (req, res) => {
// add recipe to users faves

});

app.post("/mealmade" , (req, res) => {
// add recipe to users mealmade
});





  
// knex("users")
// where({email: email})
// .then((data) => { 
// bcrypt.compare(data.password, hash, function(err, res) {
//  if (res === true) {
//  setTimeout(() => { this.redirect("Home") }, 200);
//  } else {
//  console.log("Error")
//   }
//  })
// });

