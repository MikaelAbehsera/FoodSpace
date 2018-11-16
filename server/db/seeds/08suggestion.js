
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries

  return Promise.all([
    knex.raw("ALTER SEQUENCE suggestions_id_seq RESTART WITH 1"),
    knex("suggestions").del()
      .then(function () {
        return Promise.all([
          knex("suggestions").insert({
            recipes_id: 1,
            suggest_text: "Dont put too much penut butter",
            plus: 2,
            minus: 6
          })

        ]);
      })
  ]);
};


