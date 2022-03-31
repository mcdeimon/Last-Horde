import {
  FILTER_RARITY,
  FILTER_TYPE,
  GET_ACCOUNT,
  GET_ALL_NFT,
  GET_NFT_BY_ID,
  GET_PACKAGES,
  GET_PACKAGE_BY_ID,
  GET_RARITY,
  IS_LOADING,
} from "../constants/index";

const initialState = {
  isLoading: true,

  typeExplorer: "nfts", //nfts or packages
  packages: [],
  nfts: [], // all nfts
  filteredNfts: [], // filtered by rarity and type all nfts

  account: "",
  myNfts: [],
  filteredMyNfts: [],

  nft: {}, //detail of nft
  package: {}, //detail of package

  rarity: [], //all rarity
};

export const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    ////////////////////////////////////////////////////////////// loading

    case IS_LOADING:
      return {
        ...state,
        isLoading: payload,
      };

    ////////////////////////////////////////////////////////////// get cards and packages

    case GET_ALL_NFT:
      return {
        ...state,
        nfts: payload,
        filteredNfts: payload,
      };

    case GET_NFT_BY_ID:
      return {
        ...state,
        nft: payload,
      };

    case GET_PACKAGES:
      return {
        ...state,
        packages: payload,
      };

    case GET_PACKAGE_BY_ID:
      return {
        ...state,
        package: payload,
      };

    case GET_RARITY:
      return {
        ...state,
        rarity: payload,
      };

    ////////////////////////////////////////////////////////////// filters

    case FILTER_RARITY:
      let filteredNftsAux = [];

      switch (payload) {
        case "silver":
          filteredNftsAux = [...state.nfts].filter(
            (nft) => rarity[nft.id] === 1
          );
          break;

        case "green":
          filteredNftsAux = [...state.nfts].filter(
            (nft) => rarity[nft.id] === 2
          );
          break;

        case "gold":
          filteredNftsAux = [...state.nfts].filter(
            (nft) => rarity[nft.id] === 3
          );
          break;

        case "red":
          filteredNftsAux = [...state.nfts].filter(
            (nft) => rarity[nft.id] === 4
          );
          break;

        case "purple":
          filteredNftsAux = [...state.nfts].filter(
            (nft) => rarity[nft.id] === 0
          );
          break;

        default:
          filteredNftsAux = [...state.nfts];
          break;
      }

      return {
        ...state,
        filteredNfts: filteredNftsAux,
      };

    case FILTER_TYPE:
      return {
        ...state,
        typeExplorer: payload ? payload : "nfts",
      };

    ////////////////////////////////////////////////////////////// account

    case GET_ACCOUNT:
      return {
        ...state,
        account: payload.account,
        myNfts: payload.deck,
        filteredMyNfts: payload.deck,
      };

    default:
      return state;
  }
};
