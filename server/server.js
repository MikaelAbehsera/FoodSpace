const express = require("express");
const environment = "development";
const config = require("./knexfile.js")[environment];
const PORT = process.env.PORT || 3000;
const knex = require("knex")(config);
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const bcrypt = require("bcrypt");
const uniqid = require("uniqid");

console.log("Made it to login!");

app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
app.use(bodyParser.json());
app.use(require("method-override")());

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

// =======================================================

//user authentication function.
function authenticateToken(token, cb) {
  console.log("token token token ===> ", token);

  knex("users")
    .where({
      sessionToken: token,
    })
    .then(result => {
      console.log("RESULT RESULT RESULT ===> ", result);
      cb(result[0].id);
    });
}

// =======================================================

app.post("/register", (req, res) => {
  let errorMessage = null;

  if (req.body.password.trim() !== req.body.passwordConfirmation.trim()) {
    // confirm password && passwordConfirmation
    errorMessage = "password && passwordConfirmation do not match";
    res.json({
      id: -1,
      success: false,
      errorMessage: errorMessage,
    });
    res.status(404);

    console.log("ERROR");
  } else {
    let randomToken = uniqid();
    let hash = bcrypt.hashSync(req.body.password.trim(), 10);
    const newUser = [{
      username: req.body.username.trim(),
      email: req.body.email.trim().toLowerCase(),
      password: hash,
      profileIMG: req.body.profilePictureURL,
      location: req.body.location.trim(),
      sessionToken: randomToken,
    }, ];

    console.log(newUser);

    knex("users")
      .select("*")
      .where({
        email: req.body.email.trim().toLowerCase(),
      })
      .then(existingUser => {
        if (existingUser.length === 0) {
          knex("users")
            .insert(newUser)
            .returning("id")
            .then(id => {
              res.json({
                id: id[0],
                success: true,
                sessionToken: randomToken,
              });
              res.status(200);
            })
            .catch(err => {
              res.json({
                id: -1,
                success: false,
              });
              res.status(404);
              console.log(err);
              throw err;
            });
        } else if (existingUser.length !== 0) {
          errorMessage = "user already exists";
          res.json({
            id: -1,
            success: false,
            errorMessage: errorMessage,
          });
          res.status(404);
        }
      });
  }
});

app.post("/login", (req, res) => {
  const email = req.body.email.trim().toLowerCase();
  const password = req.body.password.trim();

  knex("users")
    .where({
      email: email,
    })
    .then(data => {
      //if email can be found
      if (data[0]) {
        // does password match
        if (bcrypt.compareSync(password, data[0].password)) {
          console.log("USER LOGIN SUCCESSFULL");
          res.json({
            id: data[0].id,
            sessionToken: data[0].sessionToken,
            success: true,
          });
          res.status(200);
        }
      } else {
        console.log("USER LOGIN BAD BAD");
        res.json({
          id: "-1",
          success: false,
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
        success: false,
      });
      return;
    }
    console.log("SESSION TOKEN FROM PARAMS ===> ", sessionToken);
    console.log("USER ID THAT THE TOKEN IS LINKED TO ==> ", result);

    knex("users")
      .select("username", "email", "profileIMG", "location")
      .where({
        sessionToken: sessionToken,
      })
      .then(userInfo => {
        userProfile["userInfo"] = userInfo[0];

        knex("recipes")
          .where({
            creator_id: result,
          })
          .then(recipesCreated => {
            userProfile["recipesCreated"] = recipesCreated;

            knex("faves")
              .where({
                user_id: result,
              })
              .innerJoin("recipes", "faves.recipes_id", "recipes.id")
              .innerJoin("users", "recipes.creator_id", "users.id")
              .then(faves => {
                userProfile["faves"] = faves;

                knex("mademeals")
                  .where({
                    user_id: result,
                  })
                  .innerJoin("recipes", "mademeals.recipes_id", "recipes.id")
                  .then(Usermademeals => {
                    userProfile["Usermademeals"] = Usermademeals;

                    knex
                      .select("*")
                      .from("recipes")
                      .innerJoin("tags", "recipes.id", "tags.recipes_id")
                      .innerJoin(
                        "categories",
                        "tags.category_id",
                        "categories.id",
                      )

                      .then(allRecipes => {
                        allRecipes.forEach(single => {
                          single["instructions"] = [];
                          single["ingredients"] = [];
                        });

                        knex("ingredients")
                          .select("food_type", "quantity", "recipes_id")
                          .innerJoin(
                            "recipes",
                            "ingredients.recipes_id",
                            "recipes.id",
                          )
                          .then(resultIngredients => {
                            knex("instructions")
                              .select(
                                "step_description",
                                "step_number",
                                "recipes_id",
                              )
                              .innerJoin(
                                "recipes",
                                "instructions.recipes_id",
                                "recipes.id",
                              )
                              .then(resultInstructions => {
                                resultIngredients.forEach(single => {
                                  allRecipes.forEach(singleRecipe => {
                                    if (single.recipes_id === singleRecipe.id) {
                                      singleRecipe["ingredients"].push(single);
                                    }
                                  });
                                });

                                resultInstructions.forEach(single => {
                                  allRecipes.forEach(singleRecipe => {
                                    if (single.recipes_id === singleRecipe.id) {
                                      singleRecipe["instructions"].push(single);
                                    }
                                  });
                                });
                              })
                              ///
                              .catch(err => {
                                res.json({
                                  success: false,
                                });
                                res.status(404);
                                console.log(err);
                                throw err;
                              })
                              .finally(() => {
                                res.json({
                                  userProfile: userProfile,
                                  allRecipes: allRecipes,
                                  success: true,
                                });
                              });
                          });
                      });
                  });
              });
          });
      });
  });
});

