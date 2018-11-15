
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("measurements", function(table) {
      table.increments()
      table.string("measurement")
    })
  ])
  
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable("measurements")
  ]);
  
};
