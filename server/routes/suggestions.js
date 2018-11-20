const express = require('express');
var router = express.Router();


 
module.exports = (knex) => {

router.get("/suggestions", (req, res) => {
  knex("suggestions")
  .select("*")
  .innerJoin("recipes", "recipes.id", "suggestions.recipes_id")
  .then((allSuggestions) => {
    res.json({suggestions: allSuggestions})
  })
});


router.post("/suggestion", (req, res) => {
  // add review to a recipe
  const recipeID = 1;
  const newsuggestText = req.body.text;

  knex("suggestions")
    .insert({
      recipes_id: recipeID,
      suggest_text: newsuggestText,
      plus: 0,
      minus: 0
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
        success: true
      });
    });
});


router.post("/plus", (req, res) => {
  const userId = req.body.user_id
  const recipeid = req.body.recpies_id
  const check = req.body.check
  
  if (check === true) {
    knex('suggestions')
    .where({recipie_id: recipieid})
    .then((data) => {
      knex('suggestions')
      .where({recipe_id: recipeid})
      .update({plus: data[0].plus++})
      .catch((err) => {
        res.json({success: false})
        res.status(404)
        console.log(err); throw err;
      })
      .finally(() => {
        res.json({success: true})
      });
    })
    
  }

})

router.post("/minus", (req, res) => {
  const userId = req.body.user_id
  const recipeid = req.body.recpies_id
  const check = req.body.check
  
  if (check === true) {
    knex('suggestions')
    .where({recipe_id: recipeid})
    .then((data) => {
    knex('suggestions')
    .where({recipe_id: recipeid})
      .update({minus: data[0].minus--})
      .catch((err) => {
        res.json({success: false})
        res.status(404)
        console.log(err); throw err;
      })
      .finally(() => {
        res.json({success: true})
      });
  

    })
    
  }
})



}