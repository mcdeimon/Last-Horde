import React, { useEffect } from "react";
import SliderMain from "../components/SliderCarouselNew";
import CarouselCollectionRedux from "../components/CarouselCollectionReduxNew";
import CarouselNewRedux from "../components/CarouselNewReduxNew";
import AuthorListRedux from "../components/AuthorListRedux";
import Catgor from "../components/Catgor";
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
        <div className="container">
          <div className="row">
            <SliderMain />
          </div>
        </div>
      </section>

      {/* <section className="container no-bottom">
      <div className="row">
        <div className="col-lg-12">
          <div className="text-center">
            <h2>Hot Collections</h2>

            <div className="small-border"></div>
          </div>
        </div>

        <div className="col-lg-12">
          <CarouselCollectionRedux />
        </div>
      </div>
    </section> */}

      {/* <section className="container no-bottom">
      <div className="row">
        <div className="col-lg-12">
          <div className="text-center">
            <h2>New Items</h2>

            <div className="small-border"></div>
          </div>
        </div>

        <div className="col-lg-12">
          <CarouselNewRedux />
        </div>
      </div>
    </section> */}

      <Footer />
    </div>
  );
};
export default Home;
