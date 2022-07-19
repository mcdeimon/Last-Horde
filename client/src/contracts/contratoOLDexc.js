import { web3 } from "../utils/web3";

//testnet
const address = "0xe4adcE212058CAb8a3Fa97F5C96455dF1093b6f9"; //contrato prueba
//abi test net
const abi = [
  {
    inputs: [
      { internalType: "address", name: "_stakingContract", type: "address" },
      { internalType: "address", name: "_rewardsToken", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "ClaimReward",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "rewards",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "lastUpdateTime",
        type: "uint256",
      },
    ],
    name: "RewardUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountRemaining",
        type: "uint256",
      },
    ],
    name: "Withdraw",
    type: "event",
  },
  {
    inputs: [{ internalType: "uint256", name: "_balance", type: "uint256" }],
    name: "earned",
    outputs: [{ internalType: "uint256", name: "reward", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "enableLock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "enableUnLock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "exContract",
    outputs: [
      { internalType: "contract StakingRewards", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "getStackingAmount",
    outputs: [
      { internalType: "uint256", name: "totalbalance", type: "uint256" },
      { internalType: "uint256", name: "rest", type: "uint256" },
      { internalType: "uint256", name: "reward", type: "uint256" },
      { internalType: "bool", name: "eLock", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lastUpdateTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "x", type: "uint256" },
      { internalType: "uint256", name: "y", type: "uint256" },
      { internalType: "uint256", name: "z", type: "uint256" },
    ],
    name: "mulDiv",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
    name: "ownerWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "rewardsToken",
    outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
export default new web3.eth.Contract(abi, address);
