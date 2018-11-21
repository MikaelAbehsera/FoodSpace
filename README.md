# Food4Thought App

A mobile application to foster co


Food is a focal point in all our lives.  Cooking not only sustains life, but bridges cultures and fosters interpersonal relationships like no other creative median can. Food4thought  is an app that will allow users to have acess to recipies from regions  all over the world at thier disposal. With the touch of button a user will have a recipe for butter chicken to cook for thier partner on an aniverserary or the best way to cook a turkey on thanksgiving. We belive human live to eat not eat to live and Food4Thought will allow users to  have  the gastronomic universe in thier pockets .

## Collaborators

[Mikael Abehsera](https://github.com/MikaelAbehsera)

[Charlotte Haras](https://github.com/char55)

[Terence Hawes](https://github.com/Terence1991)

## Setup

1. Clone this repo
2. Create a Postgres database with any appropriate name
3. Go to the server folder: cd server
4. Following the .env.example, create a .env file cp .env.example .env, replace the field by the link of your database
5. Install the dependencies: npm i
6. Run migrations: knex migrate:latest
7. Run the seed: knex seed:run
8. Open up the server: node server.js
?????????????????

## Demos of the app

![alt text](url link to pic on github)


## Dependencies

- Node 5.10.x or above
- NPM 3.8.x or above

## Features




## User Stories
* users should be able to implement their own recipes 
* users should be able to query recipes using tags  and the recipes will be filtered that specific query
* categories should be user friendly(ie funky munchies, feeling fatty, lame vegan, habbibi halal)
* user can  favorites recipes,  implements suggestions,   and add review.
* user can view themselves 
* user registration/ login 
* users can reset password (forgot password?)