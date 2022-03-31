const Sequelize = require("sequelize");
const my_favorites = require("../models").my_favorites;

module.exports = {
  create(req, res) {
    return my_favorites
      .create({
        account: req.params.account,
        id_nft: req.params.id_nft,
      })
      .then((my_favorites) => res.status(200).send({...my_favorites.dataValues, status: 200}))
      .catch((error) => res.status(400).send({...error, status: 400}));
  },

  list(_, res) {
    return my_favorites
      .findAll({})
      .then((my_favorites) => res.status(200).send({all: [...my_favorites], status: 200}))
      .catch((error) => res.status(400).send({...error, status: 400}));
  },

  find(req, res) {
    return my_favorites
      .findAll({
        where: {
          account: req.params.account,
        },
      })
      .then((my_favorites) => res.status(200).send({favorites: [...my_favorites], status: 200}))
      .catch((error) => res.status(400).send({...error, status: 400}));
  },
};
