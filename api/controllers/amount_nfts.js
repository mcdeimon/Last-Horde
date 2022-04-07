const Sequelize = require("sequelize");
const amount_nfts = require("../models").amount_nfts;

module.exports = {
  create(req, res) {
    return amount_nfts
      .create({
        amount: req.params.amount,
      })
      .then((amount_nfts) =>
        res.status(200).send({ ...amount_nfts.dataValues, status: 200 })
      )
      .catch((error) => res.status(400).send({ ...error, status: 400 }));
  },

  update(req, res) {
    return amount_nfts
      .update({ amount: req.params.amount }, { where: { id: 1 } })
      .then((amount_nfts) =>
        res.status(200).send({ changed: amount_nfts[0], status: 200 })
      )
      .catch((error) => res.status(400).send({ ...error, status: 400 }));
  },

  get(_, res) {
    return amount_nfts
      .findAll({ where: { id: 1 } })
      .then((amount_nfts) =>
        res.status(200).send({ ...amount_nfts[0].dataValues, status: 200 })
      )
      .catch((error) => res.status(400).send({ ...error, status: 400 }));
  },
};
