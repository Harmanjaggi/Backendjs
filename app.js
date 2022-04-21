const express = require('express');
const app = express();

app.listen(3000);
// app.get('/', function (req, res) {
//     res.send('Hello World')
// });
app.get('/', (req, res) =>{
    res.sendFile('D:/Edrive/js/first_project/Views/index.html');
});

app.get('/about', (req, res) =>{
    // (<relative_address>, <{root:__dirname}>) 
    res.sendFile('./views/about.html', { root: __dirname });
});

app.get('/about-us', (req, res) =>{
    res.redirect('/about');
});
// 404 should be at last; as program run top to bottom
app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', { root: __dirname });
});

// get

//post-> to send data from frontend to beckend