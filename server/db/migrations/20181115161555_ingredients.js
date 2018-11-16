
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("ingredients", function(table) {
      table.increments()
      table.integer("recipes_id")
      table.integer("measurement_id")
      table.string("food_type")
      table.string("quantity")
      
      table
      .foreign("recipes_id")
      .references("id")
      .on("recipes")
      .onDelete("cascade");
 
    table
      .foreign("measurement_id")
      .references("id")
      .on("measurements")
      .onDelete("cascade");
    })
  ])
  
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable("ingredients")
  ]);
  
};
