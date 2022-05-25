import Web3 from "web3";

const provider = new Web3.providers.HttpProvider(
  "https://speedy-nodes-nyc.moralis.io/42003094e33764c6f17b2b02/bsc/testnet"
);

let web3b = new Web3(provider);

export default web3b;
