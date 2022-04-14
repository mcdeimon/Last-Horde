import React, { useEffect, useState } from "react";
import ColumnNewRedux from "../components/ColumnNewRedux";
import Footer from "../components/footer";
import TopFilterBar from "../components/TopFilterBar";
//IMPORT DYNAMIC STYLED COMPONENT
import { StyledHeader } from "../Styles";
import {
  getAllNFT,
  getPackages,
  getRarity,
  isLoadingFunction,
} from "../../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
//SWITCH VARIABLE FOR PAGE STYLE
const theme = "GREY"; //LIGHT, GREY, RETRO

const Explore = () => {
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
        className="jumbotron breadcumb no-bg"
        style={{ backgroundImage: `url(${"./img/background/backHeader.jpg"})` }}
      >
        <div className="mainbreadcumb">
          <div className="container">
            <div className="row m-10-hor">
              <div className="col-12">
                <h1 className="text-center exploreText">Explore</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="row">
          <div className="col-lg-12">
            <TopFilterBar />
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            {isLoading ? <Loading /> : <ColumnNewRedux type="explore" />}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
export default Explore;
