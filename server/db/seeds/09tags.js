exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries

  return Promise.all([
    knex("tags").del()
      .then(function () {
        return Promise.all([
          //ming
          knex("tags").insert({
            recipes_id: 1,
            category_id: 1
          }),

          knex("tags").insert({
            recipes_id: 2,
            category_id: 2
          }),


          knex("tags").insert({
            recipes_id: 3,
            category_id: 1
          }),

          knex("tags").insert({
            recipes_id: 4,
            category_id: 2
          }),

          
           knex("tags").insert({
            recipes_id: 5,
            category_id: 1
          }),

          knex("tags").insert({
            recipes_id: 6,
            category_id: 2
          }),


          knex("tags").insert({
            recipes_id: 7,
            category_id: 3
          }),

          knex('tags').insert({ 
            recipes_id: 8,
            category_id: 3
          })


        ]);
      })
  ]);
};


