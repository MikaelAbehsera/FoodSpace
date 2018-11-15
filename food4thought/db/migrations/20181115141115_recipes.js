
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("recipes", function(table) {
      table.increments()
      table.integer("recipe_id")
      table.string("name")
      table.string("description")
      table.integer("overall_rating")
      table.integer("time")
      table.integer("difficulty")
      table.integer("creator_id")
      
      table 
      .foreign("recipe_id")
      .references("id")
      .on("recipes")
      .onDelete("cascade")
      
      table
      .foreign("creator_id")
      .references("id")
      .on("users")
      .onDelete("cascade")


    });
  ])
  
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('recipes')
  ]);
  
};