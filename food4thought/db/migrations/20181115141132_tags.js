
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("tags", function(table) {
     
     table.integer("id")
     table.integer("recipie_id")
     table.integer("category_id")
    
     table
     .foreign("recipe_id")
     .references("id")
     .on("categories")
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
