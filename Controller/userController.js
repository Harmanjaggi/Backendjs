const userModel = require('../models/usermodel');   

modeule.exports.getUser = async function getUsers(req, res) {
    let allUsers = await userModel.find();
    res.json({
        message: 'list of all users',
        data: allUsers
    });
    // res.send(users);
}

modeule.exports.postUser = function postUser(req, res) {
    console.log(req.body);
    users = req.body;
    res.json({
        message: "data received successfully",
        user: req.body  
    })
}

modeule.exports.updateUser = async function updateUser(req, res) {
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

modeule.exports.deleteUser = async function deleteUser(req, res) {
    // users = {};
    let dataToBeDeleted = req.body;
    let user = await userModel.findOneAndDelete(dataToBeDeleted);
    res.json({
        message: "data has been deleted",
        data: user
    });
}

modeule.exports.getUserById = function getUserById(req, res) {
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