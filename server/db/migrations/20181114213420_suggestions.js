
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("suggestions", function (table) {
      table.increments();
      table.integer("recipes_id");
      table.string("suggest_text");
      table.integer("plus")
      table.integer("minus")

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
    knex.schema.dropTable("suggestions"),
  ]);
};
