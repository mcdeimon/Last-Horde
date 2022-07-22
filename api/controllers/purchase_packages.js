const purchase_packages = require("../models").purchase_packages;
const logger = require("../utils/logger");

module.exports = {
  create(req, res) {
    const { account, package } = req.params;

    if (/^0x[a-fA-F0-9]{40}$/g.test(account) && /^[0-9]+$/.test(package))
      return purchase_packages
        .create({
          account,
          package,
        }) // Create the purchase_packages
        .then((purchase_packages) =>
          res.status(200).send({ ...purchase_packages.dataValues, status: 200 })
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

  find(req, res) {
    const { account } = req.params;

    if (/^0x[a-fA-F0-9]{40}$/g.test(account))
      return purchase_packages
        .findOne({
          where: {
            account,
          },
        }) // Find the purchase_packages

        .then((purchase_packages) =>
          res
            .status(200)
            .send({ bought: purchase_packages ? true : false, status: 200 })
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
