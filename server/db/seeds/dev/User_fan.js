
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("User_fan").del()
  .then(function () {
    // Inserts seed entries
    return knex("User_fan").insert([
      { 
        fan_first_name: "Debbie", 
        fan_last_name: "Harry", 
        fan_email: "debbie@blondie.com", 
        password_digest: "111" 
      }
    ]);
  });
};