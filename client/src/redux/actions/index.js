/* import axios from "axios"; */
import {
  FILTER_RARITY,
  FILTER_TYPE,
  GET_ALL_NFT,
  GET_NFT_BY_ID,
  GET_PACKAGES,
  IS_LOADING,
  GET_PACKAGE_BY_ID,
  GET_ACCOUNT,
  GET_RARITY,
} from "../constants/index";
import { web3 } from "../../utils/web3";
import Contract1155 from "../../contracts/Contract1155";
import axios from "axios";

const { REACT_APP_ACCOUNT } = process.env;

////////////////////////////////////////////////////////////// loading

export const isLoadingFunction = (isLoading) => {
  return {
    type: IS_LOADING,
    payload: isLoading,
  };
};

////////////////////////////////////////////////////////////// get cards and packages

export const getAllNFT = () => async (dispatch) => {
  let nfts = [];
  let nft = {};

  try {
    for (let i = 1; i <= 260; i++) {
      /* nft = await axios.get(`https://app.lasthorde.com/NFTs/${i}.json`);
      nfts.push(nft.data); */

      nft = await require(`../../../public/Nfts/${i}.json`);
      nfts.push({ ...nft, id: i });
    }
  } catch (e) {
    console.log(e);
  }

  dispatch({
    type: GET_ALL_NFT,
    payload: nfts,
  });
};

export const getNFTById = (id) => async (dispatch) => {
  let nft = {};

  try {
    /* nft = await axios.get(`https://app.lasthorde.com/NFTs/${id}.json`);
    nft = nft.data; */

    nft = await require(`../../../public/Nfts/${id}.json`);
  } catch (e) {
    console.log(e);
  }

  dispatch({
    type: GET_NFT_BY_ID,
    payload: nft,
  });
};

export const getPackages = () => async (dispatch) => {
  let packages = [];
  let packageCard = {};

  try {
    for (let i = 1; i <= 3; i++) {
      /* packageCard = await axios.get(`https://app.lasthorde.com/Packages/${i}.json`);
      packages.push(packageCard.data); */

      packageCard = await require(`../../../public/Packages/${i}.json`);
      packages.push(packageCard);
    }
  } catch (e) {
    console.log(e);
  }

  dispatch({
    type: GET_PACKAGES,
    payload: packages,
  });
};

export const getPackagesById = (id) => async (dispatch) => {
  let packageCard = {};

  try {
    /* packageCard = await axios.get(`https://app.lasthorde.com/Packages/${id}.json`);
    packageCard = packageCard.data; */

    packageCard = await require(`../../../public/Packages/${id}.json`);
  } catch (e) {
    console.log(e);
  }

  dispatch({
    type: GET_PACKAGE_BY_ID,
    payload: packageCard,
  });
};

export const getRarity = () => async (dispatch) => {
  const pack = await Contract1155.methods.viewDeck2(REACT_APP_ACCOUNT).call();

  dispatch({
    type: GET_RARITY,
    payload: pack[1],
  });
};

////////////////////////////////////////////////////////////// filters

export const filterRarity = (rarity) => (dispatch) => {
  dispatch({
    type: FILTER_RARITY,
    payload: rarity.value,
  });
};

export const filterType = (type) => (dispatch) => {
  dispatch({
    type: FILTER_TYPE,
    payload: type.value,
  });
};

////////////////////////////////////////////////////////////// account

export const getAccount = () => async (dispatch) => {
  let accounts = [],
    account = {},
    pack = [],
    deck = [],
    favorites = [];

  try {
    accounts = await web3.eth.getAccounts();
    account = accounts[0];

    favorites = await fetch(`http://192.168.100.165:8000/account/${account}`);
    console.log(favorites, "favorites");
    favorites = favorites.favorites;

    pack = await Contract1155.methods.viewDeck2(account).call();
    deck = [];

    for (let i = 1; i <= pack[0].length; i++) {
      let nft = {};

      if (pack[0][i]) {
        /* nft = await axios.get(`https://app.lasthorde.com/NFTs/${id}.json`);
        nft = nft.data; */

        nft = await require(`../../../public/Nfts/${i}.json`);
        for (let j = 0; j < pack[0][i]; j++) {
          deck.push(nft);
        }
      }
    }
  } catch (e) {
    console.log(e);
  }

  dispatch({
    type: GET_ACCOUNT,
    payload: {
      account,
      deck,
      favorites,
    },
  });
};
