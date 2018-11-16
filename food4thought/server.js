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


// knex("users")
// where({email: email})
// .then((data) => { 
// bcrypt.compare(data.password, hash, function(err, res) {
//  if (res === true) {
//  setTimeout(() => { this.redirect("Home") }, 200);
//  } else {
//  console.log("Error")
//   }
//  })
// });
