const randomizer = require("../utils/randomizer");
const regularExpressions = require("../utils/regularExpressions");

module.exports = {
  async raritys(req, res) {
    const { raritys, lengthCards, account, code } = req.body;

    if (
      regularExpressions.account.test(account) &&
      regularExpressions.number.test(lengthCards) &&
      regularExpressions.number.test(code) &&
      regularExpressions.array.test(raritys)
    )
      try {
        randomCards = await randomizer(raritys, lengthCards, account, code);

        return res.status(200).send({
          keys: randomCards.keys,
          values: randomCards.values,
          test: randomCards.test,
          status: 200,
        });
      } catch (err) {
        return res.status(400).send({ err, status: 400 });
      }
    else return res.status(400).send({ err, status: 400 });
  },
};
