exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries

  return Promise.all([
    knex.raw("ALTER SEQUENCE mesurments_id_seq RESTART WITH 1"),
    knex("measurements").del()
      .then(function () {
        return Promise.all([
          knex("measurement").insert({
            measurment: "cups"
          }),
          knex("measurement").insert({
            measurment: "tbsb"
          }),
          knex("measurement").insert({
            measurment: "tsp"
          }),
          knex("measurement").insert({
            measurment: "pinch/dash"
          }),
          knex("measurement").insert({
            measurment: "quarts"
          }),
          knex("measurement").insert({
            measurment: "milliliter"
          }),
          knex("measurement").insert({
            measurment: "liter"
          }),
          knex("measurement").insert({
            measurment: "kilogram"
          }),
          knex("measurement").insert({
            measurment: "pound"
          }),
          knex("measurement").insert({
            measurment: "g",
          }),

        ]);
      })
  ]);
};

