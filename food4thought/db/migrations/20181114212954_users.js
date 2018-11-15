
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("users", function (table) {
      table.increments();
      table.string("username");
      table.string("email");
      table.string("password");
      table.string("profileIMG");
      table.string("location");
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable("users"),
  ])
};
