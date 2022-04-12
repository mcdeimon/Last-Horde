import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { carouselNew5 } from "./constants";
import { Link } from "@reach/router";

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

const CarouselNewRedux = ({ allOrSale }) => {
  const nftsState = useSelector((state) => state.nfts);

  const [nfts, setNFTs] = useState([]);
  const [height, setHeight] = useState(0);

  const onImgLoad = ({ target: img }) => {
    let currentHeight = height;
    if (currentHeight < img.offsetHeight) {
      setHeight(img.offsetHeight);
    }
  };

  useEffect(() => {
    if (allOrSale === "all") setNFTs(nftsState);
    else setNFTs(nftsState);
  }, [nftsState, allOrSale]);

  return (
    <div className="nft">
      <Slider {...carouselNew5}>
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

                    <div className="nft__item_like">
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
