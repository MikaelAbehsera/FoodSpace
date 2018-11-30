# Food4Thought App

A mobile application for finding and sharing recipes, searchable via categories.


Food is a focal point in all our lives.  Cooking not only sustains life, but bridges cultures and fosters interpersonal relationships like no other creative median can. Food4thought  is an app that will allow users to have acess to recipies from regions  all over the world at thier disposal. With the touch of button a user will have a recipe for butter chicken to cook for thier partner on an aniverserary or the best way to cook a turkey on thanksgiving. We belive human live to eat not eat to live and Food4Thought will allow users to  have  the gastronomic universe in thier pockets .

## Collaborators

[Mikael Abehsera](https://github.com/MikaelAbehsera)

[Charlotte Haras](https://github.com/char55)

[Terence Hawes](https://github.com/Terence1991)

## Setup

1. Clone this repository
2. Create a Postgres database with any appropriate name
3. open the server file in your code editor
4. Following the .env.example, create a .env file cp .env.example .env, replace the field by the link of your database
5. in one of two terminal windows go to the server file and run "npm i"
6. in the other terminal window go to the client (food4thought) file and run "npm i"
7. in the server window Run migrations: knex migrate:latest
8. in the server window Run the seed: knex seed:run
9. Start up the server: node server.js
10. In another terminal window open the client side folder (food4thought) and run the react-native application by running expo init
11. open the port specified in a browser window 
12. scan the QR code using the expo app and wait for the app to bundle, after a few seconds, the login page will appear.

## Demos of the app

![alt text](url link to pic on github)

## Dependencies

- Node 5.10.x or above
- NPM 3.8.x or above

## Features

* Registration
  * local authorization 
  * user requires to login before using app
  * registration requires 
    * email
    * username
    * password 
      * submitted twice to confirm no typos
    * a hash token
  * bcrypt utilized for secury
  * users are redirected directly to the main application

* Login
  * user requires to login before using app
  * random hash assigned to each user is utilized throughout the application seamlessly to confirm user identity
  * users are redirected directly to the main application

* Search
  * users can browse through a database of recipes
    * Each recipe tile has a 
      * picture
      * title
      * difficulty level
      * time eastimate (for creating the meal)
  * users can chose a category to browse through
    * categories are added to the recipe at the time of creation
    * categories are features on the search page at all time

* Recipe details
  * users can click a recipe that interests them and be lead to a recipe details page
  * users can read details about the recipe (description)
  * users can check all necessary ingredients and instructions
  * users can read suggestions 
    * all logged in users can add a suggestion
    * users can also thumbs up or thumbs down a suggestion
  * users can read reviews/ratings 
    * all logged in users can add a suggestion
    * a recipes overall rating is determined by averaging all submitted ratings

* Profile
  * Each user has their own specified profile page
  * Profile page has user information - username, picture, location - which was provided by user during registration
  * Recipes Created
    * features all recipes created by the specified user
  * Faves
    * features all recipes favourited by the specified user

* Create recipe
  * Form for submitting a new recipe
  * Required
    * Recipe Title
    * Recipe description
    * Recipe picture
    * Estimated time required to make the recipe
    * The difficulty level
    * Ingredients
      * a quantity 
      * the name of the ingredient
      * to be submitted one at a time
    * Instructions
      * to be submitted one at a time
      * Instructions are automatically numbered
      
  


## User Stories

* user  should be able to registration/login securely
* users should be able to implement their own recipes 
* users should be able to query recipes using tags  and the recipes will be filtered that specific query
* categories should be user friendly (ie greasy, munchies, health nut)
* user should be able to favorites recipes 
* user should be able to implements suggestions
* user should be able to add rating
* user should be able to view themselves 


# Demo's
Login and register page
<img src="https://github.com/MikaelAbehsera/food4thought/blob/master/readMeMedia/Screenshot_20181130-130229_Expo.jpg" alt="login page" height="300">
<img src="https://github.com/MikaelAbehsera/food4thought/blob/master/readMeMedia/Screenshot_20181130-130527_Expo.jpg" alt="register page" height="300">

This is the profile page where users can see their information and have quick access to there favorite recipes.
<img src="https://github.com/MikaelAbehsera/food4thought/blob/master/readMeMedia/Screenshot_20181126-183315_Expo.jpg" alt="profile page" height="300">

This is the details page 
<img src="https://github.com/MikaelAbehsera/food4thought/blob/master/readMeMedia/Screenshot_20181128-220011_Expo.jpg" alt="details page" height="300">

These are the create pages
<img src="https://github.com/MikaelAbehsera/food4thought/blob/master/readMeMedia/Screenshot_20181128-215905_Expo.jpg" alt="create1 page" height="300">
<img src="https://github.com/MikaelAbehsera/food4thought/blob/master/readMeMedia/Screenshot_20181128-215910_Expo.jpg" alt="create1 page" height="300">
<img src="https://github.com/MikaelAbehsera/food4thought/blob/master/readMeMedia/Screenshot_20181128-215919_Expo%201.jpg" alt="create1 page" height="300">
<img src="https://github.com/MikaelAbehsera/food4thought/blob/master/readMeMedia/Screenshot_20181128-215925_Expo.jpg" alt="create1 page" height="300">
<img src="https://github.com/MikaelAbehsera/food4thought/blob/master/readMeMedia/Screenshot_20181128-215932_Expo.jpg" alt="create1 page" height="300">