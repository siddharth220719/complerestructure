const express = require('express');

const routes = express.Router({ mergeParams: true });

const userController = require('./user.controller');

routes.post('/login', userController.loginUser);
routes.post('/', userController.insertUser);

module.exports = routes;
