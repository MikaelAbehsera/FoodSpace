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
            name: "PB&J supreme",
            description: "the greatest PJ & J sandwhich ever",
            recipeIMG: "https://www.chowstatic.com/assets/recipe_photos/30000_grilled_peanut_butter_jelly.jpg",
            overall_rating: 5,
            time: 10,
            difficulty: 1,
            creator_id: 1
          }),
          
          knex("recipes").insert({
            name: "Egg fired rice",
            description: "meat in a loaf with some veggies",
            recipeIMG: "https://c1.staticflickr.com/4/3371/3177377867_99f2e0147f_b.jpg",
            overall_rating: 3,
            time: 20,
            difficulty: 1,
            creator_id: 2
          }),
          knex("recipes").insert({
            name: "Steak and potatoes",
            description: "A 14 0z Tbone steak with baked potatoes",
            recipeIMG:"http://jikoniyetu.com/wp-content/uploads/2018/02/steak-1.jpg",
            overall_rating: 4, 
            time: 45,
            difficulty: 2,
            creator_id: 1, 

          }),
          knex("recipes").insert({
            name: "Moms Spaggeti",
            description: "The spaggeti that b-rabbit ate before battling poppa doc at the shelter.",
            recipeIMG:"https://data.junkee.com/wp-content/uploads/2016/05/em.jpg",
            overall_rating: 2, 
            time: 27,
            difficulty: 2,
            creator_id: 2, 
          }),
          knex("recipes").insert({
            name: "scrambled eggs",
            description: "Scrambled chicken fetuses",
            recipeIMG:"http://aucdn.ar-cdn.com/recipes/port500/17a47fa0-b5c9-426e-b239-575c2e687fce.jpg",
            overall_rating: 4, 
            time: 4,
            difficulty: 3,
            creator_id: 3, 
          }),
          knex("recipes").insert({
            name: "Rice and olives",
            description: "A meal reserved for those who are down and out and solid meal",
            recipeIMG:"http://starfinefoods.com/wp-content/uploads/RICE-WITH-BLACK-BEANS-AND-OLIVES.jpg",
            overall_rating: 5, 
            time: 20,
            difficulty: 1,
            creator_id: 3, 
          }),
          
          knex("recipes").insert({
            name: "French Toast",
            description: "A sweet and tasty breakfast treat",
            recipeIMG:"https://www.publicdomainpictures.net/pictures/20000/nahled/french-toast.jpg",
            overall_rating: 4, 
            time: 20,
            difficulty: 2,
            creator_id: 1, 
          })


         ]);
      })
  ]);
};
