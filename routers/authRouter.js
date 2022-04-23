const express = require('express');
var authRouter = express.Router();
const userModel = require('../models/usermodel');

authRouter
    .route('/signup')
    .get(middleware1, getSignUp, middleware2)
    .post(postSignUp);

authRouter
    .route('/login')
    .post(LogInUser);

function middleware1(req, res, next) {
    console.log('middleware1 encounter');
    next();
}

function middleware2(req, res) {
    console.log('middleware2 encounter');
    // next();
    res.sendFile('public/index.html', { root: __dirname });
}

function getSignUp(req, res, next) {

    console.log('get Sign Up');
    next();
}

async function postSignUp(req, res) {
    let dataObj = req.body;
    let user = await userModel.create(dataObj);
    res.json({
        message: "user is signed up",
        data: user
    });
}

async function LogInUser(req, res) {
    console.log('enter login');
    let data = req.body;
    if (data.email) {
        let user = await userModel.findOne({ email: data.email });
        try {
            if (user) {
                // bycript->compare
                if (user.password == data.password) {
                    return res.json({
                        message: 'User has logged in',
                        userDetails: data,
                    })
                }
                else {
                    return res.json({
                        message: 'worng credential'
                    })
                }
            }
        }
        catch (err) {
            return res.json({
                message: err.message
            })
        }
    }
    else {
        return res.json({
            message:'enter correct email',
        })
    }
}

module.exports = authRouter;
    