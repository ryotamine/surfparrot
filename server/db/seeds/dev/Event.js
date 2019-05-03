
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Event').del()
  
  .then (() => {
    return knex('Event').insert([
    {
      event: 'Esthers Show',
      date: 'May 5, 2019',
      location: 'Garrison'
    },
  ])
  })
};