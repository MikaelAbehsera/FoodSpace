exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries

  return Promise.all([
    knex.raw("ALTER SEQUENCE recipes_id_seq RESTART WITH 1"),
    knex("recipes").del()
      .then(function () {
        return Promise.all([
          knex("recipes").insert({
            name: "The Hot Bagel",
            description: "A bagel with peanut butter and hot sauce",
            recipeIMG: "http://www.noexcusesnutrition.com/wp-content/uploads/2016/02/IMG_1748-300x300.jpg",
            overall_rating: 5,
            time: 5,
            difficulty: 1,
            creator_id: 1
          }),

          knex("recipes").insert({
            name: "Meatloaf",
            description: "Meat in a loaf with some veggies",
            recipeIMG: "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2013/7/9/0/FN_CHARITY-BOYD-MOMS-MEATLOAF_s4x3.jpg.rend.hgtvcom.616.462.suffix/1382544970100.jpeg",
            overall_rating: 5,
            time: 45,
            difficulty: 3,
            creator_id: 2
          }),

          knex("recipes").insert({
            name: "PB&J supreme",
            description: "The greatest PJ & J sandwich ever",
            recipeIMG: "https://www.chowstatic.com/assets/recipe_photos/30000_grilled_peanut_butter_jelly.jpg",
            overall_rating: 5,
            time: 10,
            difficulty: 1,
            creator_id: 1
          }),

          knex("recipes").insert({
            name: "Egg fried rice",
            description: "Meat in a loaf with some veggies",
            recipeIMG: "https://c1.staticflickr.com/4/3371/3177377867_99f2e0147f_b.jpg",
            overall_rating: 3,
            time: 20,
            difficulty: 1,
            creator_id: 2
          }),
          knex("recipes").insert({
            name: "Steak and potatoes",
            description: "A 14 0z Tbone steak with baked potatoes",
            recipeIMG: "http://jikoniyetu.com/wp-content/uploads/2018/02/steak-1.jpg",
            overall_rating: 4,
            time: 45,
            difficulty: 2,
            creator_id: 1,

          }),
          knex("recipes").insert({
            name: "Pumkin Pie",
            description: "A classic pie recipe for holiday feasts",
            recipeIMG: "data:image/jpeg;base64,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",
            overall_rating: 2,
            time: 27,
            difficulty: 2,
            creator_id: 2,
          }),
          knex("recipes").insert({
            name: "Scrambled eggs",
            description: "Scrambled chicken eggs",
            recipeIMG: "http://aucdn.ar-cdn.com/recipes/port500/17a47fa0-b5c9-426e-b239-575c2e687fce.jpg",
            overall_rating: 4,
            time: 4,
            difficulty: 3,
            creator_id: 3,
          }),
          knex("recipes").insert({
            name: "Rice and olives",
            description: "A meal reserved for those who are down and out and need a solid meal",
            recipeIMG: "http://starfinefoods.com/wp-content/uploads/RICE-WITH-BLACK-BEANS-AND-OLIVES.jpg",
            overall_rating: 5,
            time: 20,
            difficulty: 1,
            creator_id: 3,
          }),

          knex("recipes").insert({
            name: "French Toast",
            description: "A sweet and tasty breakfast treat",
            recipeIMG: "https://www.publicdomainpictures.net/pictures/20000/nahled/french-toast.jpg",
            overall_rating: 4,
            time: 20,
            difficulty: 2,
            creator_id: 1,
          }),

          knex("recipes").insert({
            name: "Biscuits",
            description: "Light and fluffy snack/treat",
            recipeIMG: "https://upload.wikimedia.org/wikipedia/commons/9/90/Biscuit_which_has_been_broken_open.jpg",
            overall_rating: 4,
            time: 30,
            difficulty: 2,
            creator_id: 3,
          }),

          knex("recipes").insert({
            name: "Lasagna",
            description: "Comfort food with carbohydrates layers of love",
            recipeIMG: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Lasagna.jpg",
            overall_rating: 4,
            time: 40,
            difficulty: 2,
            creator_id: 1,
          })
        ]);
      })
  ]);
};