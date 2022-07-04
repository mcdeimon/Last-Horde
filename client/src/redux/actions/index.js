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
  FILTER_PRICE,
} from "../constants/index";
import { web3 } from "../../utils/web3";
import ContractNfts from "../../contracts/ContractNfts";
import axios from "axios";
import ContractQuickMarket from "../../contracts/ContractQuickMarket";

const { REACT_APP_ACCOUNT, REACT_APP_HOST_DB } = process.env;

// Get the account
const getAccountFunction = async () => {
  const accounts = await web3.eth.getAccounts();
  return accounts[0];
};

////////////////////////////////////////////////////////////// loading

// Set the loading
export const isLoadingFunction = (isLoading) => {
  // Set the information in the store
  return {
    type: IS_LOADING,
    payload: isLoading,
  };
};

////////////////////////////////////////////////////////////// get cards and packages

// Get all the NFTs
export const getAllNFT = () => async (dispatch) => {
  let nfts = [],
    nft = {},
    amountAux = {};

  try {
    // Get amount of nfts
    amountAux = await ContractNfts.methods.poolIde().call();

    for (let i = 1; i <= amountAux; i++) {
      // Save the nft in the array
      /* nft = await axios.get(`https://app.lasthorde.com/NFTs/${i}.json`);
      nfts.push(nft.data); */

      nft = await require(`../../../public/Nfts/${i}.json`);
      nfts.push({ ...nft, id: i });
    }
  } catch (e) {
    console.log(e);
  }

  // Set the information in the store
  dispatch({
    type: GET_ALL_NFT,
    payload: nfts,
  });
};

// Get the NFT by id
export const getNFTById = (id) => async (dispatch) => {
  let nft = {};

  try {
    // Get the nft
    /* nft = await axios.get(`https://app.lasthorde.com/NFTs/${id}.json`);
    nft = nft.data; */

    nft = await require(`../../../public/Nfts/${id}.json`);
  } catch (e) {
    console.log(e);
  }

  // Set the information in the store
  dispatch({
    type: GET_NFT_BY_ID,
    payload: nft,
  });
};

// Get all the packages
export const getPackages = () => async (dispatch) => {
  let packages = [],
    packageCard = {};

  try {
    for (let i = 1; i <= 3; i++) {
      // Get the packages
      /* packageCard = await axios.get(`https://app.lasthorde.com/Packages/${i}.json`);
      packages.push(packageCard.data); */

      packageCard = await require(`../../../public/Packages/${i}.json`);
      packages.push(packageCard);
    }
  } catch (e) {
    console.log(e);
  }

  // Set the information in the store
  dispatch({
    type: GET_PACKAGES,
    payload: packages,
  });
};

// Get the package by id
export const getPackagesById = (id) => async (dispatch) => {
  let packageCard = {};

  try {
    // Get the package
    /* packageCard = await axios.get(`https://app.lasthorde.com/Packages/${id}.json`);
    packageCard = packageCard.data; */

    packageCard = await require(`../../../public/Packages/${id}.json`);
  } catch (e) {
    console.log(e);
  }

  // Set the information in the store
  dispatch({
    type: GET_PACKAGE_BY_ID,
    payload: packageCard,
  });
};

// Get the rarity of the NFTs
export const getRarity = () => async (dispatch) => {
  const pack = await ContractNfts.methods.viewDeck2(REACT_APP_ACCOUNT).call();

  // Set the information in the store
  dispatch({
    type: GET_RARITY,
    payload: pack[1],
  });
};

// Get all the NFTs on sale
export const getOnSell = () => async (dispatch) => {
  let onSell = [],
    nftArr = [],
    nft = {};

  try {
    // Get the nfts on sale
    onSell = await axios.get(`${REACT_APP_HOST_DB}/on-sale`);
    onSell = onSell.data.all;

    // Filter nfts cancelled and sold
    for (let i = 0; i < onSell.length; i++) {
      /* nft = await axios.get(`https://app.lasthorde.com/NFTs/${onSell[i].id_nft}.json`);
      nfts.push(nft.data); */

      nft = await require(`../../../public/Nfts/${onSell[i].id_nft}.json`);
      nftArr.push({ ...nft, ...onSell[i], id: onSell[i].id_nft });
    }
  } catch (e) {
    console.log(e);
  }

  // Set the information in the store
  dispatch({
    type: GET_ON_SELL,
    payload: nftArr,
  });
};

