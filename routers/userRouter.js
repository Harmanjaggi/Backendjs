const express = require('express');
var userRouter = express.Router(); 
const { getUser, getAllUser, updateUser, deleteUser, updateProfileImage } = require('../controller/userController');
const { signup, logIn: logIn, isAuthorised, protectRouter, logout, forgetPassword, resetPassword} = require('../controller/authController');
const { application } = require('express');
const multer  = require('multer')

// user options
userRouter.route('/:id')
    .patch(updateUser)
    .delete(deleteUser);

userRouter.route('/signup')
    .post(signup);

userRouter.route('/login')
    .post(logIn);

userRouter.route('/forgetPassword')
    .post(forgetPassword);

userRouter.route('/forgetPassword/:token')
    .post(resetPassword); 
    
userRouter.route('/logout')
    .get(logout);


// multer for file upload

//upload-> storage, filter

const multerStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        cb(null, "user-${Date.now()}.jpeg")
    }
})

const filter = function (req, file, cb) {
    if (file.mimetype.startsWith("image")) 
        cb(null, true)
    else 
        cb(new Error("Not an Image! Please upload an image"), false)
}

const upload = multer({
    storage: multerStorage,
    fileFilter: filter
});

userRouter.post("/profileImage", upload.single('photo') ,updateProfileImage);
// get request
userRouter.get('/profileImage', (req, res) => {
    res.sendFile("D:/Edrive/js/first_project/public/multer.html")
});

//profile page
userRouter.use(protectRouter); 
userRouter.route('/userProfile')
    .get(getUser);

//admin specific
userRouter.use(isAuthorised(['admin']));
userRouter.route('/')
    .get(getAllUser);

module.exports = userRouter;