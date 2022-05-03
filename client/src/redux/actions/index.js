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
  RESET_ACCOUNT,
  FILTER_NAME,
  GET_MY_FAVORITES,
  GET_ON_SELL,
} from "../constants/index";
import { web3 } from "../../utils/web3";
import ContractNfts from "../../contracts/ContractNfts";
import axios from "axios";

const { REACT_APP_ACCOUNT, REACT_APP_HOST_DB } = process.env;

const getAccountFunction = async () => {
  const accounts = await web3.eth.getAccounts();
  return accounts[0];
};

////////////////////////////////////////////////////////////// loading

export const isLoadingFunction = (isLoading) => {
  return {
    type: IS_LOADING,
    payload: isLoading,
  };
};

////////////////////////////////////////////////////////////// get cards and packages

export const getAllNFT = () => async (dispatch) => {
  let nfts = [],
    nft = {},
    amountNfts = 0,
    amountAux = {};

  try {
    amountAux = await axios.get(`https://${REACT_APP_HOST_DB}/amount-nft`);
    amountNfts = amountAux.data.amount;

    for (let i = 1; i <= amountNfts; i++) {
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
  let packages = [],
    packageCard = {};

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
  const pack = await ContractNfts.methods.viewDeck2(REACT_APP_ACCOUNT).call();

  dispatch({
    type: GET_RARITY,
    payload: pack[1],
  });
};

export const getOnSell = () => async (dispatch) => {
  let onSell = [],
    nftArr = [],
    nft = {};

  try {
    onSell = await axios.get(`https://${REACT_APP_HOST_DB}/on-sell`);
    onSell = onSell.data.all;

    for (let i = 0; i < onSell.length; i++) {
      if (
        !onSell[i].sold ||
        !onSell[i].expired ||
        onSell[i].created_days == Date() + onSell[i].expiration_days
      ) {
        /* nft = await axios.get(`https://app.lasthorde.com/NFTs/${onSell[i].id_nft}.json`);
      nfts.push(nft.data); */

        nft = await require(`../../../public/Nfts/${onSell[i].id_nft}.json`);
        nftArr.push({ ...nft, ...onSell[i], id: onSell[i].id_nft });
      }
    }
  } catch (e) {
    console.log(e);
  }

  dispatch({
    type: GET_ON_SELL,
    payload: nftArr,
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

export const filterNftName = (name) => (dispatch) => {
  dispatch({
    type: FILTER_NAME,
    payload: name,
  });
};

////////////////////////////////////////////////////////////// account

export const getAccount = () => async (dispatch) => {
  let account = {},
    pack = [],
    deck = [],
    favoritesIDs = [],
    favorites = [];

  try {
    account = await getAccountFunction();

    favoritesIDs = await axios.get(
      `https://${REACT_APP_HOST_DB}/account/${account}`
    );
    favoritesIDs = favoritesIDs.data.favorites;

    for (let i = 1; i < favoritesIDs.length; i++) {
      /* nft = await axios.get(`https://app.lasthorde.com/NFTs/${favoritesIDs[i].id_nft}.json`);
      nfts.push({ ...nft.data, id: favoritesIDs[i].id_nft }); */

      let nft =
        await require(`../../../public/Nfts/${favoritesIDs[i].id_nft}.json`);
      favorites.push({ ...nft, id: favoritesIDs[i].id_nft });
    }

    pack = await ContractNfts.methods.viewDeck2(account).call();

    for (let i = 1; i <= pack[0].length; i++) {
      let nft = {};

      if (pack[0][i]) {
        /* nft = await axios.get(`https://app.lasthorde.com/NFTs/${i}.json`);
        for (let j = 0; j < pack[0][i]; j++) {
          deck.push({ ...nft.data, id: i });
        } */

        nft = await require(`../../../public/Nfts/${i}.json`);

        if (deck.length < 200)
          for (let j = 0; j < pack[0][i]; j++) deck.push({ ...nft, id: i });
      }
    }
  } catch (e) {
    console.log(e);

    if (e.code === "INVALID_ARGUMENT") {
      window.location.reload();
    } else {
      account = "";
      alert(e.message);
    }
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

export const resetAccount = () => (dispatch) => {
  dispatch({
    type: RESET_ACCOUNT,
    payload: {
      account: "",
      deck: [],
      favorites: [],
      OnSales: [],
    },
  });
};

export const getMyFavorites = () => async (dispatch) => {
  let account = [],
    favoritesIDs = [],
    favorites = [];

  try {
    account = await getAccountFunction();

    favoritesIDs = await axios.get(
      `https://${REACT_APP_HOST_DB}/account/${account}`
    );

    favoritesIDs = favoritesIDs.data.favorites;

    for (let i = 1; i < favoritesIDs.length; i++) {
      /* nft = await axios.get(`https://app.lasthorde.com/NFTs/${favoritesIDs[i].id_nft}.json`);
      nfts.push({ ...nft.data, id: favoritesIDs[i].id_nft }); */

      let nft =
        await require(`../../../public/Nfts/${favoritesIDs[i].id_nft}.json`);
      favorites.push({ ...nft, id: favoritesIDs[i].id_nft });
    }
  } catch (e) {
    console.log(e);

    if (e.code === "INVALID_ARGUMENT") {
      window.location.reload();
    } else {
      account = "";
      alert(e.message);
    }
  }

  dispatch({
    type: GET_MY_FAVORITES,
    payload: favorites,
  });
};
