
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries

  return Promise.all([
    knex.raw("ALTER SEQUENCE reviews_id_seq RESTART WITH 1"),
    knex("reviews").del()
      .then(function () {
        return Promise.all([
          knex("reviews").insert({
            rating: 5,
            review_text: "My name is matt damon and this bagel spiced up my day"
          }),

        ]);
      })
  ]);
};
