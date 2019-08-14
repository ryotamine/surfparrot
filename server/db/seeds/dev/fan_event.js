
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("fan_event").del()
  
  .then (() => {
    return knex("fan_event").insert([
    {
      id: 1,
    },
    ])
  })
};