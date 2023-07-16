const Card = require('../models/card');

const { BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = require('../utils/constants');

const getAllCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.send(cards))
    .catch((err) => {
      res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла неизвестная ошибка', err: err.message });
    });
};

const createCard = (req, res) => {
  const { _id } = req.user;
  const { name, link } = req.body;
  Card.create({ name, link, owner: _id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (!name || !link || err.message) {
        res.status(BAD_REQUEST).send({ message: 'Переданные данные некорректны' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла неизвестная ошибка', err: err.message });
      }
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND).send({ message: 'Переданные данные некорректны' });
        return;
      }
      res.send({ message: 'Карточка удалена' });
    })
    .catch(() => {
      if (!Card[cardId]) {
        res.status(BAD_REQUEST).send({ message: 'Переданные данные некорректны' });
      }
    });
};

const putLike = (req, res) => {
  const { _id } = req.user;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: _id } }, { new: true })
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND).send({ message: 'Переданные данные некорректны' });
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла неизвестная ошибка', err: err.message });
    });
};

const deleteLike = (req, res) => {
  const { _id } = req.user;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: _id } }, { new: true })
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND).send({ message: 'Переданные данные некорректны' });
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла неизвестная ошибка', err: err.message });
    });
};

module.exports = {
  createCard,
  deleteCard,
  getAllCards,
  putLike,
  deleteLike,
};
