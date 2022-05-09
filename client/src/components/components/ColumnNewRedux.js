import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import NftCard from "./NftCard";

//react functional component
const ColumnNewRedux = ({ type }) => {
  // Get params from global store
  const filteredNfts = useSelector((state) => state.filteredNfts);
  const myNfts = useSelector((state) => state.myNfts);
  const packages = useSelector((state) => state.packages);
  const typeExplorerAux = useSelector((state) => state.typeExplorer);
  const myFavoritesState = useSelector((state) => state.myFavorites);
  const onSale = useSelector((state) => state.onSale);
  const myOnSaleState = useSelector((state) => state.myOnSales);

  // Extra data of the NFT or PACKAGE
  const [nfts, setNFTs] = useState([]);
  const [packagesArr, setPackagesArr] = useState([]);
  const [typeExplorer, setTypeExplorer] = useState("sale");
  const [height, setHeight] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Function set img height
  const onImgLoad = ({ target: img }) => {
    let currentHeight = height;
    if (currentHeight < img.offsetHeight) {
      setHeight(img.offsetHeight);
    }
  };

  // Function to set the information of the NFTs and PACKAGES
  const handleIsSell = () => {
    if (typeExplorer === "nfts") return false;
    if (type !== "explore") return true;
    else return true;
  };

  // Function to set the array of NFTs and PACKAGES
  useEffect(() => {
    setPackagesArr(packages);

    switch (type) {
      case "myNfts":
        setNFTs(myNfts);
        break;

      case "myOnSaleNfts":
        setNFTs(myOnSaleState);
        break;

      case "myOnRentNfts":
        setNFTs(myNfts);
        break;

      case "myFavoritesNfts":
        setNFTs(myFavoritesState);
        break;

      default:
        if (typeExplorer === "nfts") setNFTs(filteredNfts);
        else setNFTs(onSale);
        break;
    }
  }, [
    filteredNfts,
    packages,
    myNfts,
    myFavoritesState,
    type,
    typeExplorer,
    onSale,
    myOnSaleState,
  ]);

  // Function to set the loading state
  useEffect(() => {
    if (typeExplorerAux !== typeExplorer) {
      setIsLoading(true);
      setTypeExplorer(typeExplorerAux);

      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  }, [typeExplorerAux, typeExplorer]);

  return (
    <div className="row height100VH">
      {isLoading ? (
        <Loading /> // Loading component
      ) : (
        <>
          {typeExplorer === "packages"
            ? packagesArr?.map((packageCards, index) => (
                <NftCard
                  item={{ ...packageCards, id: index + 1 }}
                  typeExplorer={typeExplorer}
                  key={index}
                  onImgLoad={onImgLoad}
                  height={height}
                /> // NftCard component with the information of the Package
              ))
            : nfts?.map((nft, index) => (
                <NftCard
                  item={nft}
                  typeExplorer={typeExplorer}
                  key={index}
                  onImgLoad={onImgLoad}
                  height={height}
                  sell={handleIsSell()}
                /> // NftCard component with the information of the NFT
              ))}
        </>
      )}
    </div>
  );
};

export default memo(ColumnNewRedux);
