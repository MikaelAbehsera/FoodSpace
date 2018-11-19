
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("tags", function(table) {
     
     table.increments()
     table.integer("recipes_id")
     table.integer("category_id")
    
     table
     .foreign("recipes_id")
     .references("id")
     .on("recipes")
     .onDelete("cascade");

   table
     .foreign("category_id")
     .references("id")
     .on("categories")
     .onDelete("cascade");

    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable("tags")
  ]);
};
