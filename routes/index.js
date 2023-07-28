const express = require('express');
const { handleError } = require('../utils/handleError');
const { users } = require('./users');
const { cards } = require('./cards');
const { createUser, login } = require('../controllers/users');
const {auth} = require('../middlewares/auth');

const routes = express.Router();

routes.post('/signup', express.json(), createUser);
routes.post('/signin', express.json(), login);

routes.use('/users', users);
routes.use('/cards', cards);
routes.all('*', auth);

module.exports = { routes };
