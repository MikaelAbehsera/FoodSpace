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
            recipes_id: 3,
            step_number: 1,
            step_description: "Spread the peanut butter ona single slice of bread."
          }),

          knex("instructions").insert({
            recipes_id: 3,
            step_number: 2,
            step_description: "Spread the jam on another slice of bread."
          }),

          knex("instructions").insert({
            recipes_id: 3,
            step_number: 3,
            step_description: "Put them slices together mixing the yumminess inside"
          }),

          knex("instructions").insert({
            recipes_id: 3,
            step_number: 4,
            step_description: "butter the outside."
          }),

          knex("instructions").insert({
            recipes_id: 3,
            step_number: 5,
            step_description:"lightly grill the sandwhich. nom nom nom"
          }),


          knex("instructions").insert({
            recipes_id: 4,
            step_number: 1,
            step_description: "Throw the leftover rice into a frying pan."
          }),

          knex("instructions").insert({
            recipes_id: 4,
            step_number: 2,
            step_description: "Add some frozen peas and carrots and cook til all is consistently heated"
          }),

          knex("instructions").insert({
            recipes_id: 4,
            step_number: 3,
            step_description: "Crack an egg and mix her in"
          }),
          
          knex("instructions").insert({
            recipes_id: 4,
            step_number: 4,
            step_description: "Season with salt and pepper."
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
        }),
////////////////
        
        knex("instructions").insert({
          recipes_id: 9,
          step_number: 1,
          step_description: "Mix eggs, cinnamon, and milk in bowl."
        }),

        knex("instructions").insert({
          recipes_id: 9,
          step_number: 2,
          step_description: "let bread soak up the eggy mixture. Let it bathe in it."
        }),

        knex("instructions").insert({
          recipes_id: 9,
          step_number: 3,
          step_description: "Heat up the frying pan with some butter in it.  Medium heat."
        }),
        
        knex("instructions").insert({
          recipes_id: 9,
          step_number: 4,
          step_description: "Add egg-soaked bread to pan.  Cook it lightly and flip."
        }),

        knex("instructions").insert({
          recipes_id: 9,
          step_number: 5,
          step_description: ""
        }) ,

        knex("instructions").insert({
          recipes_id: 10,
          step_number: 1,
          step_description: "Preheat over to 450F."
        }),

        knex("instructions").insert({
          recipes_id: 10,
          step_number: 2,
          step_description: "In a large mixing bowl sift together flour, baking powder and salt. Cut in shortening with fork or pastry blender until mixture resembles coarse crumbs."
        }),

        knex("instructions").insert({
          recipes_id: 10,
          step_number: 3,
          step_description: "Put the milk into flour mixture while stirring with a fork. Mix in milk until dough is soft and moist and pulls away from the side of the bowl."
        }),

        knex("instructions").insert({
          recipes_id: 10,
          step_number: 4,
          step_description: "Turn dough out onto a lightly floured surface and toss with flour until no longer sticky. Roll dough out into a 1/2 inch thick sheet and cut with a floured biscuit or cookie cutter. Press together unused dough and repeat rolling and cutting procedure."
        }),

        knex("instructions").insert({
          recipes_id: 10,
          step_number: 5,
          step_description:"Place biscuits on ungreased baking sheets and bake in preheated oven until golden brown, about 10 minutes."
        }),
         /////////////

        knex("instructions").insert({
          recipes_id: 11,
          step_number: 1,
          step_description: "Boil water, add pasta, cook and remove."
        }),

        knex("instructions").insert({
          recipes_id: 11,
          step_number: 2,
          step_description: "Mix ricotta, egg, and cooked spinach."
        }),

        knex("instructions").insert({
          recipes_id: 11,
          step_number: 3,
          step_description: "Put the milk into flour mixture while stirring with a fork. Mix in milk until dough is soft and moist and pulls away from the side of the bowl."
        }),

        knex("instructions").insert({
          recipes_id: 11,
          step_number: 4,
          step_description: "Turn dough out onto a lightly floured surface and toss with flour until no longer sticky. Roll dough out into a 1/2 inch thick sheet and cut with a floured biscuit or cookie cutter. Press together unused dough and repeat rolling and cutting procedure."
        }),

        knex("instructions").insert({
          recipes_id: 11,
          step_number: 5,
          step_description:"Place biscuits on ungreased baking sheets and bake in preheated oven until golden brown, about 10 minutes."
        })

        ]);
      })
  ]);
};
