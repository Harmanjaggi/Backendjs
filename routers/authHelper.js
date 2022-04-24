const jwt = require('jsonwebtoken');
const JWT_Key = require('secret.js');

// user is logged in or not
function protectRouter(req, res, next) {
    let loginCookie = req.cookies.login;
    if (loginCookie)
    {
        let isverfied = jwt.verify(loginCookie, JWT_Key);
        if(isverfied)
            next();
        else
            return res.json({
                message: 'user not verified'
            });
    }
    else
        return res.json({
        message: 'please login first'
        });
}

module.exports = protectRouter;