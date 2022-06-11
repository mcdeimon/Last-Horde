const randomizer = require("../utils/randomizer");
const regularExpressions = require("../utils/regularExpressions");

module.exports = {
  async raritys(req, res) {
    const { raritys, lengthCards, account, code } = req.body;

    if (
      /^0x[a-fA-F0-9]{40}$/g.test(account) &&
      /^[0-9]+$/.test(lengthCards) &&
      /^[0-9]+$/.test(code) &&
      /^[0-5]+([0-5,])+[0-5]+$/.test(raritys)
    )
      try {
        randomCards = await randomizer(raritys, lengthCards, account, code);

        return res.status(200).send({
          keys: randomCards.keys,
          values: randomCards.values,
          quantity: randomCards.quantity,
          status: 200,
        });
      } catch (err) {
        return res.status(400).send({ err, status: 400 });
      }
    else
      return res
        .status(400)
        .send({ error: "The data is not of the required type", status: 400 });
  },
};
