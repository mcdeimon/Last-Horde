const randomizer = require("../utils/randomizer");

module.exports = {
  async raritys(req, res) {
    try {
      const raritys = req.body.raritys,
        lengthCards = req.body.lengthCards,
        account = req.body.account,
        code = req.body.code,
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
  },
};
