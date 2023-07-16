const users = require('express').Router();
const {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

users.get('/', getAllUsers);
users.get('/:userId', getUser);
users.post('/', createUser);
users.patch('/me', updateUser);
users.patch('/me/avatar', updateAvatar);

module.exports = { users };
