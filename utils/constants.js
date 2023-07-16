const HTTP_CREATED = 201;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

function handleError(err, req, res) {
  console.error(err);
  if (err.constructor.name === 'CastError') {
    res.status(BAD_REQUEST).send({
      message: err.message,
    });
    return;
  }

  if (err.constructor.name === 'ValidationError') {
    res.status(BAD_REQUEST).send({
      message: err.message,
    });
    return;
  }

  if (err.constructor.name === 'NotFoundError') {
    res.status(NOT_FOUND).send({
      message: err.message,
    });
    return;
  }

  res.status(INTERNAL_SERVER_ERROR).send({
    message: err.message,
  });
}

module.exports = { HTTP_CREATED, handleError };
