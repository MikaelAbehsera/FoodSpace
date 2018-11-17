
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("ingredients", function(table) {
      table.increments()
      table.integer("recipes_id")
      table.string("food_type")
      table.string("quantity")
      
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
    knex.schema.dropTable("ingredients")
  ]);
  
};
