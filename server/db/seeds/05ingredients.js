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
            food_type: "hot sauce", 
            quantity: "3"
          }),

          knex("ingredients").insert({
            recipes_id: 1,
            food_type: "bagel", 
            quantity: "1"
          }),

          knex("ingredients").insert({
            recipes_id: 1,
            food_type: "peanut butter", 
            quantity: "7"
          }),

          knex("ingredients").insert({
            recipes_id: 2,
            food_type: "mince meat", 
            quantity: "1"
          }),
          
          knex("ingredients").insert({
            recipes_id: 2,
            food_type: "bread", 
            quantity: "1"
          }),
          
          knex("ingredients").insert({
            recipes_id: 2,
            food_type: "carrots", 
            quantity: "3"
          }),
          
          knex("ingredients").insert({
            recipes_id: 2,
            food_type: "milk", 
            quantity: "2"
          }),
          
          knex("ingredients").insert({
            recipes_id: 2,
            food_type: "egg", 
            quantity: "1"
          })
          
        ]);
      })
  ]);
};
