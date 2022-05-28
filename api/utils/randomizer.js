const { ContractNfts } = require("./ContractNfts");
const { addressMarket, ContractMarket } = require("./ContractQuickMarketU");

const { MY_PRIVATE_KEY_HEX } = process.env;

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
  const randomCards = [];
  let map = {},
    values = [],
    keys = [];

  try {
    while (randomCards.length < length) {
      let randomCard = Math.floor(Math.random() * raritys.length);

      for (let rarity = parseInt(raritys[randomCard]); rarity > 0; rarity--) {
        if (
          rarity === 1 &&
          (await ContractNfts.methods
            .balanceOf(addressMarket, `${randomCard}`)
            .call())
        ) {
          randomCards.push(randomCard);
          break;
        } else if (
          rarity === 1 &&
          !(await ContractNfts.methods
            .balanceOf(addressMarket, `${randomCard}`)
            .call()) &&
          (await ContractNfts.methods.balanceOf(addressMarket, `${1}`).call())
        ) {
          randomCards.push(1);
          break;
        } else if (
          rarity !== 1 &&
          probability(rarity) &&
          (await ContractNfts.methods
            .balanceOf(addressMarket, `${randomCard}`)
            .call())
        ) {
          randomCards.push(randomCard);
          break;
        } else randomCard -= 1;
      }
    }

    for (let i = 0; i < randomCards.length; i++) {
      if (!map[randomCards[i]]) map[randomCards[i]] = 1;
      else map[randomCards[i]] += 1;
    }

    for (let key in map) {
      values.push(`${map[key]}`);
      keys.push(key);
    }

    console.log("keys", keys);
    console.log("values", values);

    const myAccount = web3.eth.accounts.privateKeyToAccount(MY_PRIVATE_KEY_HEX);

    const test = await ContractMarket.methods
      .unbox(`${code}`, account, keys, values)
      .send({
        from: myAccount.address,
        gas: "3000000",
      });

    console.log(test);

    return { keys, values };
  } catch (err) {
    console.log(err);
  }
};

module.exports = randomizer;
