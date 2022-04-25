const express = require('express');
var userRouter = express.Router(); 
const { getUser, getAllUser, updateUser, deleteUser } = require('../controller/userController');
const { signup, logIn: logIn, isAuthorised, protectRouter} = require('../controller/authController');
const { application } = require('express');

// user options
userRouter.route('/:id')
    .patch(updateUser)
    .delete(deleteUser);

userRouter.route('/signup')
    .post(signup);

userRouter.route('/login')
    .post(logIn);

// userRouter

//profile page
userRouter.use(protectRouter); 
userRouter.route('/userProfile')
    .get(getUser);

//admin specific
userRouter.use(isAuthorised(['admin']));
userRouter.route('/')
    .get(getAllUser);

module.exports = userRouter;