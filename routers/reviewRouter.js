const express = require('express');
var reviewRouter = express.Router(); 
const { protectRouter } = require('../controller/authController');
const { getAllReviews, getPlanReview, createReviews, deleteReviews, updateReviews, top3Reviews} = require('../controller/reviewController');

reviewRouter.route('/all')
    .get(getAllReviews);

reviewRouter.route('/top3')
    .get(top3Reviews);

reviewRouter.route('/:id')
    .get(getPlanReview);

reviewRouter.use(protectRouter); 
reviewRouter.route('/crud/:plan')
    .post(createReviews)
    .patch(updateReviews)
    .delete(deleteReviews);

module.exports = reviewRouter;