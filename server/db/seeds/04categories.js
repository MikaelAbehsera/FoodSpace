exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.all([
    knex.raw("ALTER SEQUENCE categories_id_seq RESTART WITH 1"),
    knex("categories")
      .del()
      .then(function () {
        return Promise.all([
          knex("categories").insert({
            category_name: "Greasy",
            category_description: "This chategory is reserved for those who look to gorge on the greasiet meals without shame."
          }),

          knex("categories").insert({
            category_name: "Health nut",
            category_description: "This chategory is low in calories and high in vegitables. It is reserved for those who desire that banging beach bod."
          }),

          knex("categories").insert({
            category_name: "Munchies",
            category_description: "This category  is reserved for those who get home at ungodly hour looking find sustenance in a pinch"
          })


        ]);
      })
  ]);
};
