exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.all([
    knex.raw("ALTER SEQUENCE ingredients_id_seq RESTART WITH 1"),
    knex("ingredients")
      .del()
      .then(function () {
        return Promise.all([
          knex("ingredients").insert({
            recipes_id: 1,
            measurement_id: 3,
            food_type: "hot sauce", 
            quantity: 3,
          }),

          knex("ingredients").insert({
            recipes_id: 1,
            measurement_id: 2,
            food_type: "bagel", 
            quantity: 10,
          }),

          knex("ingredients").insert({
            recipes_id: 1,
            measurement_id: 3,
            food_type: "peanut butter", 
            quantity: 7,
          })


        ]);
      })
  ]);
};
