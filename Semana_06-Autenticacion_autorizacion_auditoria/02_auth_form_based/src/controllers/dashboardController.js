class DashboardController {

    index = (req, res) => {
        res.render("dashboard", { title: "Inicio", user : req.user });
    };

}

export default DashboardController;