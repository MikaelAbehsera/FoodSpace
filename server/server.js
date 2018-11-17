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
        res.status(200);
      }
    });
});


app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
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


// const bcrypt = require('bcryptjs');
// const saltRounds = 10;
    // // do the things  
    // const data = this._form.getValue(); // use that ref to get the form value
    // // console.log('date: ', data);

    // // confirm password && passwordConfirmation
    // if (data.password !== data.passwordConfirmation){
    //   console.log('ERROR');
    // } else {
    //   // encrypt password and store it
    //   var salt = bcrypt.genSaltSync(saltRounds)
    //   const bcryptPass = bcrypt.hashSync(data.password, salt);
    //   const newUser = [{
    //     username: data.username,
    //     email: data.email,
    //     password: bcryptPass,
    //     profileIMG: data.profilePictureURL,
    //     location: data.location
    //   }];
      
    //   console.log(newUser)

    //   knex('users')
    //     .insert(newUser)
    //     .catch((err) => {
    //       console.log(err);
    //       throw err;
    //     })
    //     .finally(() => {
    //       setTimeout(() => { this.redirect("Home") }, 200);
    //     });

    // }