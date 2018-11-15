exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries

  return Promise.all([
    knex.raw("ALTER SEQUENCE measurements_id_seq RESTART WITH 1"),
    knex("measurements").del()
      .then(function () {
        return Promise.all([
          knex("measurements").insert({
            measure: "cups"
          }),
          knex("measurements").insert({
            measure: "tbsb"
          }),
          knex("measurements").insert({
            measure: "tsp"
          }),
          knex("measurements").insert({
            measure: "pinch/dash"
          }),
          knex("measurements").insert({
            measure: "quarts"
          }),
          knex("measurements").insert({
            measure: "milliliter"
          }),
          knex("measurements").insert({
            measure: "liter"
          }),
          knex("measurements").insert({
            measure: "kilogram"
          }),
          knex("measurements").insert({
            measure: "pound"
          }),
          knex("measurements").insert({
            measure: "g",
          }),

        ]);
      })
  ]);
};

