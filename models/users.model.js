module.exports = function(){
    var db = require('../db/mongo-conn')();
    var Schema = require('mongoose').Schema;

    var users = Schema({
        nom: String,
        prenom: String,
        adresse: String
    });

    return db.model('users', users);

}