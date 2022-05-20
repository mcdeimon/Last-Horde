const {ContractMarket, account} = require('./ContractQuickMarketU');

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

const randomizer = (raritys, length) => {
  const randomCards = [];

  while (randomCards.length < length - 1) {
    let randomCard = Math.floor(Math.random() * raritys.length);

    for (let rarity = parseInt(raritys[randomCard]); rarity > 0; rarity--) {
      if (rarity === 1 && await ContractMarket.methods.balanceOf(account, `${randomCard}`).call()) 
        randomCards.push(randomCard);
      else if (rarity === 1 && !await ContractMarket.methods.balanceOf(account, `${randomCard}`).call() && cards[1])
        randomCards.push(1);
      else if (rarity !== 1 && probability(rarity) && await ContractMarket.methods.balanceOf(account,`${randomCard}`).call())
        randomCards.push(randomCard);
      else randomCard -= 1;
    }
  }

  return randomCards;
};

export default randomizer;
