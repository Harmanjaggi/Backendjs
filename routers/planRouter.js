const express = require('express');
var planRouter = express.Router(); 
const { protectRouter, isAuthorised } = require('../controller/authController');
const { getAllPlans, getPlan, createPlan, deletePlan, updatePlan, top3Plans} = require('../controller/plancontroller');

planRouter.route('/allPlans')
    .get(getAllPlans);

planRouter.route('/top3')
    .get(top3Plans);

planRouter.use(protectRouter); 
planRouter.route('/plan/:id')
    .get(getPlan);

planRouter.use(isAuthorised(['admin', 'user']));
planRouter.route('/crudPlan')
    .post(createPlan);

planRouter.route('/crudPlan/:id')
    .patch(updatePlan)
    .delete(deletePlan);

module.exports = planRouter;