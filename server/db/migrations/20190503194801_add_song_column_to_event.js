exports.up = function(knex, Promise) {
  return knex.schema.table('Event', function(table) {
    table.string('song');
  })
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('Event')
};
