const express = require("express");
const environment = "development";
const config = require("./knexfile.js")[environment];
const PORT = process.env.PORT || 3000;
const knex = require("knex")(config);
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const bcrypt = require("bcrypt");
const uniqid = require('uniqid');


console.log("Made it to login!");

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(require("method-override")());

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});


// =======================================================


// =======================================================


app.post("/register", (req, res) => {
  if (req.body.password.trim() !== req.body.passwordConfirmation.trim()) {
    // confirm password && passwordConfirmation
    console.log("ERROR");
  } else {
    let randomToken = uniqid()
    let hash = bcrypt.hashSync(req.body.password.trim(), 10);
    const newUser = [{
      username: req.body.username.trim(),
      email: req.body.email.trim().toLowerCase(),
      password: hash,
      profileIMG: req.body.profilePictureURL,
      location: req.body.location.trim(),
      sessionToken: randomToken
    }];

    console.log(newUser);

    knex("users")
      .insert(newUser)
      .returning("id")
      .then((id) => {
        res.json({
          id: id[0],
          success: true,
          sessionToken: randomToken
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
            sessionToken: data[0].sessionToken,
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


app.get("/profile/:sessionToken", (req, res) => {
  console.log("params from frontend (profile get)===> ", req.params);
  const sessionToken = req.params.sessionToken;
  const userProfile = {};

  authenticateToken(sessionToken, function (result) {
    if (!res) {
      res.json({
        success: false
      });
      return;
    }
    console.log("SESSION TOKEN FROM PARAMS ===> ", sessionToken);
    console.log("USER ID THAT THE TOKEN IS LINKED TO ==> ", result);

    knex("users")
      .select("username", "email", "profileIMG", "location")
      .where({
        sessionToken: sessionToken
      })
      .then((userInfo) => {
        userProfile["userInfo"] = userInfo[0];

        knex("recipes")
          .where({
            creator_id: result
          })
          .then((recipesCreated) => {
            userProfile["recipesCreated"] = recipesCreated;

            knex("faves")
              .where({
                user_id: result
              })
              .innerJoin("recipes", "faves.recipes_id", "recipes.id")
              .then((faves) => {
                userProfile["faves"] = faves;

                knex("mademeals")
                  .where({
                    user_id: result
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
});

//user authentication function.
function authenticateToken(token, cb) {
  console.log("token token token ===> ", token);

  knex("users")
    .where({
      sessionToken: token
    })
    .then((result) => {
      console.log("RESULT RESULT RESULT ===> ", result);
      cb(result[0].id);
    });
}

app.post("/create", (req, res) => {
  // creates new recipe
  console.log("params from frontend (create post)===> ", req.body);
  const sessionToken = req.body.sessionToken;
  const categoryName = req.body.category;
  const recipeForm = req.body.form;
  const ingredientsArray = req.body.ingredients;
  const instructionsArray = req.body.instructions;

  // STILL NEED TO TAG CATEGORIES AND PROPER USER_ID
  // currently being simulated

  authenticateToken(sessionToken, function (result) {
    if (!res) {
      res.json({
        success: false
      });
      return;
    }
    knex("recipes")
      .insert({
        name: recipeForm.recipeName,
        description: recipeForm.recipeDescription,
        overall_rating: null,
        time: recipeForm.timeToMake,
        difficulty: recipeForm.diffcultyOfRecipe,
        creator_id: result
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
  })

});


<<<<<<< HEAD

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
=======
// another commit
app.get("/recipe_list/:sessionToken", (req, res) => {
  console.log("params from frontend (recipe page post)===> ", req.params);
  const sessionToken = req.params.sessionToken;

  authenticateToken(sessionToken, function (result) {
    if (!res) {
      res.json({
        success: false
>>>>>>> 9f9b91fea340174d1d91f882b0c7980a4a0b63ef
      });
      return;
    }
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
  })

});




app.get("/recipe_details", (req, res) => {

  console.log("params from frontend (details get)===> ", req.params);
  const sessionToken = req.params.sessionToken;
  const recipeID = req.body.recipeID
<<<<<<< HEAD

  knex
    .select("*")
    .from("Recipes")
    .where({
      id: recipeID
    })
    .innerJoin("instructions", "instructions.recipe_id", "recipes.id")
    .innerJoin("ingredients", "ingredients.recipes_id", "recipes.id")
    .innerJoin("measurements", "measurement.id", "ingredients.measurement_id")
    .then((recipeDetails) => {

    })
    .catch((err) => {
=======
  authenticateToken(sessionToken, function (result) {
    if (!res) {
>>>>>>> 9f9b91fea340174d1d91f882b0c7980a4a0b63ef
      res.json({
        success: false
      });
      return
    }
    knex
      .select("*")
      .from("Recipes")
      .where({
        id: recipeID
      })
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
  })
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
  console.log("params from frontend (fave post)===> ", req.params);
  const sessionToken = req.params.sessionToken;
  authenticateToken(sessionToken, function (result) {
    if (!res) {
      res.json({
        success: false
      });
      return
    }
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
  })
});


app.get("/mealmade", (req, res) => {
  // add recipe to users mealmade
  console.log('jimmy')

});


app.get("/suggestions", (req, res) => {
  console.log("params from frontend (suggestions get)===> ", req.params);
  const sessionToken = req.params.sessionToken;
  authenticateToken(sessionToken, function (result) {
    if (!res) {
      res.json({
        success: false
      });
      return
    }
    knex("suggestions")
      .select("*")
      .innerJoin("recipes", "recipes.id", "suggestions.recipes_id")
      .then((allSuggestions) => {
        res.json({
          suggestions: allSuggestions
        });
      });
  });
});


app.post("/suggestion", (req, res) => {
  // add review to a recipe
  const recipeID = 1;
  const newsuggestText = req.body.text;

  console.log("params from frontend (suggestions get)===> ", req.params);
  const sessionToken = req.params.sessionToken;
  authenticateToken(sessionToken, function (result) {
    if (!res) {
      res.json({
        success: false
      });
      return
    }
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
  })
});

app.post("/plus", (req, res) => {
  const userId = req.body.user_id;
  const recipeid = req.body.recpies_id;
  const check = req.body.check;

  console.log("params from frontend (suggestions get)===> ", req.params);
  const sessionToken = req.params.sessionToken;
  authenticateToken(sessionToken, function (result) {
    if (!res) {
      res.json({
        success: false
      });
      return
    }
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
  })

});


app.post("/minus", (req, res) => {
  const userId = req.body.user_id;
  const recipeid = req.body.recpies_id;
  const check = req.body.check;


  console.log("params from frontend (suggestions get)===> ", req.params);
  const sessionToken = req.params.sessionToken;

  authenticateToken(sessionToken, function (result) {
    if (!res) {
      res.json({
        success: false
      });
      return
    }

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
  })
});


app.post("/review", (req, res) => {
  // add review to a recipe
  const recipeID = req.body.recipes_id;
  const newRating = req.body.rating;
  const newReviewtext = req.body.reviewText;

  console.log("params from frontend (suggestions get)===> ", req.params);
  const sessionToken = req.params.sessionToken;

  authenticateToken(sessionToken, function (result) {
    if (!res) {
      res.json({
        success: false
      });
      return
    }
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
  })
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