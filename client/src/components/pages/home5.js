import React, { useEffect, useState } from "react";
import SliderMain from "../components/SliderCarouselNew";
import CarouselNewRedux from "../components/CarouselNewReduxNew";
import Footer from "../components/footer";
import { StyledHeader } from "../Styles";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllNFT,
  getPackages,
  getRarity,
  isLoadingFunction,
} from "../../redux/actions";
import Loading from "../components/Loading";

const theme = "GREY";

const Home = () => {
  const dispatch = useDispatch();

  const filteredNfts = useSelector((state) => state.filteredNfts);

  const [nfts, setNFTs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(isLoadingFunction(true));
    dispatch(getAllNFT());
    dispatch(getPackages());
    dispatch(getRarity());
  }, [dispatch]);

  useEffect(() => {
    setNFTs(filteredNfts);
  }, [filteredNfts]);

  useEffect(() => {
    setTimeout(() => {
      if (nfts.length) setIsLoading(false);
      else setIsLoading(true);
    }, 3000);
  }, [nfts]);

  return (
    <div className="greyscheme">
      <StyledHeader theme={theme} />
      <section
        className="jumbotron breadcumb no-bg bwhite"
        style={{ backgroundImage: `url(${"./img/background/backHome.jpg"})` }}
      >
        <div className="container w-100">
          <div className="row">
            <SliderMain />
          </div>
        </div>
      </section>

      <div className="homecarrousel">
        {isLoading ? (
          <Loading />
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

                <div className="col-lg-12">
                  <CarouselNewRedux allOrSale="onSale" />
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
                  <CarouselNewRedux allOrSale="all" />
                </div>
              </div>
            </section>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};
export default Home;
