const express = require('express');
const PORT = process.env.PORT || 3001;
const knex = require('./knex/knex.js');
const app = express();
require('dotenv').config()

app.get('/tasks', (req, res) => {
  // use the knex variable above to create dynamic queries
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});


    // do the things  
    const value = this._form.getValue(); // use that ref to get the form value

    // knex => users table where email matches
    //          get password
    //          check password matches  -> if yes redirect to home
    //                                  -> if no ERROR PAGE

    console.log('value: ', value);
    if (value) { // if validation fails, value will be null
    setTimeout(() => { this.redirect("Home") }, 200);
    }