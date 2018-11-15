
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("ingredients", function(table) {
      tabe.increments()
     
      table.integer("recipes_id")
      table.string("food_type")
      table.string("quantity")
      table.integer("mesurment_id")
      
      table
      .foreign("recipes_id")
      .references("recipes")
      .on("ingredients")
      .onDelete("cascade");
 
    table
      .foreign("category_id")
      .references("recipes")
      .on("ingredient")
      .onDelete("cascade");


    })
  ])
  
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable("ingredients")
  ]);
  
};
