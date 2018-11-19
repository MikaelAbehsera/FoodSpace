
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("categories", function(table) {
      table.increments()
      table.string("category_name")
      table.string("category_description")

    })
  ])
  
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable("categories")
  ]);
  
};
