const express = require('express');
var cors = require('cors')
const app = express();
const { update } = require('lodash');
const cookieParser = require('cookie-parser');
app.use(cors());
app.use(express.json());
app.use(cookieParser());
const port = process.env.port || 5000;
app.listen(port, function () {
    console.log('server listening on port' + port);
});   

// mini app
const userRouter = require('./routers/userRouter');
const planRouter = require('./routers/planRouter');
const reviewRouter = require('./routers/reviewRouter');
const bookingRouter = require('./routers/bookingRouter');

// base route
app.use('/plans', planRouter);
app.use('/user', userRouter);
app.use('/review', reviewRouter);
app.use('/booking', bookingRouter);