const Web3 = require("web3");

// We are on the server *OR* the user is not running metamask
const provider = new Web3.providers.HttpProvider(
  "https://speedy-nodes-nyc.moralis.io/42003094e33764c6f17b2b02/bsc/testnet"
);
let web3 = new Web3(provider);

module.exports = { web3 };
