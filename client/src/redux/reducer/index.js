import {
  FILTER_NAME,
  FILTER_RARITY,
  FILTER_TYPE,
  GET_ACCOUNT,
  GET_ALL_NFT,
  GET_MY_FAVORITES,
  GET_NFT_BY_ID,
  GET_ON_SELL,
  GET_PACKAGES,
  GET_PACKAGE_BY_ID,
  GET_RARITY,
  IS_LOADING,
  RESET_ACCOUNT,
} from "../constants/index";

const initialState = {
  contract: "",
  isLoading: true,

  typeExplorer: "sale", //=nfts or packages
  packages: [],
  nfts: [], // all nfts
  filteredNfts: [], // filtered by rarity and type all nfts

  account: "", // account address
  myNfts: [], // my nfts
  filteredMyNfts: [], // filtered by rarity and type my nfts
  myFavorites: [], // my favorites
  myOnSales: [], // my on sales

  nft: {}, //detail of nft
  package: {}, //detail of package

  rarity: [], //all rarity

  onSale: [], //all on sale
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

    case GET_ON_SELL:
      let myOnSales = [];

      if (state.account)
        myOnSales = payload.filter(
          (nft) =>
            nft.account.toLocaleLowerCase() ===
            state.account.toLocaleLowerCase()
        );
      else myOnSales = state.myOnSales;

      return {
        ...state,
        onSale: payload,
        myOnSales: myOnSales,
      };

    ////////////////////////////////////////////////////////////// filters

    case FILTER_RARITY:
      let filteredNftsAux = [];

      switch (payload) {
        case "silver":
          filteredNftsAux = [...state.nfts].filter(
            (nft) => state.rarity[nft.id] === "1"
          );
          break;

        case "green":
          filteredNftsAux = [...state.nfts].filter(
            (nft) => state.rarity[nft.id] === "2"
          );
          break;

        case "gold":
          filteredNftsAux = [...state.nfts].filter(
            (nft) => state.rarity[nft.id] === "3"
          );
          break;

        case "red":
          filteredNftsAux = [...state.nfts].filter(
            (nft) => state.rarity[nft.id] === "4"
          );
          break;

        case "purple":
          filteredNftsAux = [...state.nfts].filter(
            (nft) => state.rarity[nft.id] === "5"
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

    case FILTER_NAME:
      return {
        ...state,
        filteredNfts: [...state.nfts].filter((nft) => {
          if (payload.length >= 3)
            return nft.name.toLowerCase().includes(payload.toLowerCase());
          else return true;
        }),
      };

    ////////////////////////////////////////////////////////////// account

    case GET_ACCOUNT:
      return {
        ...state,
        account: payload.account,
        myNfts: payload.deck,
        filteredMyNfts: payload.deck,
        myFavorites: payload.favorites,
        myOnSales: state.onSale.filter(
          (nft) =>
            nft.account.toLocaleLowerCase() ===
            payload.account.toLocaleLowerCase()
        ),
      };

    case RESET_ACCOUNT:
      return {
        ...state,
        account: payload.account,
        myNfts: payload.deck,
        filteredMyNfts: payload.deck,
        myFavorites: payload.favorites,
        myOnSales: payload.OnSales,
      };

    case GET_MY_FAVORITES:
      return {
        ...state,
        myFavorites: payload,
      };

    default:
      return state;
  }
};
