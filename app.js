const express = require('express');
const { update } = require('lodash');
const { default: mongoose } = require('mongoose');
const app = express();
const mongoos = require('mongoose')
var emailValidator = require("email-validator");
//middleware func-> in post request, front end data is converted to json
app.use(express.json());
app.listen(3000);

// let users = [
//     {
//         'id': 1,
//         'name': "Abhishek"
//     },
//     {
//         'id': 2,
//         'name': "Jasbir"
//     },
//     {
//         'id': 3,
//         'name': "Kartik"
//     }
// ];
// mini app
const userRouter = express.Router(); // global middleware
const authRouter = express.Router(); // global middleware

app.use('/user', userRouter);
app.use('/auth', authRouter);

userRouter
    .route('/') // local middleware
    .get(getUsers)
    .post(postUser)
    .patch(updateUser)
    .delete(deleteUser)

userRouter
    .route('/:id')
    .get(getUserById)

authRouter
    .route('/signup')
    .get(middleware1, getSignUp, middleware2)
    .post(postSignUp)

// app.get('/user', (req, res) => {
//     console.log(req.query);
//     res.send(users);
// });

// app.post('/user', (req, res) => {
//     console.log(req.body);
//     users = req.body;
//     // res.json or res.send
//     res.json({
//         message: "data received successfully",
//         user: req.body
//     })
// });


// // update ->patch
// app.patch('/user', (req, res) => {
//     console.log('req.body-> ', req.body);
//     let datatoBeUpdated = req.body;
//     for (key in datatoBeUpdated) {
//         users[key] = datatoBeUpdated[key];
//     }
//     res.json({
//         message: "data updated successfully"
//     })
// });

// // to delete a data
// app.delete('/user', (req, res) => {
//     users = {};
//     res.json({
//         message: "data has been deleted"
//     })
// })

// // params
// app.get('/user/:id', (req, res) => {
//     console.log(req.params.id);
//     console.log(req.params);
//     res.send("user id received")
// })


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

// function getUserById(req, res) {
//     console.log(req.params.id);
//     console.log(req.params);
//     res.send("user id received")
// }

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
    }
});

// //hooks
// pre - before saving
userSchema.pre('save', function () {
    console.log('before saving in db', this);
})

// post - after saving
userSchema.post('save', function (doc) {
    console.log('after saving in db', doc);
})

userSchema.pre('save', function () {
    this.confirmPassword = undefined;
})

// model
const userModel = mongoose.model('userModel', userSchema);

// (async function createUser() {
//     let user = {
//         name: 'Harman',
//         email: 'harmanjaggs@gmail.com',
//         password: '123456',
//         confirmPassword: '123456',
//     }
//     let data = await userModel.create(user);
//     console.log(data);
// })();