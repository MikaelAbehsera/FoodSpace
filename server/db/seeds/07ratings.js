
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries

  return Promise.all([
    knex.raw("ALTER SEQUENCE ratings_id_seq RESTART WITH 1"),
    knex("ratings").del()
      .then(function () {
        return Promise.all([
          knex("ratings").insert({
            recipes_id: 1,
            rating: 5,
            user_id: 1
          })

        ]);
      })
  ]);
};
