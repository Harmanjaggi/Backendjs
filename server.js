// server creation

// 1. Accepting modules

const http = require('http');
const fs = require('fs');
const _ = require('lodash');

// call whenever request is made
const server = http.createServer((req, res) => {
    // meta data
    console.log('request has been made from browser to server');
    // console.log(req.method);
    // console.log(req.url);

    let num= _.random(0, 20);
    console.log(num);

    let greet= _.once(() => {
        console.log('hello');
    });
    greet();
    greet();

    res.setHeader('Content-Type', 'text/html');
    // 
    let path_of_folder = './views';
    switch (req.url) {
        case '/':
            path_of_folder += '/index.html'
            break;
        case '/about':
            path_of_folder += '/about.html'
            break;
        case '/about-me':
            res.statusCode = 301; // successful redirection
            res.setHeader('Location', '/about'); // Location nahi pata kya hai
            res.end();
            break;
        default:
            path_of_folder += '/404.html'
            res.statusCode = 404;
            break;
    };
    // res.write('Hello 6789098');
    fs.readFile(path_of_folder, (err, fileData) => {
        if (err) console.log(err);
        else {
            // res.write(fileData);
            res.end(fileData);
        }
    });
    
});

// port number, host, callback func
//localhost is by default
server.listen(3000, 'localhost', () => {
    console.log('server is listening on port 3000');
});