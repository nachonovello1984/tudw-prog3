function isAuthenticated(req, res, next) {
    console.log("isAuthenticated");
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

module.exports = { isAuthenticated };