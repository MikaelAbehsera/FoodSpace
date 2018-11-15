exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries

  return Promise.all([
    knex.raw("ALTER SEQUENCE recipes_id_seq RESTART WITH 1"),
    knex("recipes").del()
      .then(function () {
        return Promise.all([
          knex("recipes").insert({
            name: "The Hot Bagel",
            description: "A bagel with penut butter and hot sauce",
            overall_rating: 5,
            time: 5,
            difficulty: 1,
            creator_id: 1
          })

        ]);
      })
  ]);
};
