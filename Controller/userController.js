const userModel = require('../models/usermodel');   

modeule.exports.getUser = async function getUser(req, res) {
    let id = req.params.id;
    let user = await userModel.findById();
    if (user) {
        return res.json(users);
    }
    else {
        return res.json({
            message: 'user not found'
        });
    }
}

// modeule.exports.postUser = function postUser(req, res) {
//     console.log(req.body);
//     users = req.body;
//     res.json({
//         message: "data received successfully",
//         user: req.body  
//     })
// }

modeule.exports.updateUser = async function updateUser(req, res) {
    // console.log('req.body-> ', req.body);

    try {
        let id = req.params.id;
        let datatoBeUpdated = req.body;
        let user = await userModel.findById(id);

        if (user) {
            const keys = [];
            for (let key in datatoBeUpdated)
                keys.push(key);

            for (let i = 0; i < keys.length; i++)
                user[keys[i]] = datatoBeUpdated[keys[i]];
            const updatedData = await user.save();
            res.json({
                message: "data updated successfully",
                data: user
            })
        }
        else {
            res.json({
                message: "data not found",
            })
        }
    } catch (err) {
        res.json({
            message: err.message
        })
    }
}

modeule.exports.deleteUser = async function deleteUser(req, res) {
    try {
        let id = req.params.id;
        let user = await userModel.
            findByIdAndDelete(id);
        if(user)
        res.json({
            message: "data has been deleted",
            data: user
        });
        else
        res.json({
            message: "data not found"
        }); 
    } catch (err) {
        res.json({
            message: err.message
        });
    }
}

modeule.exports.getAllUser = function getAllUser(req, res) {
    let users = await userModel.find();
    if (users) 
        res.json({
            message: 'users retrieved',
            data: users
        });
    else 
    res.json({
        message: 'users not found',
    });
}

// function setCookies(req, res) {
//     // res.setHeader('Set-Cookie', 'isLoggedIn=true');
//     res.cookie('login', '345678', { maxAge: 1000 * 60 * 60 * 24, secure: true, httpOnly:true});
//     res.cookie('isPrimeMember', true);
//     res.send('cookies has been set');
// }

modeule.exports.getCookies = function getCookies(req, res) {
    let cookies = req.cookies;
    console.log(cookies);
    res.send('cookies received');
}