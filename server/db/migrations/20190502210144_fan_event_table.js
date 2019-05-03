
exports.up = function(knex, Promise) {
  return knex.schema.createTable('fan_event', function(table) {
    table.increments('id').primary();
    table.integer('fanId').unsigned()
    table.foreign('fanId')
    .references('User_fan.id');
  })
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('fan_event')
};
