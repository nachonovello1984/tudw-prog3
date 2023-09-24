const index = (req, res) => {
    res.render("dashboard", { title: "Inicio", user : req.user });
};

module.exports = { index };