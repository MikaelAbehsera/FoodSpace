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
      username: req.body.username.trim(),
      email: req.body.email.trim().toLowerCase(),
      password: req.body.password.trim(),
      profileIMG: req.body.profilePictureURL.trim(),
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


app.post("/login" , (req, res) => {
  const email =  req.body.email.trim().toLowerCase();
  const password = req.body.password.trim();

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
  knex("recipies")
  .insert({})
  .returning()
  .then((id) => {
    

  })

});


app.get("/recipe_list" , (req, res) => {
  knex
    .select("*")
    .from("recipes")
    .innerJoin("tags", "recipes.id", "tags.recipes_id")
    .innerJoin("categories", "tags.category_id", "categories.id")
    .then((allRecipes) => {
      console.log(allRecipes)
      res.json({recipes: allRecipes})
      res.status(200)
    })
    .catch((err) => {
      res.json({id: -1, success: false})
      res.status(404)
      console.log(err); throw err;
    })
    .finally(() => {
    });

});

app.get("/recipe_details" , (req, res) => {
   knex
   .select("*")
   .from('Recipes')
   .innerJoin("instructions", "instructions.recipe_id", "recipes.id")
   .innerJoin("ingredients", "ingredients.recipes_id",  "recipes.id")
   .innerJoin("measurements", "measurement.id", "ingredients.measurement_id")
   .then((recipeDeatails) => {


   })

});

app.get("/profile" , (req, res) => {
// user info
// user id is given a

  const givenID = req.body.id
  knex
    .select("*")
    .from("recipes")
    .innerJoin("users", "users.id", "recipes.creator_id") 
    .where("users.id", givenID)
    .innerJoin("mademeals", "users.id", "mademeals.user_id")
    .where("mademeals.user_id", givenID)
    .innerJoin("faves", "users.id", "faves.user_id")
    .where("faves.user_id", givenID)
    .then((data) => {
      console.log(data)
    })
    
  // to display all of recipes created by the user

app.post("/fave" , (req, res) => {
const userId = req.body.user_id
const recipeid = req.body.recpies_id
const check = req.body.check

const favRecipesAdd = {
  user_id: userId,
  recipes_id: recipeid 
}
if (check === true) {
  knex("faves")
  .insert(favRecipesAdd)
  .then(() => {
    res.json({sucsess: true})
  })
} else {
  knex("faves")
  .where({user_id: userId, recipes_id: recipeid})
  .del()
  .then(() => {
    res.json({sucsess: true})
  })
}

});

app.post("/mealmade" , (req, res) => {
// add recipe to users mealmade
});


app.get("/suggestions", (req, res) => {
  knex("suggestions")
  .select("*")
  .innerJoin("recipes", "recipes.id", "suggestions.recipes_id")
  .then((allSuggestions) => {
    res.json({suggestions: allSuggestions})
  })
});



app.post("/plus", (req, res) => {
  const userId = req.body.user_id
  const recipeid = req.body.recpies_id
  const check = req.body.check
  
  const userPlus = {
    user_id: userId,
    recipes_id: recipeid 
  }
  
  if (check === true) {
    knex('suggestions')
    insert(userPlus)
    res.json({sucsess:true})
  }

})

app.post("/minus", (req, res) => {
  

});

  

app.post("/fave" , (req, res) => {
  const userId = req.body.user_id
  const recipeid = req.body.recpies_id
  const check = req.body.check
  
  const favRecipesAdd = {
    user_id: userId,
    recipes_id: recipeid 
  }
  if (check === true) {
    knex("faves")
    .insert(favRecipesAdd)
    .then(() => {
      res.json({sucsess: true})
    })
  } else {
    knex("faves")
    .where({user_id: userId, recipes_id: recipeid})
    .del()
    .then(() => {
      res.json({sucsess: true})
    })
  }
  
  });