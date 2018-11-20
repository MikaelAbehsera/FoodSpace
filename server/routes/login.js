const express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt')


module.exports = (knex) => {

  router.post("/register" , (req, res) => {
    if (req.body.password !== req.body.passwordConfirmation){
      // confirm password && passwordConfirmation
      console.log('ERROR');
    } else {
      let hash = bcrypt.hashSync(req.body.password.trim(), 10);
      const newUser = [{
        username: req.body.username.trim(),
        email: req.body.email.trim().toLowerCase(),
        password: hash,
        profileIMG: req.body.profilePictureURL,
        location: req.body.location.trim()
      }];
      
      console.log(newUser)

      knex('users')
        .insert(newUser)
        .returning("id")
        .then((id) => {
          res.json({id: id[0], success: true});
          res.status(200);
        })
        .catch((err) => {
          res.json({id: -1, success: false})
          res.status(404)
          console.log(err); throw err;
        })
        .finally(() => {
        });
    }
  });


  router.post("/login" , (req, res) => {
  const email =  req.body.email.trim().toLowerCase();
  const password = req.body.password.trim();

  knex("users")
    .where({email: email})
    .then((data) => { 
      //if email can be found
      if(data[0]) {
        // does password match
        if(bcrypt.compareSync(password, data[0].password)) {
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


  

}