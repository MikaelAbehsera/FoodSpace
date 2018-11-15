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

## Recipes

recipe1 = {
  name: "The Hot Bagel",
  description: " A bagel with penut butter and hot sauce",
  overall_ratting: 5,
  time: 5, 
  difficulty: 1,
}

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






