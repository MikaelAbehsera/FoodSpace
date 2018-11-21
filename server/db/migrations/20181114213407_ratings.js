
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("ratings", function (table) {
      table.increments();
      table.integer("recipes_id");
      table.integer("rating");

      table
      .foreign("recipes_id")
      .references("id")
      .on("recipes")
      .onDelete("cascade");

    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable("ratings"),
  ]);
};
