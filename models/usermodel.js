const { default: mongoose } = require('mongoose');
const mongoos = require('mongoose')
const emailValidator = require("email-validator");
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
    }
});

// userSchema.pre('save', function () {
//     console.log('before saving in db', this);
// })

userSchema.post('save', function (doc) {
    console.log('after saving in db', doc);
})

userSchema.pre('save', function () {
    this.confirmPassword = undefined;
})

// userSchema.pre('save', async function () {
//     let salt = await bcrypt.genSalt();
//     let hashedString = await bcrypt.hash(this.password, salt);
//     this.password = hashedString;
// })
    
const userModel = mongoose.model('userModel', userSchema);

module.exports = userModel;
