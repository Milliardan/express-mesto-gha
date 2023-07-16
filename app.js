const express = require('express');
const mongoose = require('mongoose');
const { routes } = require('./routes');

const { PORT = 3000 } = process.env;
const DATABASE_URL = 'mongodb://127.0.0.1:27017/mestodb';

const app = express();

app.use(express.json());

// временное решение авторизации пользователя
app.use((req, res, next) => {
  req.user = {
    _id: '64b3e17052f9c861c39b0fba',
  };

  next();
});

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log(`Connected to database on ${DATABASE_URL}`);
  })
  .catch((err) => {
    console.error('Error on database connection');
    console.error(err);
  });

app.use(routes);

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
