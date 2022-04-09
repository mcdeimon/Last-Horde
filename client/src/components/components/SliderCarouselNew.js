import React, { Component, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Clock from "./Clock";
import { createGlobalStyle } from "styled-components";
import { useSelector } from "react-redux";
import { Link } from "@reach/router";

const GlobalStyles = createGlobalStyle`
  .nft-big .slick-prev::before{
    left: 0;
    line-height: 40px;
  }
  .nft-big .slick-next::before {
    right: 0;
    line-height: 40px;
  }
  .nft-big .slick-prev, .nft-big .slick-next{
    border: 1px solid #ccc;
    box-shadow: 5px 5px 30px 0px rgba(0, 0, 0, 0.2);
    width: 50px;
    height: 50px;
  }
`;

const CustomSlide = (propsAux) => {
  const { index, ...props } = propsAux;

  return <div {...props}></div>;
};

export default function Responsive() {
  const packagesState = useSelector((state) => state.packages);

  const [packages, setPackages] = React.useState([]);

  useEffect(() => {
    setPackages(packagesState);
  }, [packagesState]);

  const state = {
    deadline: "January, 10, 2022",
    deadline1: "February, 10, 2022",
    deadline2: "February, 1, 2022",
    height: 0,
  };

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    adaptiveHeight: 300,
    responsive: [
      {
        breakpoint: 1900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };

  return (
    <div className="nft-big">
      <GlobalStyles />

      <Slider {...settings}>
        {packages.map((item, index) => (
          <CustomSlide className="itm" index={index + 1}>
            <div className="nft__item_lg">
              <div className="row align-items-center">
                <div className="col-lg-5 d-flex justify-content-center">
                  <img src={item.image} className="img-fluid" alt="" />
                </div>

                <div className="col-lg-7">
                  <div className="d-desc">
                    <h2>Pack of {item.name}</h2>

                    <div className="d-attr">
                      <div className="col first">
                        <span className="d-title">Price</span>

                        <h4>{item.price} HOR</h4>
                      </div>

                      <div className="line"></div>

                      <div className="col pe-5">
                        <span className="d-title">Description</span>

                        <h4>{item.description}</h4>
                      </div>
                    </div>

                    <div className="spacer-10"></div>

                    <div className="d-buttons">
                      <Link to={`/detail/${index + 1}?package=true`}>
                        <span className="btn-main ">Buy now</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CustomSlide>
        ))}
      </Slider>
    </div>
  );
}
