const express = require('express');
const environment = 'development';
const config = require('./knexfile.js')[environment];
const PORT = process.env.PORT || 3000;
const knex = require('knex')(config);
const app = express();
const bodyParser = require("body-parser");
require('dotenv').config()

const login = require('./routes/login.js')
const user = require('./routes/user.js')
const recipes = require('./routes/recipes.js')
const suggestions = require('./routes/suggestions.js')
const reviews = require('./routes/reviews.js')

app.use('/', login(knex))
app.use('/', user(knex))
app.use('/', recipes(knex))
app.use('/', suggestions(knex))
app.use('/', reviews(knex))

console.log("Made it to login!")

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require("method-override")());

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
