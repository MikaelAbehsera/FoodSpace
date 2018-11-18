const express = require("express");
const environment = "development";
const config = require("./knexfile.js")[environment];
const PORT = process.env.PORT || 3000;
const knex = require("knex")(config);
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();


console.log("Made it to login!");

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(require("method-override")());

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});



app.post("/register", (req, res) => {

  if (req.body.password !== req.body.passwordConfirmation) {
    // confirm password && passwordConfirmation
    console.log("ERROR");
  } else {
    // encrypt password and store it

    const newUser = [{
      username: req.body.username.trim(),
      email: req.body.email.trim().toLowerCase(),
      password: req.body.password.trim(),
      profileIMG: req.body.profilePictureURL.trim(),
      location: req.body.location.trim()
    }];

    console.log(newUser);

    knex("users")
      .insert(newUser)
      .returning("id")
      .then((id) => {
        res.json({
          id: id[0],
          success: true
        });
        res.status(200);
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
      .finally(() => {});
  }
});


app.post("/login", (req, res) => {
  const email = req.body.email.trim().toLowerCase();
  const password = req.body.password.trim();

  knex("users")
    .where({
      email: email
    })
    .then((data) => {
      //if email can be found
      if (data[0]) {
        // does password match
        if (data[0].password === password) {
          console.log("USER LOGIN SUCCESSFULL");
          res.json({
            id: data[0].id,
            success: true
          });
          res.status(200);
        }
      } else {
        console.log("USER LOGIN BAD BAD");
        res.json({
          id: "-1",
          success: false
        });
        res.status(403);
      }
    });
});


app.post("/create", (req, res) => {
  // creates new recipe

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
      const addTag = {
        recipes_id: id[0],
        category_id: 3
      };
      knex("ingredients")
        .insert(ingredientsList)
        .then(() => {
          knex("instructions")
            .insert(instructionsList)
            .then(() => {
              knex("tags")
                .insert(addTag);
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
        });


    });

});

app.get("/recipe_list", (req, res) => {
  knex
    .select("*")
    .from("recipes")
    .innerJoin("tags", "recipes.id", "tags.recipes_id")
    .innerJoin("categories", "tags.category_id", "categories.id")
    .innerJoin("instructions", "instructions.recipes_id", "recipes.id")
    .then((allRecipes) => {
      console.log(allRecipes);
      res.json({
        recipes: allRecipes
      });
      res.status(200);
    })
    .catch((err) => {
      res.json({
        id: -1,
        success: false
      });
      res.status(404);
      console.log(err);
      throw err;
    });

});


app.get("/profile", (req, res) => {
  // user info
  knex
    .select("*")
    .from("users")
    .innerJoin("recipes", "users.id", "creator_id")
    .then((dataCreated) => {

    })
    .innerJoin("mademeals", "users.id", "mademeals.user_id")
    .innerJoin("recipes", "users.id", "creator_id")
    .innerJoin("faves", "users.id", "faves.user_id");

  // to display all of recipes created by the user

});



app.post("/fave", (req, res) => {
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
          sucsess: true
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
          sucsess: true
        });
      });
  }

});

app.post("/mealmade", (req, res) => {
  // add recipe to users mealmade
  const recipeID = req.body.recipes_id;
  const userID = req.body.user_id;

  const mademealsAdd = {
    recipes_id: recipeID,
    user_id: userID
  };

  knex("mademeals")
    .insert(mademealsAdd)
    .then(() => {
      res.json({
        success: true
      });
    });

});



app.post("/review", (req, res) => {
  // add review to a recipe


});

// can just have a function get called whenever a new review is made, uses knex to look over all previous reviews for that recipe, calculates the average and updates the recipe "overall_rating"
// USE KNEX avg function