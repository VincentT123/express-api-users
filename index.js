const { response } = require('express');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session');
var flash = require('connect-flash');

var MongoClient = require('mongodb').MongoClient;
var app = express();

// Appel du module router users.js
var users = require('./routes/users');

app.use(cors());
app.use(bodyParser.json());
// Utilise Body-Parser, pour pouvoir lire les entrées d'un formulaire
// le stocke comme un obj Javascript
// accessible via req.body
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  cookie: { maxAge: 60000 },
  secret: 'woot',
  resave: false,
  saveUninitialized: false
}));

app.use(flash());

app.use('/assets/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

// Déclaration de vues Embedded Javascript (EJS)
app.set('engine_view', 'ejs');

app.use((err, req, res, next) => {
  res.locals.error = err;
  const status = err.status || 500;
  res.status(status);
  res.render('error');
});

// Appel des routes déclarées dans person,js à partir de la route /users
// http://localhost:8080/users
// http://localhost:8080/users/add
// http://localhost:8080/users/edit
// http://localhost:8080/users/delete
// http://localhost:8080/users/search
app.use('/users', users);

// ------------------------------------------------------------------------------------------

var server = {
  port: 8080
};

app.listen(server.port, () => console.log(`Server started, listening port: ${server.port}`));

