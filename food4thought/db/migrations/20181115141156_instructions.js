
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("instructions", function(table) {
      table.increments()
      table.integer("recipes_id")
      table.integer("step_number")
      table.string('step_description')

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
    knex.schema.dropTable("instructions")
  ]);
  
  
};
