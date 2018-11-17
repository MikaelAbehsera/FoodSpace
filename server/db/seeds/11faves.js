exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries

  return Promise.all([
    knex("faves").del()
      .then(function () {
        return Promise.all([
          knex("faves").insert({
            recipes_id: 1,
            user_id: 1
          }),

          knex("faves").insert({
            recipes_id: 2,
            user_id: 1
          })

        ]);
      })
  ]);
};


