const uniqid = require('uniqid');

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries

  return Promise.all([
    knex.raw("ALTER SEQUENCE users_id_seq RESTART WITH 1"),
    knex("users").del()
      .then(function () {
        return Promise.all([
          knex("users").insert({
            username: "Remy the chef",
            email: "dingus@email.com",
            password: "I love matt damon",
            profileIMG: "blank",
            location: "Montreal",
            sessionToken: uniqid()
          }),
          knex("users").insert({
            username: "Jamie Perron",
            email: "imagination@gmail.com",
            password: "something_secret",
            profileIMG: "blank",
            location: "Montreal",
            sessionToken: uniqid()
          }),
          knex("users").insert({
            username: "Matt Damon",
            email: "Uu@e.com",
            password: "Please",
            profileIMG: "blank",
            location: "Montreal",
            sessionToken: uniqid()
          }),

        ]);
      })
  ]);
};
