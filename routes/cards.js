const express = require('express');

const {
  createCard,
  deleteCard,
  getAllCards,
  putLike,
  deleteLike,
} = require('../controllers/cards');

const cards = express.Router();

cards.get('/', getAllCards);
cards.post('/', express.json(), createCard);
cards.delete('/:cardId', deleteCard);
cards.put('/:cardId/likes', putLike);
cards.delete('/:cardId/likes', deleteLike);

module.exports = { cards };
