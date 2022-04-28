const res = require("express/lib/response");
const { find } = require("lodash");
const reviewModel = require("../models/reviewModel");
const planModel = require("../models/planModel");

module.exports.getAllReviews = async function getAllReviews(req, res) {
    try {
        let reviews = await reviewModel.find();

        if (reviews) {
            res.json({
                message: "all reviews received",
                data: reviews
            })
        } else {
            res.json({
                message: "No data available"
            })
        }
    } catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
}

module.exports.getPlanReview = async function getReview(req, res) {
    try {
        let planId = req.params.id;
        let reviews = await reviewModel.find();
        reviews = reviews.filter(review => review.plan._id == planId);
        res.json({
            message: "all review is received",
            data: reviews
        })
    } catch (e) {
        res.json({
            message: e.message
        })
    }
}

module.exports.createReviews = async function  createReviews(req, res) {
    try {
        let id = req.params.plan;
        let plan = await planModel.findById(id);
        let review = await reviewModel.create(req.body);
        plan.ratingAverage = (plan.ratingAverage + req.body.ratingAverage)/2;
        await plan.save();
        return res.json({
            message: "review created successfully",
            data:review
        })
    } catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
}

module.exports.deleteReviews = async function deleteReviews(req, res) {
    try {
        // review id
        let id = req.body.id;
        let deletedreview = await reviewModel.findByIdAndDelete(id);

        return res.json({
            message: "review deleted successfully",
            data:deletedreview
        })
    } catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
}

module.exports.updateReviews = async function updateReviews(req, res) {
    try {
        // review id
        let id = req.body.id;
        let dataToBeUpdated = req.body;
        let review = await reviewModel.findById(id);
        if (review) {
            for (let key in dataToBeUpdated)
                if(key != 'id')
                    review[key] = dataToBeUpdated[key];
            await review.save();
            return res.json({
                message: "review updated successfully",
                data: review
            })
        }
        else {
            res.json({
                message: "data not found",
            })
        }
    } catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
}

module.exports.top3Reviews = async function top3Reviews(req, res) {
    try {
        let reviews = await reviewModel.find().sort({ rating: -1 }).limit(3);
        return res.json({
            message: "top3 reviews",
            data: reviews
        })
    } catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
}

