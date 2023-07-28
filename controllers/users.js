const bcrypt = require('bcryptjs');
const { User } = require('../models/user');
const { handleError } = require('../utils/handleError');

const SALT_LENGTH = 10;

async function createUser(req, res) {
  try {
    const { email, password, name, about, avatar } = req.body;
    const passwordHash = await bcrypt.hash(password, SALT_LENGTH);
    const user = await User.create({
      email,
      password: passwordHash,
      name,
      about,
      avatar,
    });
    res.send(user);
  } catch (err) {
    handleError(err, req, res);
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    handleError(err, req, res);
  }
}

async function getUser(req, res) {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      const error = new Error('Пользователь не найден');
      error.name = 'NotFoundError';
      throw error;
    }

    res.send(user);
  } catch (err) {
    handleError(err, req, res);
  }
}

async function updateUserField(userId, updateData) {
  // eslint-disable-next-line no-useless-catch
  try {
    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });
    return user;
  } catch (err) {
    throw err;
  }
}

async function updateAvatar(req, res) {
  try {
    const userId = req.user._id;
    const { avatar } = req.body;
    const user = await updateUserField(userId, { avatar });
    res.send(user);
  } catch (err) {
    handleError(err, req, res);
  }
}

async function updateUser(req, res) {
  try {
    const userId = req.user._id;
    const { name, about } = req.body;
    const user = await updateUserField(userId, { name, about });
    res.send(user);
  } catch (err) {
    handleError(err, req, res);
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  updateAvatar,
};
