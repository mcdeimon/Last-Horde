const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");

const { MY_PRIVATE_KEY_HEX, MORALIS_LINK } = process.env;

const localKeyProvider = new HDWalletProvider(
  `${MY_PRIVATE_KEY_HEX}`,
  `${MORALIS_LINK}`
);

let web3 = new Web3(localKeyProvider);

module.exports = { web3 };
