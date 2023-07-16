const express = require('express');
const { users } = require('./users');
const { cards } = require('./cards');

const routes = express.Router();

routes.use('/users', users);
routes.use('/cards', cards);
routes.all('*', (req, res) => {
  res.status(404).send({ message: 'Неверный адрес запроса' });
});

module.exports = { routes };
