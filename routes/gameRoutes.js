const mongoose = require('mongoose');
const Game = mongoose.model('games');

module.exports = (app) => {

  app.get(`/api/game`, async (req, res) => {
    let games = await Game.find();
    return res.status(200).send(games);
  });

  app.get(`/api/game/:id`, async (req, res) => {
    let game = await Game.findById(req.params.id);
    return res.status(200).send(game);
  });

  app.post(`/api/game`, async (req, res) => {
    let game = await Game.create(req.body);
    return res.status(201).send({
      error: false,
      game
    })
  })

  app.put(`/api/game/:id`, async (req, res) => {
    const { id } = req.params;

    let game = await Game.findByIdAndUpdate(id, req.body);

    return res.status(202).send({
      error: false,
      game
    })

  });

  app.delete(`/api/game/:id`, async (req, res) => {
    const { id } = req.params;

    let game = await Game.findByIdAndDelete(id);

    return res.status(202).send({
      error: false,
      game
    })

  })

}