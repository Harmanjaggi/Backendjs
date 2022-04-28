// mongoose ke through connect mongodb

const { default: mongoose } = require('mongoose');
const mongoos = require('mongoose')


const db_link = 'mongodb+srv://admin:fjVylMbdhjwAeiks@cluster0.tou3g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoos.connect(db_link)
    .then(function (db) {
        // console.log(db);
        console.log('db connect');
    })
    .catch(function (err) {
        console.log(err);
    });

const planSchema = mongoos.Schema({
    name: {
        type: String,
        required: [true, 'enter value'],
        unique: true,
        maxlength: [20, 'plan name should not exceed more than 20 characters']
    },
    duration: {
        type: Number,
        required: [true, 'enter value']
    },
    price: {
        type: Number,
        required: [true, 'enter value']
    },
    ratingsAverage: {
        type: Number,
    },
    discount: {
        type: Number,
        validate: function () {
            return this.discount<100
        }
    },
});

// model
const planModel = mongoose.model('planModel', planSchema);

// (async function createPlan() {
//     let plabObj = {
//         name: 'SuperFoood6',
//         duration: 30,
//         price: 1000,
//         ratingsAverage: 5,
//         discount: 20
//     }
//     let data = await planModel.create(plabObj);
//     console.log(data);

//     // const doc = new planModel(planObj);
//     // await doc.save();
// })();

module.exports = planModel;