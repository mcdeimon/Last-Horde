import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { navigate } from "@reach/router";
import axios from "axios";
import { getMyFavorites } from "../../redux/actions";
import { address as addressNft } from "../../contracts/ContractNfts";
import { web3 } from "../../utils/web3";

const { REACT_APP_HOST_DB } = process.env;

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
`;

//react functional component
const NftCard = ({ item, height, onImgLoad, typeExplorer, sell = true }) => {
  const dispatch = useDispatch();

  // Get params from global store
  const accountState = useSelector((state) => state.account);
  const myFavoritesState = useSelector((state) => state.myFavorites);

  // Extra data of the NFT or PACKAGE
  const [account, setAccount] = useState(accountState);
  const [myFavorites, setMyFavorites] = useState(myFavoritesState);
  const [price, setPrice] = useState(0);

  // Function to load in the store the favorites of the user
  useEffect(() => {
    setAccount(accountState);
    setMyFavorites(myFavoritesState);
  }, [accountState, myFavoritesState]);

  // Function to navigate to the NFT or PACKAGE
  const navigateTo = (link) => {
    navigate(link);
  };

  // Function to set like or unlike
  const handleLike = async () => {
    if (account) {
      if (myFavorites.find((nft) => nft.id === item.id))
        await axios
          .delete(
            `${REACT_APP_HOST_DB}/account/${account}/id_nft/${item.id}`
          )
          .then(() => dispatch(getMyFavorites()));
      else
        await axios
          .post(
            `${REACT_APP_HOST_DB}/account/${account}/id_nft/${item.id}/contract/${addressNft}`
          )
          .then(() => dispatch(getMyFavorites()));
    }
  };

  // Function to set the price of the NFT or PACKAGE
  useEffect(() => {
    async function setPriceFromWei() {
      if (item?.price)
        setPrice(await web3.utils.fromWei(`${item.price}`, "ether"));
    }

    setPriceFromWei();
  }, [item]);

  return (
    <div className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4">
      <div className="nft__item m-0">
        <div
          className="nft__item_wrap minHeight300"
          style={{ minHeight: `${height}px` }}
        >
          <Outer>
            <span>
              <img
                onLoad={onImgLoad}
                src={item?.image}
                className="lazy nft__item_preview"
                alt=""
                onClick={() =>
                  navigateTo(
                    typeExplorer === "packages"
                      ? `detail/${item?.id}?package=true`
                      : item?.order_id
                      ? `detail/${item?.id}?order_id=${item?.order_id}`
                      : `detail/${item?.id}`
                  )
                }
              />
            </span>
          </Outer>
        </div>

        <div className={`nft__item_info ${sell && "m-1"}`}>
          <span
            onClick={() =>
              navigateTo(
                typeExplorer === "packages"
                  ? `detail/${item?.id}?package=true`
                  : item?.order_id
                  ? `detail/${item?.id}?order_id=${item?.order_id}`
                  : `detail/${item?.id}`
              )
            }
          >
            <h4>{item?.name}</h4>
          </span>

          {sell && (
            <>
              <div className="nft__item_price">
                {price ? `${price} HOR` : "Computing the price"}
              </div>

              <div className="nft__item_action">
                <span
                  onClick={() =>
                    navigateTo(
                      typeExplorer === "packages"
                        ? `detail/${item?.id}?package=true`
                        : item?.order_id
                        ? `detail/${item?.id}?order_id=${item?.order_id}`
                        : `detail/${item?.id}`
                    )
                  }
                >
                  Buy Now
                </span>
              </div>
            </>
          )}

          {typeExplorer !== "packages" && (
            /* I like heart */
            <div
              className={`nft__item_like ${
                myFavorites.find((nft) => nft.id === item.id)
                  ? "likedHeart"
                  : ""
              }`}
              onClick={handleLike}
            >
              <i className="fa fa-heart"></i>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(NftCard);
