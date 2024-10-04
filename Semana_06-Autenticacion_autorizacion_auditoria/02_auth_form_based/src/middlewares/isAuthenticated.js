const isAuthenticated = (req, res, next) => {
    if (!req.user) {
        res.redirect('/login');
        return;
    }
    next();
};

export default isAuthenticated;