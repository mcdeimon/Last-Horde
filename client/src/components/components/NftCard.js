import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { navigate } from "@reach/router";
import axios from "axios";
import { getMyFavorites } from "../../redux/actions";
import { address as addressNft } from "../../contracts/ContractNfts";

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

  const accountState = useSelector((state) => state.account);
  const myFavoritesState = useSelector((state) => state.myFavorites);

  const [account, setAccount] = useState(accountState);
  const [myFavorites, setMyFavorites] = useState(myFavoritesState);

  useEffect(() => {
    setAccount(accountState);
    setMyFavorites(myFavoritesState);
  }, [accountState, myFavoritesState]);

  const navigateTo = (link) => {
    navigate(link);
  };

  const handleLike = async () => {
    if (account) {
      if (myFavorites.find((nft) => nft.id === item.id))
        await axios
          .delete(
            `https://${REACT_APP_HOST_DB}/account/${account}/id_nft/${item.id}`
          )
          .then(() => dispatch(getMyFavorites()));
      else
        await axios
          .post(
            `https://${REACT_APP_HOST_DB}/account/${account}/id_nft/${item.id}/contract/${addressNft}`
          )
          .then(() => dispatch(getMyFavorites()));
    }
  };

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
                    `detail/${item?.id}${
                      typeExplorer === "packages" ? "?package=true" : ""
                    }`
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
                `detail/${item?.id}${
                  typeExplorer === "packages" ? "?package=true" : ""
                }`
              )
            }
          >
            <h4>{item?.name}</h4>
          </span>

          {sell && (
            <>
              <div className="nft__item_price">{item?.price || "1000"} HOR</div>

              <div className="nft__item_action">
                <span
                  onClick={() =>
                    navigateTo(
                      `detail/${item?.id}${
                        typeExplorer === "packages" ? "?package=true" : ""
                      }`
                    )
                  }
                >
                  Buy Now
                </span>
              </div>
            </>
          )}

          {typeExplorer !== "packages" && (
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
