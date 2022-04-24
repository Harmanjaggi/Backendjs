const express = require('express');
var userRouter = express.Router(); 
const protectRouter = require('./authHelper');
const { getUsers, getUserById, updateUser, deleteUser, postUser} = require('../Controller/userController')

userRouter
    .route('/')
    .get(protectRouter, getUsers)
    .post(postUser)
    .patch(updateUser)
    .delete(deleteUser)

userRouter
    .route("/getCookies")
    .get(getCookies);

userRouter
    .route("/setCookies")
    .get(setCookies);

userRouter
    .route('/:id')
    .get(getUserById);



module.exports = userRouter;