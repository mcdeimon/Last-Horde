const { default: randomizer } = require("../utils/randomizer");

module.exports = {
  raritys(req, res) {
    try {
      let { raritys, length } = req.params;
      let randomCards = [],
        values = [];
      const map = {};

      randomCards = randomizer(raritys, length);

      for (let i = 0; i < randomCards.length; i++) {
        if (!map[randomCards[i]]) {
          map[randomCards[i]] = 1;
        } else {
          map[randomCards[i]] += 1;
        }
      }

      for (let key in map) {
        values.push(`${map[key]}`);
      }

      res.status(200).send({
        cards: map.keys(),
        quantitys: values,
        status: 200,
      });
    } catch (err) {
      return res.status(400).send({ ...error, status: 400 });
    }
  },
};
