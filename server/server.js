const express = require("express");
const environment = "development";
const config = require("./knexfile.js")[environment];
const PORT = process.env.PORT || 3000;
const knex = require("knex")(config);
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const bcrypt = require("bcrypt");


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
    let hash = bcrypt.hashSync(req.body.password.trim(), 10);
    const newUser = [{
      username: req.body.username.trim(),
      email: req.body.email.trim().toLowerCase(),
      password: hash,
      profileIMG: req.body.profilePictureURL,
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
        if (bcrypt.compareSync(password, data[0].password)) {
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


app.get("/profile", (req, res) => {
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

// =======================================================



app.post("/create", (req, res) => {
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
                  console.log("tag ==> ", tagID[0].id);
                  const tagging = {
                    recipes_id: id[0],
                    category_id: tagID[0].id
                  };
                  knex("tags")
                    .insert(tagging)
                    .then(() => {});
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
});


// another commit
app.get("/recipe_list", (req, res) => {

  knex
    .select("*")
    .from("recipes")
    .innerJoin("tags", "recipes.id", "tags.recipes_id")
    .innerJoin("categories", "tags.category_id", "categories.id")
    // .whereIn()
    .then((allRecipes) => {
      allRecipes.forEach((single) => {
        single["instructions"] = [];
        single["ingredients"] = [];
      });

      knex("ingredients")
        .select("food_type", "quantity", "recipes_id")
        .innerJoin("recipes", "ingredients.recipes_id", "recipes.id")
        .then((resultIngredients) => {
          knex("instructions")
            .select("step_description", "step_number", "recipes_id")
            .innerJoin("recipes", "instructions.recipes_id", "recipes.id")
            .then((resultInstructions) => {

              resultIngredients.forEach((single) => {
                allRecipes.forEach((singleRecipe) => {
                  if (single.recipes_id === singleRecipe.id) {
                    singleRecipe["ingredients"].push(single);
                  }
                });
              });

              resultInstructions.forEach((single) => {
                allRecipes.forEach((singleRecipe) => {
                  if (single.recipes_id === singleRecipe.id) {
                    singleRecipe["instructions"].push(single);
                  }
                });
              });

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
            });
        });


    });
});


app.get("/recipe_details", (req, res) => {
  knex
    .select("*")
    .from("Recipes")
    .innerJoin("instructions", "instructions.recipe_id", "recipes.id")
    .innerJoin("ingredients", "ingredients.recipes_id", "recipes.id")
    .innerJoin("measurements", "measurement.id", "ingredients.measurement_id")
    .then((recipeDetails) => {


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
        recipeDetails: recipeDetails,
        success: true
      });
    });

});



// =======================================================


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


app.post("/mealmade", (req, res) => {
  // add recipe to users mealmade
});


app.get("/suggestions", (req, res) => {
  knex("suggestions")
    .select("*")
    .innerJoin("recipes", "recipes.id", "suggestions.recipes_id")
    .then((allSuggestions) => {
      res.json({
        suggestions: allSuggestions
      });
    });
});


app.post("/suggestion", (req, res) => {
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

app.post("/plus", (req, res) => {
  const userId = req.body.user_id;
  const recipeid = req.body.recpies_id;
  const check = req.body.check;

  if (check === true) {
    knex("suggestions")
      .where({
        recipie_id: recipieid
      })
      .then((data) => {
        knex("suggestions")
          .where({
            recipe_id: recipeid
          })
          .update({
            plus: data[0].plus++
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

  }

});


app.post("/minus", (req, res) => {
  const userId = req.body.user_id;
  const recipeid = req.body.recpies_id;
  const check = req.body.check;

  if (check === true) {
    knex("suggestions")
      .where({
        recipe_id: recipeid
      })
      .then((data) => {
        knex("suggestions")
          .where({
            recipe_id: recipeid
          })
          .update({
            minus: data[0].minus--
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

  }
});


app.post("/review", (req, res) => {
  // add review to a recipe
  const recipeID = 1;
  const newRating = req.body.rating;
  const newReviewtext = req.body.reviewText;

  knex("reviews")
    .insert({
      recipes_id: recipeID,
      rating: newRating,
      review_text: newReviewtext
    })
    .then(() => {
      knex("reviews")
        .avg("rating")
        .then((avgRating) => {
          knex("recipes")
            .where({
              id: recipeID
            })
            .update({
              overall_rating: avgRating
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
    });
});






// ==========================================

// var multer = require('multer');
// var AWS = require('aws-sdk');
// var upload = multer({ dest: 'uploads/' })
// const fs = require('file-system')

// AWS.config.update({
//     accessKeyId: process.env.DO_KEY,
//     secretAccessKey: process.env.DO_SECRETKEY
// });

// var s3 = new AWS.S3({
//   endpoint: new AWS.Endpoint('nyc3.digitaloceanspaces.com')
// });



//   app.post('/upload', upload.single('image'), function (req, res, next) {
//     // req.file is the `avatar` file
//     // req.body will contain the text fields, if there were any
//     console.log(req.file)

//     var bodystream = fs.createReadStream(req.file.path);

//     var params = {
//       Body: bodystream,
//       Bucket: process.env.DO_BUCKET,
//       Key: 'uploads/'+req.file.filename,
//       ACL: 'public-read',
//       Metadata: {
//         'Content-Type': 'image/jpeg'
//       }
//     }

//     s3.putObject(params, function(err, data) {
//       if (err) console.log(err, err.stack);
//       else {
//         console.log(data)
//         const storedImage = `https://${process.env.DO_BUCKET}.nyc3.digitaloceanspaces.com/${params.Key}`;
//         console.log(storedImage)
//       } 
//     })

//     // return storedImage to be stored in knex, if failed - returns nulls = returned should check if null/valid
// })