exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries

  return Promise.all([
    knex("mademeals").del()
      .then(function () {
        return Promise.all([
          knex("mademeals").insert({
            recipes_id: 1,
            user_id: 3
          }),

          knex("mademeals").insert({
            recipes_id: 2,
            user_id: 2
          })

        ]);
      })
  ]);
};


