const Sequelize = require("sequelize");
const my_favorites = require("../models").my_favorites;

module.exports = {
  create(req, res) {
    return my_favorites
      .create({
        account: req.params.account,
        id_nft: req.params.id_nft,
        contract: req.params.contract,
      }) // Create the my_favorites
      .then((my_favorites) =>
        res.status(200).send({ ...my_favorites.dataValues, status: 200 })
      )
      .catch((error) => res.status(400).send({ ...error, status: 400 }));
  },

  delete(req, res) {
    return my_favorites
      .destroy({
        where: {
          account: req.params.account,
          id_nft: req.params.id_nft,
        },
      }) // Delete the my_favorites
      .then((my_favorites) =>
        res.status(200).send({ deleted: [...my_favorites], status: 200 })
      )
      .catch((error) => res.status(200).send({ ...error, status: 200 }));
  },

  search(req, res) {
    return my_favorites
      .findAll({
        where: {
          account: req.params.account,
          id_nft: req.params.id_nft,
        },
      }) // Find the my_favorites
      .then((my_favorites) =>{
        let isFavorite = my_favorites[0]?.hasOwnProperty("dataValues")
        res.status(200).send({ isFavorite: isFavorite || false, status: 200 })}
      )
      .catch((error) => res.status(400).send({ ...error, status: 400 }));
  },

  list(_, res) {
    return my_favorites
      .findAll({}) // Find all the my_favorites
      .then((my_favorites) =>
        res.status(200).send({ all: [...my_favorites], status: 200 })
      )
      .catch((error) => res.status(400).send({ ...error, status: 400 }));
  },

  find(req, res) {
    return my_favorites
      .findAll({
        where: {
          account: req.params.account,
        },
      }) // Find all the my_favorites of an account
      .then((my_favorites) =>
        res.status(200).send({ favorites: [...my_favorites], status: 200 })
      )
      .catch((error) => res.status(400).send({ ...error, status: 400 }));
  },

  findByContract(req, res) {
    return my_favorites
      .findAll({
        where: {
          contract: req.params.contract,
        },
      }) // Find all the my_favorites of an account
      .then((my_favorites) =>
        res.status(200).send({ all: [...my_favorites], status: 200 })
      )
      .catch((error) => res.status(400).send({ ...error, status: 400 }));
  },
};
