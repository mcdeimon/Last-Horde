import React, { useEffect, useState } from "react";
import SliderMain from "../components/SliderCarouselNew";
import CarouselNewRedux from "../components/CarouselNewReduxNew";
import Footer from "../components/footer";
import { StyledHeader } from "../Styles";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllNFT,
  getOnSell,
  getPackages,
  getRarity,
  isLoadingFunction,
} from "../../redux/actions";
import Loading from "../components/Loading";

//SWITCH VARIABLE FOR PAGE STYLE
const theme = "GREY"; //LIGHT, GREY, RETRO

const Home = () => {
  const dispatch = useDispatch();

  // Get params from global store
  const filteredNfts = useSelector((state) => state.filteredNfts);
  const onSaleState = useSelector((state) => state.onSale);

  // Extra data of the NFT or PACKAGE
  const [nfts, setNFTs] = useState([]);
  const [onSale, setOnSale] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Function to load in the store the NFTs and PACKAGES
  useEffect(() => {
    dispatch(isLoadingFunction(true));
    dispatch(getAllNFT());
    dispatch(getPackages());
    dispatch(getRarity());
    dispatch(getOnSell());
  }, [dispatch]);

  // Function to set extra data
  useEffect(() => {
    setNFTs(filteredNfts);
    setOnSale(onSaleState);
  }, [filteredNfts, onSaleState]);

  // Function to set the loading state
  useEffect(() => {
    setTimeout(() => {
      if (nfts.length && onSale.length) setIsLoading(false);
      else setIsLoading(true);
    }, 3000);
  }, [nfts, onSale]);

  return (
    <div className="greyscheme">
      <StyledHeader theme={theme} />
      <section
        className="jumbotron breadcumb no-bg bwhite"
        style={{ backgroundImage: `url(${"./img/background/backHome.jpg"})` }}
      >
        <div className="container w-100">
          <div className="row">
            <SliderMain /> {/* Slider */}
          </div>
        </div>
      </section>

      <div className="homecarrousel">
        {isLoading ? (
          <Loading /> // Loading component
        ) : (
          <>
            <section className="container no-bottom">
              <div className="row">
                <div className="col-lg-12">
                  <div className="text-center">
                    <h2>Nfts on sale</h2>

                    <div className="small-border"></div>
                  </div>
                </div>

                <div className="col-lg-12 text-center">
                  {onSale?.length ? (
                    <CarouselNewRedux allOrSale="onSale" /> // Carousel with the NFTs on sale
                  ) : (
                    <h1>No nfts on sale</h1>
                  )}
                </div>
              </div>
            </section>

            <section className="container no-bottom">
              <div className="row">
                <div className="col-lg-12">
                  <div className="text-center">
                    <h2>All Nfts</h2>

                    <div className="small-border"></div>
                  </div>
                </div>

                <div className="col-lg-12">
                  {/* Carousel with all the NFTs*/}
                  <CarouselNewRedux allOrSale="all" />
                </div>
              </div>
            </section>
          </>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};
export default Home;
