
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("replies", function (table) {
      table.increments();
      table.integer("recipes_id");
      table.integer("suggestion_id");
      table.integer("user_id");
      table.string("reply");

      table
      .foreign("recipes_id")
      .references("id")
      .on("recipes")
      .onDelete("cascade");

      table
      .foreign("suggestion_id")
      .references("id")
      .on("suggestions")
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
    knex.schema.dropTable("replies"),
  ]);
};
