
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("recipes", function(table) {
      table.increments()
      table.string("name")
      table.string("description")
      table.integer("overall_rating")
      table.integer("time")
      table.integer("difficulty")
      table.integer("creator_id")

      table
      .foreign("creator_id")
      .references("id")
      .on("users")
      .onDelete("cascade")

    })
  ])
  
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('recipes')
  ]);
  
};