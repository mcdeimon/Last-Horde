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
        isLoading: payload, // set the loading
      };

    ////////////////////////////////////////////////////////////// get cards and packages

    case GET_ALL_NFT:
      return {
        ...state,
        nfts: payload, // set the nfts
        filteredNfts: payload, // set the filtered nfts
      };

    case GET_NFT_BY_ID:
      return {
        ...state,
        nft: payload, // set the nft
      };

    case GET_PACKAGES:
      return {
        ...state,
        packages: payload, // set the packages
      };

    case GET_PACKAGE_BY_ID:
      return {
        ...state,
        package: payload, // set the package
      };

    case GET_RARITY:
      return {
        ...state,
        rarity: payload, // set the rarity
      };

    case GET_ON_SELL:
      let myOnSales = [];

      if (state.account)
        // filter by account
        myOnSales = payload.filter(
          (nft) =>
            nft.account.toLocaleLowerCase() ===
            state.account.toLocaleLowerCase()
        );
      else myOnSales = state.myOnSales;

      return {
        ...state,
        onSale: payload, // set the on sale
        myOnSales: myOnSales, // set the my on sale
      };

    ////////////////////////////////////////////////////////////// filters

    case FILTER_RARITY:
      let filteredNftsAux = []; // filtered nfts aux

      switch (payload) {
        case "silver":
          filteredNftsAux = [...state.nfts].filter(
            (nft) => state.rarity[nft.id] === "1"
          ); // filter by rarity 1
          break;

        case "green":
          filteredNftsAux = [...state.nfts].filter(
            (nft) => state.rarity[nft.id] === "2"
          ); // filter by rarity 2
          break;

        case "gold":
          filteredNftsAux = [...state.nfts].filter(
            (nft) => state.rarity[nft.id] === "3"
          ); // filter by rarity 3
          break;

        case "red":
          filteredNftsAux = [...state.nfts].filter(
            (nft) => state.rarity[nft.id] === "4"
          ); // filter by rarity 4
          break;

        case "purple":
          filteredNftsAux = [...state.nfts].filter(
            (nft) => state.rarity[nft.id] === "5"
          ); // filter by rarity 5
          break;

        default: // filter by all rarity
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
        typeExplorer: payload ? payload : "sale", // set the type
      };

    case FILTER_NAME:
      return {
        ...state,
        filteredNfts: [...state.nfts].filter((nft) => {
          if (payload.length >= 3)
            return nft.name.toLowerCase().includes(payload.toLowerCase());
          else return true;
        }), // filter by name
      };

    ////////////////////////////////////////////////////////////// account

    case GET_ACCOUNT:
      return {
        ...state,
        account: payload.account, // set the account
        myNfts: payload.deck, // set the my nfts
        filteredMyNfts: payload.deck, // set the filtered my nfts
        myFavorites: payload.favorites, // set the my favorites
        myOnSales: state.onSale.filter(
          (nft) =>
            nft.account.toLocaleLowerCase() ===
            payload.account.toLocaleLowerCase()
        ), // set the my on sales
      };

    case RESET_ACCOUNT:
      return {
        ...state,
        account: payload.account, // set the account
        myNfts: payload.deck, // set the my nfts
        filteredMyNfts: payload.deck, // set the filtered my nfts
        myFavorites: payload.favorites, // set the my favorites
        myOnSales: payload.OnSales, // set the my on sales
      };

    case GET_MY_FAVORITES:
      return {
        ...state,
        myFavorites: payload, // set the my favorites
      };

    default:
      return state; // return the state
  }
};
