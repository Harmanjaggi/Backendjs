// let flag = false; // user is logged in or not
function protectRouter(req, res, next) {
    if (req.cookies.isLoggedIn)
    {
        next();
    }
    else
    {
        return res.json({
        message: 'please login first'
        });
    }
}

module.exports = protectRouter;