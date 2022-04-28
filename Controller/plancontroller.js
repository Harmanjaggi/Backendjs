const res = require("express/lib/response");
const { find } = require("lodash");
const planModel = require("../models/planModel");

module.exports.getAllPlans = async function getAllPlans(req, res) {
    try {
        let plans = await planModel.find();

        if (plans) {
            res.json({
                message: "all plan is received",
                data: plans
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

module.exports.getPlan = async function getPlans(req, res) {
    try {
        let id = req.params.id;
        let plan = await planModel.findById(id);

        if (plan) {
            res.json({
                message: "all plan is received",
                data: plan
            })
        } else {
            res.status(500).json({
                message: "plan not found"
            })
        }
    } catch (e) {
        res.json({
            message: e.message
        })
    }
}

module.exports.createPlan = async function  createPlan(req, res) {
    try {
        let planData = req.body;
        let createdPlan = await planModel.create(planData);

        return res.json({
            message: "plan created successfully",
            data:createdPlan
        })
    } catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
}

module.exports.deletePlan = async function deletePlan(req, res) {
    try {
        let id = req.params.id;
        let deletedPlan = await planModel.findByIdAndDelete(id);

        return res.json({
            message: "plan deleted successfully",
            data:deletedPlan
        })
    } catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
}

module.exports.updatePlan = async function updatePlan(req, res) {
    try {
        let id = req.params.id;
        let dataToBeUpdated = req.body;
        let plan = await planModel.findById(id);
        if (plan) {
            for (let key in dataToBeUpdated)
                plan[key] = dataToBeUpdated[key];
            await plan.save();
            return res.json({
                message: "plan updated successfully",
                data: plan
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

module.exports.top3Plans = async function top3Plans(req, res) {
    try {
        let plans = await planModel.find().sort({ ratingsAverage: -1 }).limit(3);
        return res.json({
            message: "top3 plans",
            data: plans
        })
    } catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
}

