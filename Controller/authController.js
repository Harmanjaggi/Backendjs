const express = require('express');
const userModel = require('../models/usermodel');
const jwt = require('jsonwebtoken');
const secret = require('../secret');
const JWT_Key = secret.JWT_Key;;
const { findById } = require('../models/usermodel');

module.exports.signup = async function signup(req, res) {
    try{let dataObj = req.body;
    let user = await userModel.create(dataObj);
    if(user)
    res.json({
        message: "user is signed up",
        data: user
    });
    else
    res.json({
        message: "user not found",
    });
    }
    catch (e) {
        res.json({
            message: e.message
        });
    }
}

module.exports.logIn = async function login(req, res) {
    let data = req.body;
    if (data.email) {
        let user = await userModel.findOne({ email: data.email });
        try {
            if (user) {
                // bycript->compare
                if (user.password == data.password) {
                    let uid = user['_id'];
                    let token = jwt.sign({ payload: uid }, JWT_Key)
                    console.log(token);
                    res.cookie('login', token, { httpOnly: true });
                    return res.json({
                        message: 'User has logged in',
                        userDetails: data,
                    })
                }
                else {
                    return res.json({
                        message: 'user not found'
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
            message:'please enter email',
        })
    }
}

// isAuthorised - to check the role of user

module.exports.isAuthorised = function isAuthorised(role) {
    return function (req, res, next) {
        if (role.include(req.role) == true)
            next();
        else {
            res.status(401).json({ message: "operation is not allowed" });
        }
    }
}

module.exports.protectRouter = async function protectRouter(req, res, next) {
    try {
        let token;
        if (req.cookies.login) {
            token = req.cookies.login;
            let payload = jwt.verify(token, JWT_Key);
            if (payload) {
                const user = await userModel.findById(payload.payload);
                req.role = user.role;
                req.id = user.id;
                next();
            }
            else
                return res.json({
                    message: 'user not verified'
                });
        }
        else
            return res.json({
                message: 'please login first'
            });
    }
    catch (e) {
        res.json({message: e.message})
    }
}