const User = require('../models/user');

const { BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = require('../utils/constants');

const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла неизвестная ошибка', err: err.message }));
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => new Error('Not Found'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Переданные данные некорректны' });
        return;
      } if (err.message === 'Not Found') {
        res.status(NOT_FOUND).send({ message: 'Пользователь не найден' });
        return;
      }
      res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла неизвестная ошибка', err: err.message });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (!name || !avatar || err.message) {
        res.status(BAD_REQUEST).send({ message: 'Переданные данные некорректны' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла неизвестная ошибка', err: err.message });
      }
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (!name || !about || err.message) {
        res.status(BAD_REQUEST).send({ message: 'Переданные данные некорректны' });
      } else if (!User[_id]) {
        res.status(NOT_FOUND).send({ message: 'Пользователь не найден' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла неизвестная ошибка', err: err.message });
      }
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (!User[_id]) {
        res.status(NOT_FOUND).send({ message: 'Пользователь не найден' });
      } else if (!avatar) {
        res.status(BAD_REQUEST).send({ message: 'Переданные данные некорректны' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла неизвестная ошибка', err: err.message });
      }
    });
};

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  updateAvatar,
};
