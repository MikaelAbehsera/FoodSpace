
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries

  return Promise.all([
    knex.raw("ALTER SEQUENCE suggestions_id_seq RESTART WITH 1"),
    knex("suggestions").del()
      .then(function () {
        return Promise.all([
          knex("suggestions").insert({
            recipes_id: 1,
            suggest_text: "Dont put too much peanut butter",
            plus: 2,
            minus: 6,
            user_id: 1
          }),
          
        knex("suggestions").insert({
            recipes_id: 1,
            suggest_text: "Use franks redhot sauce",
            plus: 2,
            minus: 5,
            user_id: 1
          }),
        
        knex("suggestions").insert({
            recipes_id: 1,
            suggest_text: "Buy Bagels fresh from fairmount bagel",
            plus: 2,
            minus: 6,
            user_id: 1
          }),
            
          


        ]);
      })
  ]);
};


