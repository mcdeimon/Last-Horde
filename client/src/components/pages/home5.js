import React, { useEffect } from "react";
import SliderMain from "../components/SliderCarouselNew";
import CarouselNewRedux from "../components/CarouselNewReduxNew";
import Footer from "../components/footer";
import { StyledHeader } from "../Styles";
import { useDispatch } from "react-redux";
import {
  getAllNFT,
  getPackages,
  getRarity,
  isLoadingFunction,
} from "../../redux/actions";

const theme = "GREY";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isLoadingFunction(true));
    dispatch(getAllNFT());
    dispatch(getPackages());
    dispatch(getRarity());
  }, [dispatch]);

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

      <Footer />
    </div>
  );
};
export default Home;
