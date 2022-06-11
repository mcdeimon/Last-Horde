const Sequelize = require("sequelize");
const regularExpressions = require("../utils/regularExpressions");
const missing = require("../models").missing;

module.exports = {
  create(req, res) {
    const { account, missings } = req.params;

    if (/^0x[a-fA-F0-9]{40}$/g.test(account) && /^[0-9]+$/.test(missings))
      return missing
        .create({
          account,
          missing: missings,
        }) // Create the missing
        .then((missing) =>
          res.status(200).send({ ...missing.dataValues, status: 200 })
        )
        .catch((error) => res.status(400).send({ ...error, status: 400 }));
    else
      return res
        .status(400)
        .send({ error: "The data is not of the required type", status: 400 });
  },
};
