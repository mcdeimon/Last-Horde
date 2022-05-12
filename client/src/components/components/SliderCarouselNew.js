import React, { useEffect, useState } from "react";
import { createGlobalStyle } from "styled-components";
import { useSelector } from "react-redux";
import { Link } from "@reach/router";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Arrow from "./ArrowCarrousel";
import { web3 } from "../../utils/web3";

// Set global styles
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
  // Get params from global store
  const packagesState = useSelector((state) => state.packages);

  // Extra data of the PACKAGE
  const [packages, setPackages] = useState([]);
  const [priceArr, setPriceArr] = useState([]);

  // Function to load in the store the packages
  useEffect(() => {
    setPackages(packagesState);

    // Set the price of the packages
    handleSetPrice(packagesState);
  }, [packagesState]);

  // Settings for the slider
  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 5000,
    adaptiveHeight: 300,
    cssEase: "linear",
    prevArrow: <Arrow leftOrRighr="left" />,
    nextArrow: <Arrow leftOrRighr="right" />,
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
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  const handleSetPrice = async (packagesArr) => {
    let priceAux = [];

    for (let i = 0; i < packagesArr.length; i++) {
      priceAux[i] = await web3.utils.fromWei(
        `${packagesArr[i].price}`,
        "ether"
      );
    }

    setPriceArr(priceAux);
  };

  return (
    <div className="nft-big mb-5">
      {/* Set global styles */}
      <GlobalStyles />

      <Slider {...settings}>
        {packages.map((item, index) => (
          <CustomSlide className="itm" index={index + 1} key={index}>
            <div className="nft__item_lg">
              <div className="row align-items-center">
                <div className="col-lg-5 d-flex justify-content-center">
                  <Link to={`/detail/${index + 1}?package=true`}>
                    <img src={item.image} className="img-fluid" alt="" />
                  </Link>
                </div>

                <div className="col-lg-7 ps-3">
                  <div className="d-desc">
                    <h2>Pack of {item.name}</h2>

                    <div className="d-attr">
                      <div className="col first">
                        <span className="d-title">Price</span>

                        <h4>
                          {priceArr[index]
                            ? `${priceArr[index]} HOR`
                            : "Calculating the price"}
                        </h4>
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
