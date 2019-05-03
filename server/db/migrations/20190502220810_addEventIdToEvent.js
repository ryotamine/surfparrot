
exports.up = function(knex, Promise) {
  return knex.schema.table('fan_event', function(table) {
    table.integer('eventId').unsigned()
    table.foreign('eventId')
    .references('Event.id');
  })
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('fan_event')
};
