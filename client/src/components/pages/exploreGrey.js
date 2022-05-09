import React, { useEffect, useState } from "react";
import ColumnNewRedux from "../components/ColumnNewRedux";
import Footer from "../components/footer";
import TopFilterBar from "../components/TopFilterBar";
import { StyledHeader } from "../Styles";
import {
  getAllNFT,
  getOnSell,
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

  // Get params from global store
  const filteredNfts = useSelector((state) => state.filteredNfts);

  // Extra data of the NFT or PACKAGE
  const [nfts, setNFTs] = useState([]);
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
  }, [filteredNfts]);

  // Function to set the loading state
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
            {/* Filters */}
            <TopFilterBar />
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            {/* Show all nfts or packages */}
            {isLoading ? <Loading /> : <ColumnNewRedux type="explore" />}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};
export default Explore;
