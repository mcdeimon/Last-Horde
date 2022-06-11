const { ContractNfts } = require("./ContractNfts");
const { addressMarket, ContractMarket } = require("./ContractQuickMarketU");

const { MY_ACCOUNT } = process.env;

const PROBABILITY = {
  0: 0,
  1: 700, // 700 de 1 a 1020
  2: 950, // 250 de 1 a 1020
  3: 1000, // 50 de 1 a 1020
  4: 1015, // 15 de 1 a 1020
  5: 1020, // 5 de 1 a 1020
};

const probability = (rarity) => {
  var probability = Math.floor(Math.random() * 1020 + 1);

  return (
    probability >= PROBABILITY[rarity - 1] && probability <= PROBABILITY[rarity]
  );
};

const randomizer = async (raritys, length, account, code) => {
  let map = {},
    values = [],
    keys = [],
    quantity = 0;

  const mapper = async (cardId) => {
    if (
      (map[cardId] ? map[cardId] : 0) + 1 <=
      parseInt(
        await ContractNfts.methods.balanceOf(addressMarket, `${cardId}`).call()
      )
    ) {
      if (!map[cardId]) map[cardId] = 1;
      else map[cardId] += 1;
      quantity++;
    }
  };

  try {
    while (quantity < length) {
      let randomCard = Math.floor(Math.random() * raritys.length);

      for (let rarity = parseInt(raritys[randomCard]); rarity > 0; rarity--) {
        if (
          rarity === 1 &&
          (await ContractNfts.methods
            .balanceOf(addressMarket, `${randomCard}`)
            .call())
        ) {
          await mapper(randomCard);
          break;
        } else if (
          rarity === 1 &&
          !(await ContractNfts.methods
            .balanceOf(addressMarket, `${randomCard}`)
            .call()) &&
          (await ContractNfts.methods.balanceOf(addressMarket, `${1}`).call())
        ) {
          await mapper(1);
          break;
        } else if (
          rarity !== 1 &&
          probability(rarity) &&
          (await ContractNfts.methods
            .balanceOf(addressMarket, `${randomCard}`)
            .call())
        ) {
          await mapper(randomCard);
          break;
        } else randomCard -= 1;
      }
    }

    for (let key in map) {
      values.push(`${map[key]}`);
      keys.push(key);
    }

    await ContractMarket.methods.getPacks(account).call();

    await ContractMarket.methods
      .unbox(`${code}`, account, keys, values)
      .send({ from: `${MY_ACCOUNT}` });

    return { keys, values, quantity };
  } catch (err) {
    console.log(err);
  }
};

module.exports = randomizer;
