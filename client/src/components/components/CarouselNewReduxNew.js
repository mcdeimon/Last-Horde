import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { carouselNew5 } from "./constants";
import { Link } from "@reach/router";
import { getMyFavorites } from "../../redux/actions";
import axios from "axios";
import Arrow from "./ArrowCarrousel";
import { address as addressNft } from "../../contracts/ContractNfts";
import { web3 } from "../../utils/web3";

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

const { REACT_APP_HOST_DB } = process.env;

const CarouselNewRedux = ({ allOrSale }) => {
  const dispatch = useDispatch();

  // Get params from global store
  const nftsState = useSelector((state) => state.nfts);
  const myFavoritesState = useSelector((state) => state.myFavorites);
  const accountState = useSelector((state) => state.account);
  const onSale = useSelector((state) => state.onSale);

  // Extra data of the NFT or PACKAGE
  const [nfts, setNFTs] = useState([]);
  const [height, setHeight] = useState(0);
  const [account, setAccount] = useState(accountState);
  const [myFavorites, setMyFavorites] = useState(myFavoritesState);

  // Function set img height
  const onImgLoad = ({ target: img }) => {
    let currentHeight = height;
    if (currentHeight < img.offsetHeight) {
      setHeight(img.offsetHeight);
    }
  };

  // Function to set like or unlike
  const handleLike = async (id) => {
    if (account) {
      if (myFavorites.find((nft) => nft.id === id))
        await axios
          .delete(`http://${REACT_APP_HOST_DB}/account/${account}/id_nft/${id}`)
          .then(() => dispatch(getMyFavorites()));
      else
        await axios
          .post(
            `http://${REACT_APP_HOST_DB}/account/${account}/id_nft/${id}/contract/${addressNft}`
          )
          .then(() => dispatch(getMyFavorites()));
    }
  };

  // Function to load in the store the favorites of the user
  useEffect(() => {
    setAccount(accountState);
    setMyFavorites(myFavoritesState);
  }, [accountState, myFavoritesState]);

  // Function to show the NFT or NFT on sale
  useEffect(() => {
    if (allOrSale === "all") setNFTs(nftsState.slice(-20));
    else setNFTs(onSale);
  }, [nftsState, allOrSale, onSale]);

  // Function to convert price to HOR
  const fromWei = (price) => {
    if (price) return `${web3.utils.fromWei(`${price}`, "ether")} HOR`;
    else return "Calculating...";
  };

  return (
    <div className="nft">
      <Slider
        {...{
          ...carouselNew5,
          autoplaySpeed: allOrSale === "all" ? 3000 : 4000,
          prevArrow: <Arrow leftOrRighr="left" isBlack={true} />,
          nextArrow: <Arrow leftOrRighr="right" isBlack={true} />,
        }} /* Settings for the slider */
      >
        {nfts &&
          nfts.map((nft, index) => (
            <div className="itm" index={index + 1} key={index}>
              <div className="d-item">
                <div className="nft__item">
                  <div
                    className="nft__item_wrap"
                    style={{ height: `${height}px` }}
                  >
                    <Outer>
                      <span>
                        <Link
                          to={
                            nft?.order_id
                              ? `detail/${nft?.id}?order_id=${nft?.order_id}`
                              : `detail/${nft?.id}`
                          }
                        >
                          <img
                            src={nft.image}
                            className="lazy nft__item_preview"
                            onLoad={onImgLoad}
                            alt=""
                          />
                        </Link>
                      </span>
                    </Outer>
                  </div>

                  <div className="nft__item_info">
                    {allOrSale !== "all" && (
                      <>
                        <span>
                          <Link
                            to={
                              nft?.order_id
                                ? `detail/${nft?.id}?order_id=${nft?.order_id}`
                                : `detail/${nft?.id}`
                            }
                          >
                            <h4>{nft.name}</h4>
                          </Link>
                        </span>

                        <div className="nft__item_price">
                          {fromWei(nft.price)}
                        </div>

                        <div className="nft__item_action">
                          <Link
                            to={
                              nft?.order_id
                                ? `detail/${nft?.id}?order_id=${nft?.order_id}`
                                : `detail/${nft?.id}`
                            }
                          >
                            <span>Buy now</span>
                          </Link>
                        </div>
                      </>
                    )}

                    {/* I like heart */}
                    <div
                      className={`nft__item_like ${
                        myFavorites.find((item) => item.id === nft.id)
                          ? "likedHeart"
                          : ""
                      }`}
                      onClick={() => handleLike(nft.id)}
                    >
                      <i className="fa fa-heart"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default memo(CarouselNewRedux);
