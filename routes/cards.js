const cards = require('express').Router();
const {
  createCard,
  deleteCard,
  getAllCards,
  putLike,
  deleteLike,
} = require('../controllers/cards');

cards.get('/', getAllCards);
cards.post('/', createCard);
cards.delete('/:cardId', deleteCard);
cards.put('/:cardId/likes', putLike);
cards.delete('/:cardId/likes', deleteLike);

module.exports = { cards };
