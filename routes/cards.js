const express = require('express');

const cards = express.Router();
const {
  createCard,
  deleteCard,
  getAllCards,
  putLike,
  deleteLike,
} = require('../controllers/cards');

cards.get('/', getAllCards);
cards.post('/', express.json(), createCard);
cards.delete('/:cardId', deleteCard);
cards.put('/:cardId/likes', putLike);
cards.delete('/:cardId/likes', deleteLike);

module.exports = { cards };