// =======================================================

app.post("/create", (req, res) => {
  // creates new recipe
  console.log("params from frontend (create post)===> ", req.body);
  const sessionToken = req.body.sessionToken;
  const categoryName = req.body.category;
  const recipeForm = req.body.form;
  const ingredientsArray = req.body.ingredients;
  const instructionsArray = req.body.instructions;
  const recipeImg = req.body.form.recipeUrl;
  // STILL NEED TO TAG CATEGORIES AND PROPER USER_ID
  // currently being simulated

  authenticateToken(sessionToken, function (result) {
    if (!res) {
      res.json({
        success: false,
      });
      return;
    }
    knex("recipes")
      .insert({
        name: recipeForm.recipeName,
        description: recipeForm.recipeDescription,
        overall_rating: null,
        time: recipeForm.timeToMake,
        difficulty: req.body.difficultyOfRecipe,
        creator_id: result,
        recipeIMG: recipeImg,
      })
      .returning("id")
      .then(id => {
        const ingredientsList = [];
        const instructionsList = [];

        ingredientsArray.forEach(single => {
          ingredientsList.push({
            recipes_id: id[0],
            food_type: single.foodType,
            quantity: single.quantity,
          });
          instructionsArray.forEach(single => {
            instructionsList.push({
              recipes_id: id[0],
              step_number: single.stepNumber,
              step_description: single.step,
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
                      category_name: categoryName,
                    })
                    .returning("id")
                    .then(tagID => {
                      console.log("tag ==> ", tagID[0].id);
                      const tagging = {
                        recipes_id: id[0],
                        category_id: tagID[0].id,
                      };
                      knex("tags")
                        .insert(tagging)
                        .then(() => {});
                    })
                    .catch(err => {
                      res.json({
                        id: -1,
                        success: false,
                      });
                      res.status(404);
                      console.log(err);
                      throw err;
                    })
                    .finally(() => {
                      res.json({
                        recipes_id: id[0],
                        success: true,
                      });
                    });
                });
            });
        });
      });
  });
});

