const model = require('../models/users.model')();

var usersController = function () { }

usersController.show = function (req, res, next) {

    model.find({}, (err, result) => {
        if (err) console.log(err);
        res.json({
            status: 200,
            result,
            message: "Users list retrieved successfully"
        })
    });
}

usersController.save = function (req, res) {

    var data = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        adresse: req.body.adresse
    };
    model.create(data, (err, result) => {
        if (err) console.log(err);
        res.json({
            status: 200,
            message: "User added successfully"
        })
    });
}

usersController.delete = function (req, res) {

    let id = req.body._id;
    model.deleteOne({ _id: id }, (err, result) => {
        if (err) console.log(err);
        res.json({
            status: 200,
            message: "User deleted successfully"
        })
    });

}

usersController.edit = function (req, res) {

    var body = req.body;
    model.updateOne({ _id: body._id }, {
        $set: {
            nom: body.nom,
            prenom: body.prenom,
            adresse: body.adresse
        }
    }, { multi: true }, (err, result) => {
        if (err) { console.log(err); }
        res.json({
            status: 200,
            message: "User updated successfully"
        })
    });
}

usersController.showbyid = function (req, res, next) {

    let id = req.body._id;
    model.findById({ _id: id }, (err, result) => {
        if (err) console.log(err);
        res.json({
            status: 200,
            result,
            message: "User retrieved successfully"
        })
    });
}


module.exports = usersController;