const Sequelize = require("sequelize");
const purchase_packages = require("../models").purchase_packages;

module.exports = {
  create(req, res) {
    return purchase_packages
      .create({
        account: req.params.account,
        package: req.params.package,
      }) // Create the purchase_packages
      .then((purchase_packages) =>
        res.status(200).send({ ...purchase_packages.dataValues, status: 200 })
      )
      .catch((error) => res.status(400).send({ ...error, status: 400 }));
  },

  find(req, res) {
    return purchase_packages
      .findOne({
        where: {
          account: req.params.account,
        },
      }) // Find the purchase_packages

      .then((purchase_packages) =>
        res
          .status(200)
          .send({ bought: purchase_packages ? true : false, status: 200 })
      )
      .catch((error) => res.status(400).send({ ...error, status: 400 }));
  },
};
