
exports.up = function(knex, Promise) {
  return knex.schema.createTable("User_fan", function(table) {
    table.increments("id").primary();
    table.string("fan_first_name");
    table.string("fan_last_name");
    table.string("fan_email");
    table.string("password_digest");
  })
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable("User_fan")
};
