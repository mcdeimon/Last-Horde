const Sequelize = require("sequelize");
const amount_nft = require("../models").amount_nft;

module.exports = {
  create(req, res) {
    return amount_nft
      .create({
        amount: req.params.amount,
      })
      .then((my_favorites) =>
        res.status(200).send({ ...amount_nft.dataValues, status: 200 })
      )
      .catch((error) => res.status(400).send({ ...error, status: 400 }));
  },

  put(req, res) {
    return amount_nft
      .update({ amount: req.params.amount })
      .then((my_favorites) =>
        res.status(200).send({ changed: [...amount_nft], status: 200 })
      )
      .catch((error) => res.status(400).send({ ...error, status: 400 }));
  },

  get(_, res) {
    return amount_nft
      .findAll({})
      .then((my_favorites) =>
        res.status(200).send({ all: [...amount_nft], status: 200 })
      )
      .catch((error) => res.status(400).send({ ...error, status: 400 }));
  },
};
