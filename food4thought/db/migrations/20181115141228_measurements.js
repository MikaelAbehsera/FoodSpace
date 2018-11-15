
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("mesurments", function(table) {
      table.increments()
      table.string("mesurment")
    })
  ])
  
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable("mesurments")
  ]);
  
};
