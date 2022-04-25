const express = require('express');
var userRouter = express.Router(); 
const protectRouter = require('./authHelper');
const { getUsers, getAllUser, updateUser, deleteUser} = require('../Controller/userController');
const { application } = require('express');

// user options
userRouter.route('/:id')
    .patch(updateUser)
    .delete(deleteUser);

//profile page
app.use(protectRouter);
userRouter
    .route('/userprofile')
    .get(getUsers);

//admin specific
app.use(isAuthorised(['admin']));
userRoute.route('')
    .get(getAllUser);

// userRouter
//     .route('/')
//     .get(protectRouter, getUsers)
//     .post(postUser)
//     .patch(updateUser)
//     .delete(deleteUser)

// userRouter
//     .route("/getCookies")
//     .get(getCookies);

// userRouter
//     .route("/setCookies")
//     .get(setCookies);

// userRouter
//     .route('/:id')
//     .get(getUserById);

module.exports = userRouter;