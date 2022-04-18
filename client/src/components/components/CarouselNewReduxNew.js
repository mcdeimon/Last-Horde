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

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

const { REACT_APP_HOST_DB } = process.env;

const CarouselNewRedux = ({ allOrSale }) => {
  const dispatch = useDispatch();

  const nftsState = useSelector((state) => state.nfts);
  const myFavoritesState = useSelector((state) => state.myFavorites);
  const contractState = useSelector((state) => state.contract);
  const accountState = useSelector((state) => state.account);

  const [nfts, setNFTs] = useState([]);
  const [height, setHeight] = useState(0);
  const [account, setAccount] = useState(accountState);
  const [myFavorites, setMyFavorites] = useState(myFavoritesState);

  const onImgLoad = ({ target: img }) => {
    let currentHeight = height;
    if (currentHeight < img.offsetHeight) {
      setHeight(img.offsetHeight);
    }
  };

  const handleLike = async (id) => {
    if (account) {
      if (myFavorites.find((nft) => nft.id === id))
        await axios
          .delete(
            `https://${REACT_APP_HOST_DB}/account/${account}/id_nft/${id}`
          )
          .then(() => dispatch(getMyFavorites()));
      else
        await axios
          .post(
            `https://${REACT_APP_HOST_DB}/account/${account}/id_nft/${id}/contract/${contractState}`
          )
          .then(() => dispatch(getMyFavorites()));
    }
  };

  useEffect(() => {
    setAccount(accountState);
    setMyFavorites(myFavoritesState);
  }, [accountState, myFavoritesState]);

  useEffect(() => {
    if (allOrSale === "all") setNFTs(nftsState.slice(-20));
    else setNFTs(nftsState);
  }, [nftsState, allOrSale]);

  return (
    <div className="nft">
      <Slider
        {...{
          ...carouselNew5,
          autoplaySpeed: allOrSale === "all" ? 3000 : 4000,
          prevArrow: <Arrow leftOrRighr="left" isBlack={true} />,
          nextArrow: <Arrow leftOrRighr="right" isBlack={true} />,
        }}
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
                        <Link to={`/detail/${nft.id}`}>
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
                          <Link to={`/detail/${nft.id}`}>
                            <h4>{nft.name}</h4>
                          </Link>
                        </span>

                        <div className="nft__item_price">10000 HOR</div>

                        <div className="nft__item_action">
                          <Link to={`/detail/${nft.id}`}>
                            <span>Buy now</span>
                          </Link>
                        </div>
                      </>
                    )}

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
