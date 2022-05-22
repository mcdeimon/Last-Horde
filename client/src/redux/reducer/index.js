import {
  FILTER_NAME,
  FILTER_PRICE,
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
  myPackages: [], // My packages

  nft: {}, // Detail of nft
  package: {}, // Detail of package

  rarity: [], // All rarity

  onSale: [], // All on sale
  filteredOnSale: [], // Filtered by rarity and type on sale
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
        filteredOnSale: payload, // Set the filtered on sale
        myOnSales: myOnSales, // Set the my on sale
      };

    ////////////////////////////////////////////////////////////// filters

    case FILTER_RARITY:
      let filteredNftsAux = []; // Filtered nfts aux
      let filteredOnSaleAux = []; // Filtered on sale aux

      switch (payload) {
        case "silver":
          filteredNftsAux = [...state.nfts].filter(
            (nft) => state.rarity[nft.id] === "1"
          ); // Filter by rarity 1

          filteredOnSaleAux = [...state.onSale].filter(
            (nft) => state.rarity[nft.id_nft] === "1"
          ); // Filter by rarity 1
          break;

        case "green":
          filteredNftsAux = [...state.nfts].filter(
            (nft) => state.rarity[nft.id] === "2"
          ); // Filter by rarity 2

          filteredOnSaleAux = [...state.onSale].filter(
            (nft) => state.rarity[nft.id_nft] === "2"
          ); // Filter by rarity 2
          break;

        case "gold":
          filteredNftsAux = [...state.nfts].filter(
            (nft) => state.rarity[nft.id] === "3"
          ); // Filter by rarity 3

          filteredOnSaleAux = [...state.onSale].filter(
            (nft) => state.rarity[nft.id_nft] === "3"
          ); // Filter by rarity 3
          break;

        case "red":
          filteredNftsAux = [...state.nfts].filter(
            (nft) => state.rarity[nft.id] === "4"
          ); // Filter by rarity 4

          filteredOnSaleAux = [...state.onSale].filter(
            (nft) => state.rarity[nft.id_nft] === "4"
          ); // Filter by rarity 4
          break;

        case "purple":
          filteredNftsAux = [...state.nfts].filter(
            (nft) => state.rarity[nft.id] === "5"
          ); // Filter by rarity 5

          filteredOnSaleAux = [...state.onSale].filter(
            (nft) => state.rarity[nft.id_nft] === "5"
          ); // Filter by rarity 5
          break;

        case "all": // Filter by all rarity
          filteredNftsAux = [...state.nfts];

          filteredOnSaleAux = [...state.onSale];
          break;

        default:
          filteredNftsAux = [...state.nfts];

          filteredOnSaleAux = [...state.onSale];
          break;
      }

      return {
        ...state,
        filteredNfts: filteredNftsAux, // Set the filtered nfts
        filteredOnSale: filteredOnSaleAux, // Set the filtered on sale
      };

    case FILTER_TYPE:
      return {
        ...state,
        typeExplorer: payload ? payload : "sale", // Set the type
      };

    case FILTER_NAME:
      let filteredNftsAux2 = [...state.nfts].filter((nft) => {
        if (payload.length >= 3)
          return nft.name.toLowerCase().includes(payload.toLowerCase());
        else return true;
      }); // Filter by name
      let filteredOnSaleAux2 = [...state.onSale].filter((nft) => {
        if (payload.length >= 3)
          return nft.name.toLowerCase().includes(payload.toLowerCase());
        else return true;
      }); //Filter by name

      return {
        ...state,
        filteredNfts: filteredNftsAux2,
        filteredOnSale: filteredOnSaleAux2,
      };

    case FILTER_PRICE:
      let filteredNftsAux3 = [...state.filteredOnSale].sort((nft, nft2) => {
        if (payload.value === "descendant") {
          if (parseInt(nft.price) > parseInt(nft2.price)) return 1;
          else if (parseInt(nft.price) < parseInt(nft2.price)) return -1;
          else return 0;
        } // Sort by asc
        else {
          if (parseInt(nft.price) > parseInt(nft2.price)) return -1;
          else if (parseInt(nft.price) < parseInt(nft2.price)) return 1;
          else return 0;
        } // Sort by desc
      }); // Sort by price

      return {
        ...state,
        filteredOnSale:
          payload.value === "default" ? state.onSale : filteredNftsAux3,
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
        myPackages: payload.packs, // Set the my packages
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