app.get("/recipe_list/:sessionToken", (req, res) => {
  console.log("params from frontend (recipe page post)===> ", req.params);
  const sessionToken = req.params.sessionToken;

  authenticateToken(sessionToken, function (result) {
    if (!res) {
      res.json({
        success: false,
      });
      return;
    }
    knex
      .select("*")
      .from("recipes")
      .innerJoin("tags", "recipes.id", "tags.recipes_id")
      .innerJoin("categories", "tags.category_id", "categories.id")

      .then(allRecipes => {
        allRecipes.forEach(single => {
          single["instructions"] = [];
          single["ingredients"] = [];
        });

        knex("ingredients")
          .select("*")
          .then(resultIngredients => {
            knex("instructions")
              .select("*")
              .then(resultInstructions => {
                allRecipes.forEach(singleRecipe => {
                  resultIngredients.forEach(single => {
                    if (singleRecipe.recipes_id === single.recipes_id) {
                      singleRecipe["ingredients"].push(single);
                    }
                  });
                });

                allRecipes.forEach(singleRecipe => {
                  resultInstructions.forEach(single => {
                    if (singleRecipe.recipes_id === single.recipes_id) {
                      singleRecipe["instructions"].push(single);
                    }
                  });
                });
              })
              .catch(err => {
                res.json({
                  success: false,
                });
                res.status(404);
                console.log(err);
                throw err;
              })
              .finally(() => {
                res.json({
                  allRecipes: allRecipes,
                  success: true,
                });
              });
          });
      });
  });
});

app.get("/list/:categoryName", (req, res) => {
  const categoryName = req.params.categoryName;

  knex
    .select("*")
    .from("recipes")
    .innerJoin("tags", "recipes.id", "tags.recipes_id")
    .innerJoin("categories", "tags.category_id", "categories.id")
    .where({
      category_name: categoryName,
    })
    .then(allRecipes => {
      allRecipes.forEach(single => {
        single["instructions"] = [];
        single["ingredients"] = [];
      });

      knex("ingredients")
        .select("*")
        .then(resultIngredients => {
          knex("instructions")
            .select("*")
            .then(resultInstructions => {
              allRecipes.forEach(singleRecipe => {
                resultIngredients.forEach(single => {
                  if (singleRecipe.recipes_id === single.recipes_id) {
                    singleRecipe["ingredients"].push(single);
                  }
                });
              });

              allRecipes.forEach(singleRecipe => {
                resultInstructions.forEach(single => {
                  if (singleRecipe.recipes_id === single.recipes_id) {
                    singleRecipe["instructions"].push(single);
                  }
                });
              });
            })
            .catch(err => {
              res.json({
                success: false,
              });
              res.status(404);
              console.log(err);
              throw err;
            })
            .finally(() => {
              res.json({
                allRecipes: allRecipes,
                success: true,
              });
            });
        });
    });
});

app.get("/specificRecipeDetails/:recipeId/:sessionToken", (req, res) => {
  const recipeId = req.params.recipeId;
  const sessionToken = req.params.sessionToken;

  authenticateToken(sessionToken, function (result) {
    if (!res) {
      res.json({
        success: false,
      });
      return;
    }

    knex
      .select("*")
      .from("recipes")
      .where({
        recipes_id: recipeId,
      })
      .innerJoin("tags", "recipes.id", "tags.recipes_id")
      .innerJoin("categories", "tags.category_id", "categories.id")
      .then(allRecipes => {
        allRecipes.forEach(single => {
          single["instructions"] = [];
          single["ingredients"] = [];
        });

        knex("ingredients")
          .select("*")
          .then(resultIngredients => {
            knex("instructions")
              .select("*")
              .then(resultInstructions => {
                allRecipes.forEach(singleRecipe => {
                  resultIngredients.forEach(single => {
                    if (singleRecipe.recipes_id === single.recipes_id) {
                      singleRecipe["ingredients"].push(single);
                    }
                  });
                });

                allRecipes.forEach(singleRecipe => {
                  resultInstructions.forEach(single => {
                    if (singleRecipe.recipes_id === single.recipes_id) {
                      singleRecipe["instructions"].push(single);
                    }
                  });
                });
              })
              .catch(err => {
                res.json({
                  success: false,
                });
                res.status(404);
                console.log(err);
                throw err;
              })
              .finally(() => {
                res.json({
                  allRecipes: allRecipes,
                  success: true,
                });
              });
          });
      });
  });
});

// =======================================================

