const userModel = require('../models/usermodel');
const jwt = require('jsonwebtoken');
const { sendMail } = require("../utility/nodemailer")
const secret = require('../secret');
const JWT_Key = secret.JWT_Key;;

module.exports.signup = async function signup(req, res) {
    try{let dataObj = req.body;
        let user = await userModel.create(dataObj);
        sendMail("signup", user);
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
        for (let r = 0; r < role.length; r++) 
            if (role[r] == req.role)
                return next();
        
        // if (role.include(req.role) == true)
        //     next();
        res.status(401).json({ message: "operation is not allowed" });
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
        {
            //browser
            const client = req.get('User-Agent');
            if (client.includes("Mozilla") == true) {
                return res.redirect('/login');
            }
            // postman
            return res.json({
                message: 'please login first'
            });
        }
    }
    catch (e) {
        res.json({message: e.message})
    }
}

module.exports.forgetPassword = async function forgetPassword(req, res) {
    let { email } = req.body; // taking email from req.body
    console.log({ email });
    try {
        const user = await userModel.findOne({ email: email });
        if(user) {
            const resetToken = user.createResetToken;
            // http://abc.com/resetpassword/resettoken
            let resetPasswordLink = "${req.protocol}://${req.get('host')}/resetpassword/${resetToken}";
            // send email to the user
            //nodemailer
            console.log(resetToken);
            res.json({message: resetToken})
        }
        else {
            return res.json({message:"please signup"});
        }
    } catch (e) {
        res.status(500).json({ message:e.message });
    }
}

module.exports.resetPassword = async function resetPassword(req, res) {
    try {
        const token = req.params.token;
        let { password, confirmPassword } = req.body;
        const user = await userModel.findOne({ resetToken: token });
        if (user) {
            user.resetPasswordHandler(password, confirmPassword);
            await user.save();
            res.json({
                message: "password change successfully, please try again"
            })
        }
        else {

        }
    }
    catch (e) {
        res.json({ message:e.message });
    }
}

module.exports.logout = function logout(req, res) {
    res.cookie('login', '', { maxAge: 1 });
    res.json({
        message: "user logged out successfully"
    });
}