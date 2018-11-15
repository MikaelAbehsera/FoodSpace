
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("instructions", function(table) {
      table.increments()
      table.integer("recipe_id")
      table.integer("step_number")
      table.string('step_description')

      table
      .foreign("recipe_id")
      .references("recipes")
      .on("instructions")
      .onDelete("cascade");
 


    })
  ])
  
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable("instructions")
  ]);
  
  
};
