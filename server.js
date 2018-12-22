const express = require('express');
const bodyParser = require('body-parser');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'ahvdesign',
    password: '',
    database: 'smart-brain'
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send(database.users);
});

app.post('/signin', signin.handleSignin(knex, bcrypt));

app.post('/register', register.handleRegister(knex, bcrypt));

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  knex
    .select('*')
    .from('users')
    .where({
      id: id
    })
    .then(user => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json('User not found');
      }
    });
});

app.put('/image', image.handleImage(knex));
app.post('/imageurl', image.handleApiCall);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.end.PORT}`);
});
