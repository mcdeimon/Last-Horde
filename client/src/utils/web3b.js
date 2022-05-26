import Web3 from "web3";

const provider = new Web3.providers.HttpProvider(
  "https://speedy-nodes-nyc.moralis.io/bb6edae8e1f2b21d5125c656/bsc/testnet"
);

let web3b = new Web3(provider);

export default web3b;
