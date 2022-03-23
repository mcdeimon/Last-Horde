import {
  FILTER_RARITY,
  FILTER_TYPE,
  GET_ALL_NFT,
  GET_NFT_BY_ID,
  GET_PACKAGES,
  GET_PACKAGE_BY_ID,
  IS_LOADING,
} from "../constants/index";

const initialState = {
  isLoading: true,
  packages: [],
  nfts: [],
  filteredNfts: [],
  myNfts: [],
  filteredMyNfts: [],
  nft: {},
  package: {},
  typeExplorer: "nfts",
};

export const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case IS_LOADING:
      return {
        ...state,
        isLoading: payload,
      };

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

    case FILTER_RARITY:
      let filteredNftsAux = [];

      switch (payload) {
        case "silver":
          filteredNftsAux = state.nfts.filter(
            (nft, index) => parseInt((index + 1) % 5) === 1
          );
          break;

        case "green":
          filteredNftsAux = state.nfts.filter(
            (nft, index) => parseInt((index + 1) % 5) === 2
          );
          break;

        case "gold":
          filteredNftsAux = state.nfts.filter(
            (nft, index) => parseInt((index + 1) % 5) === 3
          );
          break;

        case "red":
          filteredNftsAux = state.nfts.filter(
            (nft, index) => parseInt((index + 1) % 5) === 4
          );
          break;

        case "purple":
          filteredNftsAux = state.nfts.filter(
            (nft, index) => parseInt((index + 1) % 5) === 0
          );
          break;

        default:
          filteredNftsAux = state.nfts;
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

    default:
      return state;
  }
};
