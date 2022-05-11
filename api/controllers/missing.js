const Sequelize = require("sequelize");
const missing = require("../models").missing;

module.exports = {
  create(req, res) {
    return missing
      .create({
        account: req.params.account,
        missing: req.params.missing,
      }) // Create the missing
      .then((missing) =>
        res.status(200).send({ ...missing.dataValues, status: 200 })
      )
      .catch((error) => res.status(400).send({ ...error, status: 400 }));
  },
};
