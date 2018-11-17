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
            location: "Montreal"
          }),
          knex("users").insert({
            username: "Remy the chef",
            email: "u@gmail.com",
            password: "p",
            profileIMG: "blank",
            location: "Montreal"
          }),
          knex("users").insert({
            username: "Matt Damon",
            email: "U@e.com",
            password: "P",
            profileIMG: "blank",
            location: "Montreal"
          }),

        ]);
      })
  ]);
};
