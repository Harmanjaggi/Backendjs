const express = require('express');
const app = express();
//middleware func-> in post request, front end data is converted to json
app.use(express.json());
app.listen(3000);

let users = [
    {
        'id': 1,
        'name': "Abhishek"
    },
    {
        'id': 2,
        'name': "Jasbir"
    },
    {
        'id': 3,
        'name': "Kartik"
    }
];

app.get('/user', (req, res) => { 
    console.log(req.query);
    res.send(users);
});

app.post('/user', (req, res) => {
    console.log(req.body);
    users = req.body;
    // res.json or res.send
    res.json({
        message: "data received successfully",
        user: req.body
    }) 
});


// update ->patch
app.patch('/user', (req, res) => {
    console.log('req.body-> ', req.body);
    let datatoBeUpdated = req.body;
    for (key in datatoBeUpdated) {
        users[key] = datatoBeUpdated[key];
    }
    res.json({
        message: "data updated successfully"
    })
});

// to delete a data
app.delete('/user', (req, res) => {
    users = {};
    res.json({
        message: "data has been deleted"
    })
})

// params
app.get('/user/:id', (req, res) => {
    console.log(req.params.id);
    console.log(req.params);
    res.send("user id received")
})