exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.all([
    knex.raw("ALTER SEQUENCE ingredients_id_seq RESTART WITH 1"),
    knex("ingredients")
      .del()
      .then(function () {
        return Promise.all([
          //ming
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
          }), 
          /////
          knex("ingredients").insert({
            recipes_id: 3,
            food_type: "peanut butter", 
            quantity: "3 tbsp"
          }),
          
          knex("ingredients").insert({
            recipes_id: 3,
            food_type: "bread", 
            quantity: "2 slices"
          }),
          
          knex("ingredients").insert({
            recipes_id: 3,
            food_type: "butter", 
            quantity: "2 tbsp"
          }),
          
          knex("ingredients").insert({
            recipes_id: 3,
            food_type: "jam", 
            quantity: "3 tbsp"
          }),


          knex("ingredients").insert({
            recipes_id: 4,
            food_type: "leftover rice", 
            quantity: "1 cup"
          }),

          knex("ingredients").insert({
            recipes_id: 4,
            food_type: "egg", 
            quantity: "2"
          }),

          knex("ingredients").insert({
            recipes_id: 4,
            food_type: "salt and peper", 
            quantity: "1"
          }),

          knex("ingredients").insert({
            recipes_id: 4,
            food_type: "frozen peas/carrots", 
            quantity: "1/4 cup"
          }),


           knex("ingredients").insert({
            recipes_id: 5,
            food_type: "steak", 
            quantity: "2"
          }),

          knex("ingredients").insert({
            recipes_id: 5,
            food_type: "salt and peper", 
            quantity: "1"
          }),

          knex("ingredients").insert({
            recipes_id: 5,
            food_type: "potatoes", 
            quantity: "7"
          }),

          knex("ingredients").insert({
            recipes_id: 6,
            food_type: "pasta", 
            quantity: "1"
          }),
          
          knex("ingredients").insert({
            recipes_id: 6,
            food_type: "tomato sauce", 
            quantity: "1"
          }),
          
          knex("ingredients").insert({
            recipes_id: 6,
            food_type: "Mince meat", 
            quantity: "3"
          }),
          
          knex("ingredients").insert({
            recipes_id: 7,
            food_type: "butter", 
            quantity: "2"
          }),
          
          knex("ingredients").insert({
            recipes_id: 7,
            food_type: "egg", 
            quantity: "1"
          }), 
          knex("ingredients").insert({
            recipes_id: 7,
            food_type: "bread", 
            quantity: "1"
          }),
          
          knex("ingredients").insert({
            recipes_id: 8,
            food_type: "white or brown rice", 
            quantity: "2 cups"
          }),
          
          knex("ingredients").insert({
            recipes_id: 8,
            food_type: "butter", 
            quantity: "2 tbsp"
          }),
          
          knex("ingredients").insert({
            recipes_id: 8,
            food_type: "Green olives", 
            quantity: "1 can"
          }), 
          knex("ingredients").insert({
            recipes_id: 8,
            food_type: "Hot sauce", 
            quantity: "4 tsp"
          }), 
            //
          knex("ingredients").insert({
            recipes_id: 9,
            food_type: "bread - stale or fresh", 
            quantity: "5 slices"
          }),
          
          knex("ingredients").insert({
            recipes_id: 9,
            food_type: "butter", 
            quantity: "2 tbsp"
          }),
          
          knex("ingredients").insert({
            recipes_id: 9,
            food_type: "eggs", 
            quantity: "2"
          }),          
          knex("ingredients").insert({
            recipes_id: 9,
            food_type: "milk", 
            quantity: "10 ml"
          }), 
          knex("ingredients").insert({
            recipes_id: 9,
            food_type: "cinnamon", 
            quantity: "1 tsp"
          }),
          knex("ingredients").insert({
            recipes_id: 9,
            food_type: "maple syrup", 
            quantity: "2 tsp"
          })
        ]);
      })
  ]);
};
