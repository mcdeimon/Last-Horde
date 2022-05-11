const Sequelize = require("sequelize");
const on_sell = require("../models").on_sell;
const my_favorites = require("../models");

module.exports = {
  create(req, res) {
    return on_sell
      .create({
        account: req.body.account,
        id_nft: req.body.id_nft,
        price: req.body.price,
        // expiration_days: req.body.expiration_days,
        order_id: req.body.order_id,
        sold: req.body.sold,
        // expired: req.body.expired,
        // created_days: req.body.created_days,
        canceled: req.body.canceled,
      }) // Create the on_sell
      .then((on_sell) => {
        /* setTimeout(() => {
          on_sell.update({
            expired: true,
          });
        }, 200000 * req.body.expiration_days); // 86400000 */

        res.status(200).send({ ...on_sell.dataValues, status: 200 });
      })
      .catch((error) => res.status(400).send({ ...error, status: 400 }));
  },

  update(req, res) {
    return on_sell
      .findOne({
        where: {
          account: req.params.account,
          order_id: req.params.order_id,
        },
      }) // Find the on_sell
      .then((on_sell) => {
        if (on_sell)
          on_sell
            .update(req.body) // Update the on_sell
            .then((on_sell) =>
              res.status(200).send({ ...on_sell.dataValues, status: 200 })
            )
            .catch((error) => res.status(400).send({ ...error, status: 400 }));
      })
      .catch((error) => res.status(400).send({ ...error, status: 400 }));
  },

  find(_, res) {
    return on_sell
      .findAll({}) // Find all the on_sell
      .then((on_sell) =>
        res.status(200).send({ all: [...on_sell], status: 200 })
      )
      .catch((error) => res.status(400).send({ ...error, status: 400 }));
  },
};
