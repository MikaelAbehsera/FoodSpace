const express = require('express');
var router = express.Router();


 
module.exports = (knex) => {

  router.get("/review", (req, res) => {
    knex("reviews")
    .select("*")
    .innerJoin("recipes", "recipes.id", "reviews.recipes_id")
    .then((allreviews) => {
      res.json({review: allreviews})
    })
  });
  
  router.post("/review", (req, res) => {
    // add review to a recipe
    const recipeID = 1;
    const newRating = req.body.rating;
    const newReviewtext = req.body.reviewText;

    knex("reviews")
      .insert({
        recipes_id: recipeID,
        rating: newRating,
        review_text: newReviewtext
      })
      .then(() => {
        knex("reviews")
          .avg("rating")
          .then((avgRating) => {
            knex("recipes")
              .where({
                id: recipeID
              })
              .update({
                overall_rating: avgRating
              })
              .catch((err) => {
                res.json({
                  success: false
                });
                res.status(404);
                console.log(err);
                throw err;
              })
              .finally(() => {
                res.json({
                  success: true
                });
              });

          });
      });
  });

}