app.post("/fave", (req, res) => {
  const recipeid = req.body.recipe_id;
  const check = req.body.check;

  console.log("params from frontend (fave post)===> ", req.params);
  const sessionToken = req.body.sessionToken;
  authenticateToken(sessionToken, function (result) {
    if (!res) {
      res.json({
        success: false,
      });
      return;
    }
    const favRecipesAdd = {
      user_id: result,
      recipes_id: recipeid,
    };
    if (check === true) {
      knex("faves")
        .insert(favRecipesAdd)
        .catch(err => {
          res.json({
            success: false,
          });
          res.status(404);
          console.log(err);
          throw err;
        })
        .finally(() => {
          res.json({
            success: true,
          });
        });
    } else if (check === false) {
      knex("faves")
        .where({
          user_id: result,
        })
        .where({
          recipes_id: recipeid,
        })
        .del()
        .catch(err => {
          res.json({
            success: false,
          });
          res.status(404);
          console.log(err);
          throw err;
        })
        .finally(() => {
          res.json({
            success: true,
          });
        });
    }
  });
});

app.get("/heart/:sessionToken/:recipeid", (req, res) => {
  const recipes_id = req.params.recipeid;
  const sessionToken = req.params.sessionToken;

  authenticateToken(sessionToken, function (result) {
    if (!res) {
      res.json({
        success: false,
      });
      return;
    }
    knex("faves")
      .where({
        user_id: result,
      })
      .where({
        recipes_id: recipes_id,
      })
      .then(result => {
        if (result.length > 0) {
          res.send({
            faveStatus: true,
          });
        } else {
          res.send({
            faveStatus: false,
          });
        }
      });
  });
});

// =======================================================

app.get("/suggestions/:recipeID/:sessionToken", (req, res) => {
  console.log("params from frontend (suggestions get)===> ", req.params);
  const sessionToken = req.params.sessionToken;
  const recipeID = req.params.recipeID;
  authenticateToken(sessionToken, function (result) {
    if (!res) {
      res.json({
        success: false,
      });
      return;
    }
    knex("users")
      .select("*")
      // .select("users.id", "users.username")
      .innerJoin("suggestions", "users.id", "suggestions.user_id")
      .where({
        recipes_id: recipeID,
      })
      .then(allSuggestions => {
        res.json({
          suggestions: allSuggestions,
          success: true,
        });
      });
  });
});

app.post("/suggestion", (req, res) => {
  // add suggestions to a recipe
  const recipeId = req.body.recipeId;
  const newSuggestText = req.body.newSuggestText;
  const sessionToken = req.body.sessionToken;

  console.log(
    "params from frontend (suggestions post!!!!!!!!!!)===> ",
    req.body,
  );

  authenticateToken(sessionToken, function (result) {
    if (!res) {
      res.json({
        success: false,
      });
      return;
    }
    knex("suggestions")
      .insert({
        recipes_id: recipeId,
        suggest_text: newSuggestText,
        plus: 0,
        minus: 0,
        user_id: result,
      })
      .catch(err => {
        res.json({
          success: false,
        });
        res.status(404);
        console.log(err);
        throw err;
      })
      .finally(() => {
        res.json({
          success: true,
        });
      });
  });
});

app.post("/plus", (req, res) => {
  const check = req.body.check;
  const sessionToken = req.body.sessionToken;
  const suggestionId = req.body.suggestionId;
  let updated = 0;

  authenticateToken(sessionToken, function (result) {
    if (!res) {
      res.json({
        success: false,
      });
      return;
    }
    knex("suggestions")
      .where({
        id: suggestionId,
      })

      .then(current => {
        let diff = 0;
        if (check === true) {
          diff = 1;
        } else if (check === false) {
          diff = -1;
        }
        updated = current[0].plus + diff;
        const newSuggest = {
          id: suggestionId,
          recipes_id: current[0].recipes_id,
          suggest_text: current[0].suggest_text,
          plus: updated,
          minus: current[0].minus,
          user_id: current[0].user_id,
        };
        knex("suggestions")
          .where({
            id: suggestionId,
          })
          .del()
          .then(() => {
            console.log("THIS IS THE NEWSUGGESTS ====> ", newSuggest);
            knex("suggestions")
              .insert(newSuggest)
              .then(() => {})
              .catch(err => {
                res.json({
                  success: false,
                });
                res.status(404);
                console.log(err);
                throw err;
              })
              .finally(() => {
                res.json({
                  success: true,
                  updatedPlus: updated,
                });
              });
          });
      });
  });
});

