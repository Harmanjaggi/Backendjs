const express = require('express');
var userRouter = express.Router(); 
const userModel = require('../models/usermodel');

userRouter
    .route('/')
    .get(getUsers)
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

async function getUsers(req, res) {
    let allUsers = await userModel.find();
    res.json({
        message: 'list of all users',
        data: allUsers
    });
    // res.send(users);
}

function postUser(req, res) {
    console.log(req.body);
    users = req.body;
    res.json({
        message: "data received successfully",
        user: req.body  
    })
}

async function updateUser(req, res) {
    console.log('req.body-> ', req.body);
    let datatoBeUpdated = req.body;
    let user = await userModel.findOneAndUpdate({email:'abc@gmail.com', datatoBeUpdated});
    // for (key in datatoBeUpdated) {
    //     users[key] = datatoBeUpdated[key];
    // }
    res.json({
        message: "data updated successfully",
        data: user
    })
}

async function deleteUser(req, res) {
    // users = {};
    let dataToBeDeleted = req.body;
    let user = await userModel.findOneAndDelete(dataToBeDeleted);
    res.json({
        message: "data has been deleted",
        data: user
    });
}

function getUserById(req, res) {
    console.log(req.params.id);
    let paramId = req.params.id;
    let obj = {};
    for (let i = 0; i < users.length; i++) {
        if (users[i] ['id'] == paramId){
            obj = users[i];
        }
    }
    res.json({
        message: "req received",
        data:obj
    })
}

function setCookies(req, res) {
    // res.setHeader('Set-Cookie', 'isLoggedIn=true');
    res.cookie('isLoggedIn', true, { maxAge: 1000 * 60 * 60 * 24, secure: true, httpOnly:true});
    res.cookie('isPrimeMember', true);
    res.send('cookies has been set');
}

function getCookies(req, res) {
    let cookies = req.cookies;
    console.log(cookies);
    res.send('cookies received');
}

module.exports = userRouter;