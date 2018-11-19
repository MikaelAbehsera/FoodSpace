exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries

  return Promise.all([
    knex.raw("ALTER SEQUENCE recipes_id_seq RESTART WITH 1"),
    knex("recipes").del()
      .then(function () {
        return Promise.all([
          knex("recipes").insert({
            name: "The Hot Bagel",
            description: "A bagel with penut butter and hot sauce",
            recipeIMG: "https://us.123rf.com/450wm/stockfood/stockfood1709/stockfood170900451/87359335-a-grilled-bagel-with-peanut-butter-and-jam-close-up-.jpg",
            overall_rating: 5,
            time: 5,
            difficulty: 1,
            creator_id: 1
          }),
          
          knex("recipes").insert({
            name: "Meatloaf",
            description: "meat in a loaf with some veggies",
            recipeIMG: "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2013/7/9/0/FN_CHARITY-BOYD-MOMS-MEATLOAF_s4x3.jpg.rend.hgtvcom.616.462.suffix/1382544970100.jpeg",
            overall_rating: 5,
            time: 45,
            difficulty: 3,
            creator_id: 2
          }),

          knex("recipes").insert({
            name: "The Hot Bagel2",
            description: "A bagel with penut butter and hot sauce",
            recipeIMG: "https://us.123rf.com/450wm/stockfood/stockfood1709/stockfood170900451/87359335-a-grilled-bagel-with-peanut-butter-and-jam-close-up-.jpg",
            overall_rating: 5,
            time: 5,
            difficulty: 1,
            creator_id: 1
          }),
          
          knex("recipes").insert({
            name: "Meatloaf2",
            description: "meat in a loaf with some veggies",
            recipeIMG: "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2013/7/9/0/FN_CHARITY-BOYD-MOMS-MEATLOAF_s4x3.jpg.rend.hgtvcom.616.462.suffix/1382544970100.jpeg",
            overall_rating: 5,
            time: 45,
            difficulty: 3,
            creator_id: 2
          }),
        ]);
      })
  ]);
};
