const randomizer = require("../utils/randomizer");

module.exports = {
  async raritys(req, res) {
    try {
      const { raritys, length } = req.body,
        map = [],
        values = [],
        keys = [],
        randomCards = await randomizer(raritys, length);

      for (let i = 0; i < randomCards.length; i++) {
        if (!map[randomCards[i]]) map[randomCards[i]] = 1;
        else map[randomCards[i]] += 1;
      }

      for (let key in map) {
        values.push(`${map[key]}`);
        keys.push(key);
      }

      return res.status(200).send({
        cards: keys,
        quantitys: values,
        status: 200,
      });
    } catch (err) {
      return res.status(400).send({ err, status: 400 });
    }
  },
};
