exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries

  return Promise.all([
    knex.raw("ALTER SEQUENCE users_id_seq RESTART WITH 1"),
    knex("users").del()
      .then(function () {
        return Promise.all([
          knex("users").insert({
            username: "Remy the chef",
            email_name: "dingus@email.com",
            password: "I love matt damon",
            photo_URL: "blank",
           location: "Montreal"
          }),

        ]);
      })
  ]);
};
