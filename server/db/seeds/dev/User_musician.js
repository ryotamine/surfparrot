
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('User_musician').del()
  .then(function () {
    // Inserts seed entries
    return knex('User_musician').insert([
      { 
        musician_first_name: 'Gary', 
        musician_last_name: 'Numan', 
        musician_email: 'gary@numan.com', 
        password_digest: '111' 
      }
    ]);
  });
};