app.post("/minus", (req, res) => {
  const check = req.body.check;
  const sessionToken = req.body.sessionToken;
  const suggestionId = req.body.suggestionId;
  let updated = 0;

  authenticateToken(sessionToken, function (result) {
    if (!res) {
      res.json({
        success: false,
      });
      return;
    }
    knex("suggestions")
      .where({
        id: suggestionId,
      })

      .then(current => {
        let diff = 0;
        if (check === true) {
          diff = 1;
        } else if (check === false) {
          diff = -1;
        }
        updated = current[0].minus + diff;
        const newSuggest = {
          id: suggestionId,
          recipes_id: current[0].recipes_id,
          suggest_text: current[0].suggest_text,
          plus: current[0].plus,
          minus: updated,
          user_id: current[0].user_id,
        };
        knex("suggestions")
          .where({
            id: suggestionId,
          })
          .del()
          .then(() => {
            console.log("THIS IS THE NEWSUGGESTS ====> ", newSuggest);
            knex("suggestions")
              .insert(newSuggest)
              .then(() => {})
              .catch(err => {
                res.json({
                  success: false,
                });
                res.status(404);
                console.log(err);
                throw err;
              })
              .finally(() => {
                res.json({
                  success: true,
                  updatedMinus: updated,
                });
              });
          });
      });
  });
});

// =======================================================

app.post("/ratings", (req, res) => {
  // add rating to a recipe
  const recipeId = req.body.recipe_id;
  const newRating = req.body.rating;
  const sessionToken = req.body.sessionToken;

  console.log("(ratings post) object from frontend ===> ", req.body);

  authenticateToken(sessionToken, function (result) {
    if (!res) {
      res.json({
        success: false,
      });
      return;
    }

    knex("ratings")
      .where({
        user_id: result,
      })
      .where({
        recipes_id: recipeId,
      })
      .then(userRating => {
        if (userRating.length !== 0) {
          // user already offered rating -> update needed
          knex("ratings")
            .where({
              user_id: result,
            })
            .where({
              recipes_id: recipeId,
            })
            .del()
            .then(() => {});
        }

        knex("ratings")
          .insert({
            recipes_id: recipeId,
            rating: newRating,
            user_id: result,
          })
          .then(() => {
            knex("ratings")
              .where({
                recipes_id: recipeId,
              })
              .then(avgRates => {
                let avgRating = 0;
                if (avgRates.length === 1) {
                  avgRating = newRating;
                } else {
                  let count = 0;
                  avgRates.forEach(single => {
                    if (single.rating !== null) {
                      avgRating += single.rating;
                      count++;
                    }
                  });
                  avgRating = Math.round(avgRating / count);
                }

                knex("recipes")
                  .where({
                    id: recipeId,
                  })
                  .update({
                    overall_rating: avgRating,
                  })
                  .catch(err => {
                    res.json({
                      success: false,
                    });
                    res.status(500);
                    console.log(err);
                    throw err;
                  })
                  .finally(() => {
                    res.json({
                      success: true,
                    });
                  });
              });
          });
      });
  });
});

app.get("/userRatings/:sessionToken/:recipeId", (req, res) => {
  // see what user gave as rating
  const recipeId = req.params.recipeId;
  const sessionToken = req.params.sessionToken;
  console.log("PARAMS PARAMS PARAMS ======> ", req.params);

  authenticateToken(sessionToken, function (result) {
    if (!res) {
      res.json({
        success: false,
      });
      return;
    }
    knex("ratings")
      .where({
        user_id: result,
      })
      .where({
        recipes_id: recipeId,
      })
      .then(userRating => {
        if (userRating.length === 0) {
          // user did not offer rating
          res.json({
            success: false,
          });
        } else {
          res.json({
            success: true,
            userRating: userRating,
          });
        }
      });
  });
});

/////////////////////////////////////////////////////////
//
// Code for inputing user given images into DigitalOcean, 3rd party storage, and returns URL for image to be inputed into database
//
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

//     res.json({
//       recipeIMG: storedImage,
//       success: true
//     })
//     // return storedImage to be stored in knex, if failed - returns nulls = returned should check if null/valid
// })