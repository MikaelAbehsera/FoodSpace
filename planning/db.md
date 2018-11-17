## Measurements

1 - cups
2 - tbsp = tablespoon
3 - tsp = teaspoon 
4 - pinch/dash
5 - pints
6 - quarts

7 - ml =  milliliter
8 - l  =  liter
9 - kg = kilogram

10 - lb = pound
11 - g  = grams
12 - //none

## Recipes

recipe1 = {
  name: "The Hot Bagel"
  description: " A bagel with penut butter and hot sauce",
  overall_ratting: 5,
  time: 5, 
  difficulty: 1,
}

knex("recipes").insert({
  name: "Meatloaf",
  description: "meat in a loaf with some veggies,
  overall_rating: 5,
  time: 45,
  difficulty: 3,
  creator_id: 2
})

## reviews 

review = {
  rating: 5,
  review_text: "My name is matt damon and this bagel spiced up my day"
}


## Categories

categories = {
  category_name: "Greasy",
  description: "This chategory is reserved for those who look to gorge on the greasiet meals without shame."
}

categories2 = {
  category_name: "Health nut",
  description: "This chategory is low in calories and high in vegitables. It is reserved for those who desire that banging beach bod."
}

catagories3 = {
  category_name: "Munchies",
  description: " This category  is reserved for those who get home at ungodly hour looking find sustenance in a pinch"
}


## ingredients 

ingredients = {
  recipe_id: 1,
  foodtype: "hot sauce",
  quantity: 7, 
  mesurment_id: 6,
}

ingredients2 = {
  recipe_id: 1,
  foodtype: "bagel",
  quantity: 5, 
  mesurment_id: 7 
}

ingredients3 = {
  recipe_id: 1,
  foodtype: "peanut butter",
  quantity: 7,
  mesurment_id: 10,
}



knex("ingredients").insert({
  recipes_id: 2,
  measurement_id: 10,
  food_type: "mince meat", 
  quantity: 1
})

knex("ingredients").insert({
  recipes_id: 2,
  measurement_id: 10,
  food_type: "bread", 
  quantity: 1
})

knex("ingredients").insert({
  recipes_id: 2,
  measurement_id: 10,
  food_type: "carrots", 
  quantity: 3
})

knex("ingredients").insert({
  recipes_id: 2,
  measurement_id: 7,
  food_type: "milk", 
  quantity: 20
})

knex("ingredients").insert({
  recipes_id: 2,
  measurement_id: 11,
  food_type: "egg", 
  quantity: 1
})
          



## instructions

instructions = {
  recipe_id: 1, 
  step_number: 1,
  step_description: "Cut the bagel in two."
}

instructions = {
  recipe_id: 1, 
  step_number: 2,
  step_description: "Toast the bagel (recommend using a toaster to toast this toastable non-toast product)."
}

instructions = {
  recipe_id: 1, 
  step_number: 3,
  step_description: "Apply the peanut butter deliciousness."
}

instructions = {
  recipe_id: 1, 
  step_number: 4,
  step_description: "Drizzle on the hot sauce."
}

instructions = {
  recipe_id: 1, 
  step_number: 5,
  step_description: "Enjoy with a hot cup of coffee :)"
}





instructions = {
  recipe_id: 2, 
  step_number: 1,
  step_description: "boil the carrots til soft and put them aside - keep the water."
}

instructions = {
  recipe_id: 2, 
  step_number: 2,
  step_description: "break the bread up and mix with milk until mushy, add water from carrot boil if need be."
}

instructions = {
  recipe_id: 2, 
  step_number: 3,
  step_description: "Mix the meat and the carrots into the bread mush."
}

instructions = {
  recipe_id: 2, 
  step_number: 4,
  step_description: "Season with salt and pepper - mix until homogeneous."
}

instructions = {
  recipe_id: 2, 
  step_number: 5,
  step_description: "Cook in bread pan, optional: topped with ketchup/tomatoe paste, for 1hr."
}


## User
 
 username: "Remy the chef"
 email: "email@email.com"
 password: "password"
 profileIMG: "blank"
 location: "Montreal"




## stretch ideas

fav meals
main mean
tags 

* User
  * can pick a funny quote to display on profile
  * like user description thing
  * sets it to random if not specified
    * will need a quotes table/db to store and update with relevant quotes
    * users should be able to choose a quote from the randomized OR put their own original quote

* Mealsmade
  * "picture" column - string - url of pic
  * add picture of the creation to show off
  * could happen with a "showing off your creation" feature -> make a meal, take a pic, post to instagram/fb/snapchat, pic saves to your meals made wall of fame
  * so save pic to db would need to know how to convert pictures to json? to string? :/






