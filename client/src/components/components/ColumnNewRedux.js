import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import NftCard from "./NftCard";

//react functional component
const ColumnNewRedux = ({ type }) => {
  const filteredNfts = useSelector((state) => state.filteredNfts);
  const myNfts = useSelector((state) => state.myNfts);
  const packages = useSelector((state) => state.packages);
  const typeExplorerAux = useSelector((state) => state.typeExplorer);

  const [nfts, setNFTs] = useState([]);
  const [packagesArr, setPackagesArr] = useState([]);
  const [typeExplorer, setTypeExplorer] = useState("nfts");
  const [height, setHeight] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const onImgLoad = ({ target: img }) => {
    let currentHeight = height;
    if (currentHeight < img.offsetHeight) {
      setHeight(img.offsetHeight);
    }
  };

  const handleIsSell = () => {
    if (typeExplorer === "nfts") return false;
    if (type !== "explore") return true;
    else return true;
  };

  useEffect(() => {
    setPackagesArr(packages);

    switch (type) {
      case "myNfts":
        setNFTs(myNfts);
        break;

      case "myOnSaleNfts":
        setNFTs(myNfts);
        break;

      case "myOnRentNfts":
        setNFTs(myNfts);
        break;

      case "myFavoritesNfts":
        setNFTs(myNfts);
        break;

      default:
        setNFTs(filteredNfts);
        break;
    }
  }, [filteredNfts, packages, myNfts]);

  useEffect(() => {
    if (typeExplorerAux !== typeExplorer) {
      setIsLoading(true);
      setTypeExplorer(typeExplorerAux);

      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  }, [typeExplorerAux]);

  return (
    <div className="row height100VH">
      {isLoading ? (
        <Loading />
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
                />
              ))
            : nfts?.map((nft, index) => (
                <NftCard
                  item={nft}
                  typeExplorer={typeExplorer}
                  key={index}
                  onImgLoad={onImgLoad}
                  height={height}
                  sell={handleIsSell()}
                />
              ))}
        </>
      )}
    </div>
  );
};

export default memo(ColumnNewRedux);
