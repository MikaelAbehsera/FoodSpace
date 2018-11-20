const express = require('express');
var router = express.Router();


 
module.exports = (knex) => {

router.post("/create", (req, res) => {
  // creates new recipe
  
  const categoryName = req.body.category;
  const recipeForm = req.body.form;
  const ingredientsArray = req.body.ingredients;
  const instructionsArray = req.body.instructions;
  
  // STILL NEED TO TAG CATEGORIES AND PROPER USER_ID
  // currently being simulated
  
  knex("recipes")
  .insert({
    name: recipeForm.recipeName,
    description: recipeForm.recipeDescription,
    overall_rating: null,
    time: recipeForm.timeToMake,
    difficulty: recipeForm.difficultyOfRecipe,
    creator_id: 1
  })
  .returning("id")
  .then((id) => {
    const ingredientsList = [];
    const instructionsList = [];
    
    ingredientsArray.forEach((single) => {
      ingredientsList.push({
        recipes_id: id[0],
        food_type: single.foodType,
        quantity: single.quantity
      });
    });
    instructionsArray.forEach((single) => {
      instructionsList.push({
        recipes_id: id[0],
        step_number: single.stepNumber,
        step_description: single.step
      });
    });
    
    knex("ingredients")
      .insert(ingredientsList)
      .then(() => {
        knex("instructions")
        .insert(instructionsList)
        .then(() => {
          knex("categories")
          .where({
                category_name: categoryName
              })
              .returning("id")
              .then((tagID) => {
                console.log("tag ==> ", tagID[0].id)
                knex("tags")
                  .insert({
                    recipes_id: id[0],
                    category_id: tagID[0].id
                  })
                })
                .catch((err) => {
                  res.json({
                    id: -1,
                    success: false
                  });
                  res.status(404);
                  console.log(err);
                throw err;
              })
              .finally(() => {
                res.json({
                  recipes_id: id[0],
                  success: true
                });
              });
            })
          })

  });
});


router.get("/recipe_list", (req, res) => {

  knex
    .select("*")
    .from("recipes")
    .innerJoin("tags", "recipes.id", "tags.recipes_id")
    .innerJoin("categories", "tags.category_id", "categories.id")
    // .whereIn()
    .then((allRecipes) => {
      allRecipes.forEach((single) => {
        single['instructions'] = [];
        single['ingredients'] = [];
      })
      knex("recipes")
      .innerJoin("instructions", "instructions.recipes_id", "recipes.id")
      .then((resultIngredients) => {
        knex("recipes")
        .innerJoin("instructions", "instructions.recipes_id", "recipes.id")
        .then((resultInstructions) => {

          resultIngredients.forEach((single)=> {
            allRecipes.forEach((singleRecipe) => {
              if (single.id === singleRecipe.id) {
                singleRecipe['ingredients'].push(single)
              }
            })
          })

          resultInstructions.forEach((single)=> {
            allRecipes.forEach((singleRecipe) => {
              if (single.id === singleRecipe.id) {
                singleRecipe['instructions'].push(single)
              }
            })
          })
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
            allRecipes: allRecipes,
            success: true
          });
      })
    })
       

});
});


router.get("/recipe_details" , (req, res) => {
   knex
   .select("*")
   .from('Recipes')
   .innerJoin("instructions", "instructions.recipe_id", "recipes.id")
   .innerJoin("ingredients", "ingredients.recipes_id",  "recipes.id")
   .innerJoin("measurements", "measurement.id", "ingredients.measurement_id")
   .then((recipeDetails) => {


   })      
   .catch((err) => {
    res.json({success: false})
    res.status(404)
    console.log(err); throw err;
  })
  .finally(() => {
    res.json({recipeDetails: recipeDetails, success: true})
  });

})



}