////////////////////////////////////////////////////////////// filters

// Filter the NFTs by rarity
export const filterRarity = (rarity) => (dispatch) => {
  // Set the information in the store
  dispatch({
    type: FILTER_RARITY,
    payload: rarity.value,
  });
};

// Filter the NFTs by type
export const filterType = (type) => (dispatch) => {
  // Set the information in the store
  dispatch({
    type: FILTER_TYPE,
    payload: type.value,
  });
};

// Filter the NFTs by name
export const filterNftName = (name) => (dispatch) => {
  // Set the information in the store
  dispatch({
    type: FILTER_NAME,
    payload: name,
  });
};

// Filter the NFTs by price
export const filterPrice = (price) => (dispatch) => {
  // Set the information in the store
  dispatch({
    type: FILTER_PRICE,
    payload: price,
  });
};

////////////////////////////////////////////////////////////// account

// Get the account, my favorite cards and my nfts
export const getAccount = () => async (dispatch) => {
  let account = {},
    pack = [],
    deck = [],
    favoritesIDs = [],
    favorites = [],
    packsQuantity = [],
    packs = [],
    pkg = {};

  try {
    // Get the account
    account = await getAccountFunction();

    // Get the favorites
    favoritesIDs = await axios.get(`${REACT_APP_HOST_DB}/account/${account}`);
    favoritesIDs = favoritesIDs.data.favorites;

    for (let i = 1; i < favoritesIDs.length; i++) {
      // Get the favorites cards
      /* nft = await axios.get(`https://app.lasthorde.com/NFTs/${favoritesIDs[i].id_nft}.json`);
      nfts.push({ ...nft.data, id: favoritesIDs[i].id_nft }); */

      let nft =
        await require(`../../../public/Nfts/${favoritesIDs[i].id_nft}.json`);
      favorites.push({ ...nft, id: favoritesIDs[i].id_nft });
    }

    // Get the deck
    pack = await ContractNfts.methods.viewDeck2(account).call();

    // Get the nfts
    for (let i = 1; i <= pack[0].length; i++) {
      let nft = {};

      if (pack[0][i]) {
        /* nft = await axios.get(`https://app.lasthorde.com/NFTs/${i}.json`);
        for (let j = 0; j < pack[0][i]; j++) {
          deck.push({ ...nft.data, id: i });
        } */

        nft = await require(`../../../public/Nfts/${i}.json`);

        for (let j = 0; j < pack[0][i]; j++) deck.push({ ...nft, id: i });
      }
    }

    // Get the packs
    packsQuantity = await ContractQuickMarket.methods.getPacks(account).call();

    for (let i = 0; i < packsQuantity.length; i++) {
      for (let j = 0; j < packsQuantity[i]; j++) {
        // Get the packages
        /* pkg = await axios.get(`https://app.lasthorde.com/Packages/${i}.json`);
      packs.push(pkg.data); */

        pkg = await require(`../../../public/Packages/${i + 1}.json`);
        packs.push(pkg);
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

  // Set the information in the store
  dispatch({
    type: GET_ACCOUNT,
    payload: {
      account,
      deck,
      favorites,
      packs,
    },
  });
};

// Reset the account
export const resetAccount = () => (dispatch) => {
  // Set the information in the store
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

// Get the my favorite cards
export const getMyFavorites = () => async (dispatch) => {
  let account = [],
    favoritesIDs = [],
    favorites = [];

  try {
    // Get the account
    account = await getAccountFunction();

    // Get the favorites
    favoritesIDs = await axios.get(`${REACT_APP_HOST_DB}/account/${account}`);

    favoritesIDs = favoritesIDs.data.favorites;

    // Get the nfts
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

  // Set the information in the store
  dispatch({
    type: GET_MY_FAVORITES,
    payload: favorites,
  });
};
