const Sequelize = require("sequelize");
const regularExpressions = require("../utils/regularExpressions");
const missing = require("../models").missing;

module.exports = {
  create(req, res) {
    const { account, missing } = req.params;

    if (
      regularExpressions.account.test(account) &&
      regularExpressions.number.test(missing)
    )
      return missing
        .create({
          account,
          missing,
        }) // Create the missing
        .then((missing) =>
          res.status(200).send({ ...missing.dataValues, status: 200 })
        )
        .catch((error) => res.status(400).send({ ...error, status: 400 }));
    else return res.status(400).send({ err, status: 400 });
  },
};
