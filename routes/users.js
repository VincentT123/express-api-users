const express = require('express');
const router = express.Router();

var usersController = require('../controllers/users.controller');

router.get('/search', usersController.show);

router.post('/add', usersController.save);

router.put('/update', usersController.edit);

router.delete('/delete', usersController.delete);

router.get('/searchbyid', usersController.showbyid);

module.exports = router;