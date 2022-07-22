const my_favorites = require("../models").my_favorites;
const logger = require("../utils/logger");

module.exports = {
  create(req, res) {
    const { account, id_nft, contract } = req.params;

    if (
      /^0x[a-fA-F0-9]{40}$/g.test(account) &&
      /^[0-9]+$/.test(id_nft) &&
      /^0x[a-fA-F0-9]{40}$/g.test(contract)
    )
      return my_favorites
        .create({
          account,
          id_nft,
          contract,
        }) // Create the my_favorites
        .then((my_favorites) =>
          res.status(200).send({ ...my_favorites.dataValues, status: 200 })
        )
        .catch((error) => {
          logger(error);
          res.status(400).send({ ...error, status: 400 });
        });
    else {
      logger(error);
      return res
        .status(400)
        .send({ error: "The data is not of the required type", status: 400 });
    }
  },

  delete(req, res) {
    const { account, id_nft } = req.params;

    if (/^0x[a-fA-F0-9]{40}$/g.test(account) && /^[0-9]+$/.test(id_nft))
      return my_favorites
        .destroy({
          where: {
            account,
            id_nft,
          },
        }) // Delete the my_favorites
        .then((my_favorites) =>
          res.status(200).send({ deleted: [...my_favorites], status: 200 })
        )
        .catch((error) => {
          logger(error);
          res.status(400).send({ ...error, status: 400 });
        });
    else {
      logger(error);
      return res
        .status(400)
        .send({ error: "The data is not of the required type", status: 400 });
    }
  },

  search(req, res) {
    const { account, id_nft } = req.params;

    if (/^0x[a-fA-F0-9]{40}$/g.test(account) && /^[0-9]+$/.test(id_nft))
      return my_favorites
        .findAll({
          where: {
            account,
            id_nft,
          },
        }) // Find the my_favorites
        .then((my_favorites) => {
          let isFavorite = my_favorites[0]?.hasOwnProperty("dataValues");
          res
            .status(200)
            .send({ isFavorite: isFavorite || false, status: 200 });
        })
        .catch((error) => {
          logger(error);
          res.status(400).send({ ...error, status: 400 });
        });
    else {
      logger(error);
      return res
        .status(400)
        .send({ error: "The data is not of the required type", status: 400 });
    }
  },

  list(_, res) {
    return my_favorites
      .findAll({}) // Find all the my_favorites
      .then((my_favorites) =>
        res.status(200).send({ all: [...my_favorites], status: 200 })
      )
      .catch((error) => {
        logger(error);
        res.status(400).send({ ...error, status: 400 });
      });
  },

  find(req, res) {
    const { account } = req.params;

    if (/^0x[a-fA-F0-9]{40}$/g.test(account))
      return my_favorites
        .findAll({
          where: {
            account,
          },
        }) // Find all the my_favorites of an account
        .then((my_favorites) =>
          res.status(200).send({ favorites: [...my_favorites], status: 200 })
        )
        .catch((error) => {
          logger(error);
          res.status(400).send({ ...error, status: 400 });
        });
    else {
      logger(error);
      return res
        .status(400)
        .send({ error: "The data is not of the required type", status: 400 });
    }
  },

  findByContract(req, res) {
    const { contract } = req.params;

    if (/^0x[a-fA-F0-9]{40}$/g.test(contract))
      return my_favorites
        .findAll({
          where: {
            contract,
          },
        }) // Find all the my_favorites of an account
        .then((my_favorites) =>
          res.status(200).send({ all: [...my_favorites], status: 200 })
        )
        .catch((error) => {
          logger(error);
          res.status(400).send({ ...error, status: 400 });
        });
    else {
      logger(error);
      return res
        .status(400)
        .send({ error: "The data is not of the required type", status: 400 });
    }
  },
};
