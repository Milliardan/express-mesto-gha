const { Card } = require('../models/card');
const { handleError } = require('../utils/handleError');

async function createCard(req, res) {
  try {
    const { name, link } = req.body;
    const ownerId = req.user._id;
    const card = await Card.create({ name, link, owner: ownerId });
    res.send(card);
  } catch (err) {
    handleError(err, req, res);
  }
}

module.exports = { createCard };

const { Card } = require('../models/card');
const { handleError } = require('../utils/handleError');

async function deleteCard(req, res) {
  try {
    const { cardId } = req.params;

    const card = await Card.findByIdAndRemove(cardId);

    if (!card) {
      const error = new Error('Карточка не найдена');
      error.name = 'NotFoundError';
      throw error;
    }

    res.send(card);
  } catch (err) {
    handleError(err, req, res);
  }
}

module.exports = { deleteCard };

const { Card } = require('../models/card');
const { handleError } = require('../utils/handleError');

async function getAllCards(req, res) {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (err) {
    handleError(err, req, res);
  }
}

module.exports = { getAllCards };

const { Card } = require('../models/card');

async function getCard(req, res) {
  const { cardId } = req.params;
  const card = await Card.findById(cardId);
  res.send(card);
}

module.exports = { getCard };
