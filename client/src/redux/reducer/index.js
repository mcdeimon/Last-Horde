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
  isLoading: true, // Loading state

  typeExplorer: "sale", // Nfts or packages
  packages: [],
  nfts: [], // All nfts
  filteredNfts: [], // Filtered by rarity and type all nfts

  account: "", // Account address
  myNfts: [], // My nfts
  filteredMyNfts: [], // Filtered by rarity and type my nfts
  myFavorites: [], // My favorites
  myOnSales: [], // My on sales

  nft: {}, // Detail of nft
  package: {}, // Detail of package

  rarity: [], // All rarity

  onSale: [], // All on sale
};

export const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    ////////////////////////////////////////////////////////////// loading

    case IS_LOADING:
      return {
        ...state,
        isLoading: payload, // Set the loading
      };

    ////////////////////////////////////////////////////////////// get cards and packages

    case GET_ALL_NFT:
      return {
        ...state,
        nfts: payload, // Set the nfts
        filteredNfts: payload, // Set the filtered nfts
      };

    case GET_NFT_BY_ID:
      return {
        ...state,
        nft: payload, // Set the nft
      };

    case GET_PACKAGES:
      return {
        ...state,
        packages: payload, // Set the packages
      };

    case GET_PACKAGE_BY_ID:
      return {
        ...state,
        package: payload, // Set the package
      };

    case GET_RARITY:
      return {
        ...state,
        rarity: payload, // Set the rarity
      };

    case GET_ON_SELL:
      let myOnSales = [];

      if (state.account)
        // Filter by account
        myOnSales = payload.filter(
          (nft) =>
            nft.account.toLocaleLowerCase() ===
            state.account.toLocaleLowerCase()
        );
      else myOnSales = state.myOnSales;

      return {
        ...state,
        onSale: payload, // Set the on sale
        myOnSales: myOnSales, // Set the my on sale
      };

    ////////////////////////////////////////////////////////////// filters

    case FILTER_RARITY:
      let filteredNftsAux = []; // Filtered nfts aux

      switch (payload) {
        case "silver":
          filteredNftsAux = [...state.nfts].filter(
            (nft) => state.rarity[nft.id] === "1"
          ); // Filter by rarity 1
          break;

        case "green":
          filteredNftsAux = [...state.nfts].filter(
            (nft) => state.rarity[nft.id] === "2"
          ); // Filter by rarity 2
          break;

        case "gold":
          filteredNftsAux = [...state.nfts].filter(
            (nft) => state.rarity[nft.id] === "3"
          ); // Filter by rarity 3
          break;

        case "red":
          filteredNftsAux = [...state.nfts].filter(
            (nft) => state.rarity[nft.id] === "4"
          ); // Filter by rarity 4
          break;

        case "purple":
          filteredNftsAux = [...state.nfts].filter(
            (nft) => state.rarity[nft.id] === "5"
          ); // Filter by rarity 5
          break;

        default: // Filter by all rarity
          filteredNftsAux = [...state.nfts];
          break;
      }

      return {
        ...state,
        filteredNfts: filteredNftsAux, // Set the filtered nfts
      };

    case FILTER_TYPE:
      return {
        ...state,
        typeExplorer: payload ? payload : "sale", // Set the type
      };

    case FILTER_NAME:
      return {
        ...state,
        filteredNfts: [...state.nfts].filter((nft) => {
          if (payload.length >= 3)
            return nft.name.toLowerCase().includes(payload.toLowerCase());
          else return true;
        }), // Filter by name
      };

    ////////////////////////////////////////////////////////////// account

    case GET_ACCOUNT:
      return {
        ...state,
        account: payload.account, // Set the account
        myNfts: payload.deck, // Set the my nfts
        filteredMyNfts: payload.deck, // Set the filtered my nfts
        myFavorites: payload.favorites, // Set the my favorites
        myOnSales: state.onSale.filter(
          (nft) =>
            nft.account.toLocaleLowerCase() ===
            payload.account.toLocaleLowerCase()
        ), // Set the my on sales
      };

    case RESET_ACCOUNT:
      return {
        ...state,
        account: payload.account, // Set the account
        myNfts: payload.deck, // Set the my nfts
        filteredMyNfts: payload.deck, // Set the filtered my nfts
        myFavorites: payload.favorites, // Set the my favorites
        myOnSales: payload.OnSales, // Set the my on sales
      };

    case GET_MY_FAVORITES:
      return {
        ...state,
        myFavorites: payload, // Set the my favorites
      };

    default:
      return state; // Return the state
  }
};
