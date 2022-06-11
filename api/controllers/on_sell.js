const Sequelize = require("sequelize");
const on_sell = require("../models").on_sell;
const regularExpressions = require("../utils/regularExpressions");

module.exports = {
  create(req, res) {
    const {
      account,
      id_nft,
      price,
      order_id,
      sold,
      canceled /*, expiration_days, expired, created_days,  */,
    } = req.body;

    if (
      /^0x[a-fA-F0-9]{40}$/g.test(account) &&
      /^[0-9]+$/.test(id_nft) &&
      /^[0-9]+$/.test(price) &&
      /^[0-9]+$/.test(order_id) &&
      /^(true|false)$/.test(sold) &&
      /^(true|false)$/.test(canceled)
    )
      return on_sell
        .create({
          account,
          id_nft,
          price,
          // expiration_days,
          order_id,
          sold,
          // expired,
          // created_days,
          canceled,
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
    else
      return res
        .status(400)
        .send({ error: "The data is not of the required type", status: 400 });
  },

  update(req, res) {
    const { account, order_id } = req.params;

    if (/^0x[a-fA-F0-9]{40}$/g.test(account) && /^[0-9]+$/.test(order_id))
      return on_sell
        .findOne({
          where: {
            account,
            order_id,
          },
        }) // Find the on_sell
        .then((on_sell) => {
          if (on_sell)
            on_sell
              .update(req.body) // Update the on_sell
              .then((on_sell) =>
                res.status(200).send({ ...on_sell.dataValues, status: 200 })
              )
              .catch((error) =>
                res.status(400).send({ ...error, status: 400 })
              );
        })
        .catch((error) => res.status(400).send({ ...error, status: 400 }));
    else
      return res
        .status(400)
        .send({ error: "The data is not of the required type", status: 400 });
  },

  find(_, res) {
    return on_sell
      .findAll({}) // Find all the on_sell
      .then((on_sell) => {
        let auxArr = [...on_sell]
          .filter((nft) => !nft.sold && !nft.canceled)
          .reverse();

        res.status(200).send({ all: [...auxArr], status: 200 });
      })
      .catch((error) => res.status(400).send({ ...error, status: 400 }));
  },
};
