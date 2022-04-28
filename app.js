const express = require('express');
const app = express();
const { update } = require('lodash');
const cookieParser = require('cookie-parser');
app.use(express.json());
app.use(cookieParser());
app.listen(3000);   

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