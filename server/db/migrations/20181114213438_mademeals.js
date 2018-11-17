
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("mademeals", function (table) {
      table.increments();
      table.integer("recipes_id");
      table.integer("user_id");

      table
      .foreign("recipes_id")
      .references("id")
      .on("recipes")
      .onDelete("cascade");

    table
      .foreign("user_id")
      .references("id")
      .on("users")
      .onDelete("cascade");
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable("mademeals"),
  ]);
};
