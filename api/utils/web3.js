const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");

const { MY_PRIVATE_KEY_HEX } = process.env;

// We are on the server *OR* the user is not running metamask
const provider = new Web3.providers.HttpProvider(
  "https://speedy-nodes-nyc.moralis.io/42003094e33764c6f17b2b02/bsc/testnet"
);

const localKeyProvider = new HDWalletProvider({
  privateKeys: [MY_PRIVATE_KEY_HEX],
  providerOrUrl: provider,
});

let web3 = new Web3(localKeyProvider);

module.exports = { web3 };
