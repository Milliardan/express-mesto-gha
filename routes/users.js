const express = require('express');
const { getCurrentUser } = require('../controllers/users');

const {
  getAllUsers,
  getUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

const users = express.Router();

users.get('/', getAllUsers);
users.get('/:userId', getUser);
users.get('/me', getCurrentUser);
users.patch('/me', express.json(), updateUser);
users.patch('/me/avatar', express.json(), updateAvatar);

module.exports = { users };
