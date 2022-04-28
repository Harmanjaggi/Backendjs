const { default: mongoose } = require('mongoose');
const mongoos = require('mongoose')
const emailValidator = require("email-validator");
var crypto = require("crypto-js");
const bcrypt = require('bcrypt');

const db_link = 'mongodb+srv://admin:fjVylMbdhjwAeiks@cluster0.tou3g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoos.connect(db_link)
    .then(function (db) {
        // console.log(db);
        console.log('db connect');
    })
    .catch(function (err) {
        console.log(err);
    });

const userSchema = mongoos.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: function () {return emailValidator.validate(this.email)}
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    confirmPassword: {
        type: String,
        required: true,
        minLength: 6,
        validate: function () {
            return this.confirmPassword == this.password;
        } 
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'restaurantOwner', 'deliveryBoy'],
        default:'user'
    },
    profileImage: {
        type: String,
        default: 'img/users/wolf.jpeg'
    },
    resetToken : String
});

// userSchema.pre('save', function () {
//     console.log('before saving in db', this);
// })

userSchema.post('save', function (doc) {
    console.log('after saving in db', doc);
})

// userSchema.pre('save', function () {
//     this.confirmPassword = undefined;
// })

const userModel = mongoose.model('userModel', userSchema);

// userSchema.pre('save', async function () {
//     let salt = await bcrypt.genSalt();
//     let hashedString = await bcrypt.hash(this.password, salt);
//     this.password = hashedString;
// })

userSchema.methods.createResetToken = function () {
    // creating unique token using npm i crypto-js
    const hex = '0123456789ABCDEF';
    let resetToken = '';
    for (let i = 0; i < 32; ++i)
        resetToken += hex.charAt(Math.floor(Math.random() * hex.length));
    this.resetToken = resetToken;
    return resetToken;
}

userSchema.methods.resetPasswordHandler = function (password, confirmPassword) {
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.resetToken = undefined;
}

module.exports = userModel;
