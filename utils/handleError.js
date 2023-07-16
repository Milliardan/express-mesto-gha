const { Error } = require('mongoose');

const HTTP_CREATED = 201;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

function handleError(err, req, res) {
  if (err instanceof Error.CastError) {
    res.status(BAD_REQUEST).send({
      message: 'Неверный формат переданных данных',
    });
    return;
  }

  if (err instanceof Error.ValidationError) {
    res.status(BAD_REQUEST).send({
      message: err.message,
    });
    return;
  }

  if (err instanceof Error.DocumentNotFoundError) {
    res.status(NOT_FOUND).send({
      message: err.message,
    });
    return;
  }

  res.status(INTERNAL_SERVER_ERROR).send({
    message: 'Не получилось обработать запрос',
  });
}

module.exports = {
  HTTP_CREATED,
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  handleError,
};
