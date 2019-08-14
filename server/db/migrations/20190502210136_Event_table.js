
exports.up = function(knex, Promise) {
  return knex.schema.createTable("Event", function(table) {
    table.increments("id").primary();
    table.string("event");
    table.string("date");
    table.string("location");
    table.integer("userMusicianId").unsigned()
    table.foreign("userMusicianId")
    .references("User_musician.id");
  })
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable("Event")
};
