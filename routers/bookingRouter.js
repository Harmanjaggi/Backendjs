const express = require('express');
const bookingRouter = express.Router();
const { protectRouter } = require("../controller/authController");
const { createSession } = require("../controller/bookingController");
bookingRouter.post('/createSession', protectRouter, createSession)
bookingRouter.route('/createSession')
    .get(
        function (req, res) {
            console.log("e6789");
            res.sendFile("D:/Edrive/js/first_project/public/booking.html")
        }
    );

module.exports = bookingRouter;