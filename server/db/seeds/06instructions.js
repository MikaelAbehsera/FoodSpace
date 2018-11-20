exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.all([
    knex.raw("ALTER SEQUENCE instructions_id_seq RESTART WITH 1"),
    knex("instructions")
      .del()
      .then(function () {
        return Promise.all([
          knex("instructions").insert({
            recipes_id: 1,
            step_number: 1,
            step_description: "Cut the bagel in two."
          }),

          knex("instructions").insert({
            recipes_id: 1,
            step_number: 2,
            step_description: "Toast the bagel (recommend using a toaster to toast this toastable non-toast product)."
          }),

          knex("instructions").insert({
            recipes_id: 1,
            step_number: 3,
            step_description: "Apply the peanut butter deliciousness."
          }),

          knex("instructions").insert({
            recipes_id: 1,
            step_number: 4,
            step_description: "Drizzle on the hot sauce."
          }),

          knex("instructions").insert({
            recipes_id: 1,
            step_number: 5,
            step_description:"Enjoy with a hot cup of coffee :)"
          }),



          knex("instructions").insert({
            recipes_id: 2,
            step_number: 1,
            step_description: "boil the carrots til soft and put them aside - keep the water."
          }),

          knex("instructions").insert({
            recipes_id: 2,
            step_number: 2,
            step_description: "break the bread up and mix with milk until mushy, add water from carrot boil if need be."
          }),

          knex("instructions").insert({
            recipes_id: 2,
            step_number: 3,
            step_description: "Mix the meat and the carrots into the bread mush."
          }),
          
          knex("instructions").insert({
            recipes_id: 2,
            step_number: 4,
            step_description: "Season with salt and pepper - mix until homogeneous."
          }),

          knex("instructions").insert({
            recipes_id: 2,
            step_number: 5,
            step_number: 5,
            step_description: "Cook in bread pan, optional: topped with ketchup/tomatoe paste, for 1hr."
          }), 

          
          knex("instructions").insert({
            recipes_id: 5,
            step_number: 1,
            step_description: "Let stake sit out for 20 minutes at room temperature."
          }),

          knex("instructions").insert({
            recipes_id: 5,
            step_number: 2,
            step_description: "heavly season steak with sea salt and pepper."
          }),

          knex("instructions").insert({
            recipes_id: 5,
            step_number: 3,
            step_description: "Place in olived oiled pan at high heat."
          }),
          
          knex("instructions").insert({
            recipes_id: 5,
            step_number: 4,
            step_description: "Turn once at chefs own discretion."
          }),

          knex("instructions").insert({
            recipes_id: 5,
            step_number: 5,
            step_description: "Let it rest for 2 minutes."
          }),
          
          knex("instructions").insert({
            recipes_id: 6,
            step_number: 1,
            step_description: "Boil pasta."
          }),

          knex("instructions").insert({
            recipes_id: 6,
            step_number: 2,
            step_description: "fry some beef."
          }),

          knex("instructions").insert({
            recipes_id: 6,
            step_number: 3,
            step_description: "add tomato sauce."
          }),
          
          knex("instructions").insert({
            recipes_id: 6,
            step_number: 4,
            step_description: "put sauce on pasta."
          }),

          knex("instructions").insert({
            recipes_id: 6,
            step_number: 5,
            step_description: "Apply chesse to meal."
          }),
          
           knex("instructions").insert({
            recipes_id: 7,
            step_number: 1,
            step_description: "Crack x amount of eggs and wisk in a bowl."
          }),

          knex("instructions").insert({
            recipes_id: 7,
            step_number: 2,
            step_description: "Apply  butter to mixture."
          }),

          knex("instructions").insert({
            recipes_id: 7,
            step_number: 3,
            step_description: "poor micture into pan on low heat."
          }),
          
          knex("instructions").insert({
            recipes_id: 7,
            step_number: 4,
            step_description: "stir eggs untill they begin to form."
          }),

          knex("instructions").insert({
            recipes_id: 7,
            step_number: 5,
            step_description: "Plate eggs and apply salt and peper."
          }),
        
        knex("instructions").insert({
          recipes_id: 8,
          step_number: 1,
          step_description: "Make rice in a rice cooker or pot."
        }),

        knex("instructions").insert({
          recipes_id: 8,
          step_number: 2,
          step_description: "Apply  butter to mixture."
        }),

        knex("instructions").insert({
          recipes_id: 8,
          step_number: 3,
          step_description: "Poor rice into a bowl and apply olives and choice of beans."
        }),
        
        knex("instructions").insert({
          recipes_id: 8,
          step_number: 4,
          step_description: "Bonus:add eggs for a little boost in protien."
        }),

        knex("instructions").insert({
          recipes_id: 8,
          step_number: 5,
          step_description: "Add seasoning by way of soy sauce/ hot sauce/ bbq sauce."
        })   

        ]);
      })
  ]);
};
