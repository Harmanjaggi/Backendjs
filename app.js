const express = require('express');
const app = express();
const { update } = require('lodash');
const cookieParser = require('cookie-parser');
app.use(express.json());
app.use(cookieParser());
app.listen(3000);   

const userRouter = require('./routers/userRouter');
const planRouter = require('./routers/planRouter');
app.use('/plans', planRouter);
app.use('/user', userRouter);