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
          })

        ]);
      })
  ]);
};
