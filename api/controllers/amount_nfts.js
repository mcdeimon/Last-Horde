const Sequelize = require("sequelize");
const regularExpressions = require("../utils/regularExpressions");
const amount_nfts = require("../models").amount_nfts;

module.exports = {
  create(req, res) {
    const { amount } = req.params;

    if (/^[0-9]+$/.test(amount))
      return amount_nfts
        .create({
          amount,
        }) // Create the amount_nfts
        .then((amount_nfts) =>
          res.status(200).send({ ...amount_nfts.dataValues, status: 200 })
        )
        .catch((error) => res.status(400).send({ ...error, status: 400 }));
    else
      return res
        .status(400)
        .send({ error: "The data is not of the required type", status: 400 });
  },

  update(req, res) {
    const { amount } = req.params;

    if (/^[0-9]+$/.test(amount))
      return amount_nfts
        .update({ amount: req.params.amount }, { where: { id: 1 } }) // Update the amount_nfts
        .then((amount_nfts) =>
          res.status(200).send({ changed: amount_nfts[0], status: 200 })
        )
        .catch((error) => res.status(400).send({ ...error, status: 400 }));
    else
      return res
        .status(400)
        .send({ error: "The data is not of the required type", status: 400 });
  },

  get(_, res) {
    return amount_nfts
      .findAll({ where: { id: 1 } }) // Find the amount_nfts
      .then((amount_nfts) =>
        res.status(200).send({ ...amount_nfts[0].dataValues, status: 200 })
      )
      .catch((error) => res.status(400).send({ ...error, status: 400 }));
  },
};
