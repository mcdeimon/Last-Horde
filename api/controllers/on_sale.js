const Sequelize = require("sequelize");
const on_sale = require("../models").on_sale;

module.exports = {
  create(req, res) {
    return on_sale
      .create({
        account: req.body.account,
        id_nft: req.body.id_nft,
        price: req.body.price,
        expiration_days: req.body.expiration_days,
        order_id: req.body.order_id,
        sold: req.body.sold,
        expired: req.body.expired,
      })
      .then((on_sale) =>
        res.status(200).send({ ...on_sale.dataValues, status: 200 })
      )
      .catch((error) => res.status(400).send({ ...error, status: 400 }));
  },

  update(req, res) {
    return on_sale
      .findOne({
        where: {
          account: req.params.account,
          id_nft: req.params.id_nft,
        },
      })
      .then((on_sale) => {
        if (on_sale)
          on_sale
            .update(req.body)
            .then((on_sale) =>
              res.status(200).send({ ...on_sale.dataValues, status: 200 })
            )
            .catch((error) => res.status(400).send({ ...error, status: 400 }));
      })
      .catch((error) => res.status(400).send({ ...error, status: 400 }));
  },
};
