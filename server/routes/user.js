const express = require('express');
var router = express.Router();


module.exports = (knex) => {

  router.get("/profile", (req, res) => {
    const userID = 1;
    const userProfile = {};
  
    knex("users")
      .select("username", "email", "profileIMG", "location")
      .where({
        id: userID
      })
      .then((userInfo) => {
        userProfile["userInfo"] = userInfo[0];
        
        knex("recipes")
          .where({
            creator_id: userID
          })
          .then((recipesCreated) => {
            userProfile["recipesCreated"] = recipesCreated;
  
            knex("faves")
              .where({
                user_id: userID
              })
              .innerJoin("recipes", "faves.recipes_id", "recipes.id")
              .then((faves) => {
                userProfile["faves"] = faves;
  
                knex("mademeals")
                  .where({
                    user_id: userID
                  })
                  .innerJoin("recipes", "mademeals.recipes_id", "recipes.id")
                  .then((Usermademeals) => {
                    userProfile["Usermademeals"] = Usermademeals;
                  })
                  .catch((err) => {
                    res.json({
                      success: false
                    });
                    res.status(404);
                    console.log(err);
                    throw err;
                  })
                  .finally(() => {
                    res.json({
                      userProfile: userProfile,
                      success: true
                    });
                  });
              });
          });
      });
  });
      
  
  router.post("/fave", (req, res) => {
    const userId = req.body.user_id;
    const recipeid = req.body.recpies_id;
    const check = req.body.check;
  
    const favRecipesAdd = {
      user_id: userId,
      recipes_id: recipeid
    };
    if (check === true) {
      knex("faves")
        .insert(favRecipesAdd)
        .then(() => {
          res.json({
            success: true
          });
        });
    } else {
      knex("faves")
        .where({
          user_id: userId,
          recipes_id: recipeid
        })
        .del()
        .then(() => {
          res.json({
            success: true
          });
        });
    }
  
  });
  
  
  router.post("/mealmade" , (req, res) => {
  // add recipe to users mealmade
  });

  

}