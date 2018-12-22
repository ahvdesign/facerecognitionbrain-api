const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'ed08589ee0ca4568a2ddefd7cc0e607a'
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('Error making API call'));
};

const handleImage = knex => (req, res) => {
  const { id } = req.body;
  knex('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json('Unable to update entry count'));
};

module.exports = {
  handleImage: handleImage,
  handleApiCall: handleApiCall
};
