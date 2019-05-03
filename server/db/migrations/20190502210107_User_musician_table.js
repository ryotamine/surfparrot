
exports.up = function(knex, Promise) {
return knex.schema.createTable('User_musician', function(table) {
    table.increments('id').primary();
    table.string('musician_first_name');
    table.string('musician_last_name');
    table.string('musician_email');
    table.string('password_digest');
  })
}

exports.down = function(knex, Promise) {
  knex.schema.dropTable('User_musician')
};
