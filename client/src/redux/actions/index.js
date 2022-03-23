/* import axios from "axios"; */
import {
  FILTER_RARITY,
  FILTER_TYPE,
  GET_ALL_NFT,
  GET_NFT_BY_ID,
  GET_PACKAGES,
  IS_LOADING,
  GET_PACKAGE_BY_ID,
} from "../constants/index";

export const isLoadingFunction = (isLoading) => {
  return {
    type: IS_LOADING,
    payload: isLoading,
  };
};

////////////////////////////////////////////////////////////// get all

export const getAllNFT = () => async (dispatch) => {
  let nfts = [];
  let nft = {};

  try {
    for (let i = 1; i <= 250; i++) {
      /* nft = await axios.get(`https://app.lasthorde.com/NFTs/${i}.json`);
      nfts.push(nft.data); */

      nft = await require(`../../../public/Nfts/${i}.json`);
      nfts.push(nft);
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
}

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
