import React, { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRarity } from "../../redux/actions";
import ColumnNewRedux from "../components/ColumnNewRedux";
import Footer from "../components/footer";

//IMPORT DYNAMIC STYLED COMPONENT
import { StyledHeader } from "../Styles";
//SWITCH VARIABLE FOR PAGE STYLE
const theme = "GREY"; //LIGHT, GREY, RETRO

const Colection = function () {
  const dispatch = useDispatch();

  const accountState = useSelector((state) => state.account);
  const myNftsState = useSelector((state) => state.myNfts);

  const [account, setAccount] = useState(accountState);
  const [myNfts, setMyNfts] = useState(myNftsState);

  useEffect(() => {
    setAccount(accountState);
    setMyNfts(myNftsState);
  }, [accountState, myNftsState]);

  const [openMenu, setOpenMenu] = useState(true);
  const [openMenu1, setOpenMenu1] = useState(false);
  const [openMenu2, setOpenMenu2] = useState(false);
  const [openMenu3, setOpenMenu3] = useState(false);

  const handleBtnClick = () => {
    setOpenMenu(!openMenu);
    setOpenMenu1(false);
    setOpenMenu2(false);
    setOpenMenu3(false);
    document.getElementById("Mainbtn").classList.add("active");
    document.getElementById("Mainbtn1").classList.remove("active");
    /* document.getElementById("Mainbtn2").classList.remove("active"); */
    document.getElementById("Mainbtn3").classList.remove("active");
  };

  const handleBtnClick1 = () => {
    setOpenMenu1(!openMenu1);
    setOpenMenu(false);
    setOpenMenu2(false);
    setOpenMenu3(false);
    document.getElementById("Mainbtn1").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
    /* document.getElementById("Mainbtn2").classList.remove("active"); */
    document.getElementById("Mainbtn3").classList.remove("active");
  };

  const handleBtnClick2 = () => {
    setOpenMenu2(!openMenu2);
    setOpenMenu(false);
    setOpenMenu1(false);
    setOpenMenu3(false);

    document.getElementById("Mainbtn2").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
    document.getElementById("Mainbtn1").classList.remove("active");
    document.getElementById("Mainbtn3").classList.remove("active");
  };

  const handleBtnClick3 = () => {
    setOpenMenu3(!openMenu3);
    setOpenMenu(false);
    setOpenMenu1(false);
    setOpenMenu2(false);

    document.getElementById("Mainbtn3").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
    document.getElementById("Mainbtn1").classList.remove("active");
    /* document.getElementById("Mainbtn2").classList.remove("active"); */
  };

  const handleCopyClipboard = () => {
    navigator.clipboard.writeText(account);
  };

  useEffect(() => {
    dispatch(getRarity());
  }, [dispatch]);

  return (
    <div className="greyscheme">
      <StyledHeader theme={theme} />
      <section className="container d_coll no-bottom">
        <div className="row">
          <div className="col-md-12">
            <div className="d_profile">
              <div className="profile_avatar">
                <div className="profile_name">
                  <h4>
                    <p>My Account</p>
                    <div className="clearfix"></div>

                    <span id="wallet" className="profile_wallet">
                      {account ? account : "Connect your Wallet"}
                    </span>

                    <button
                      id="btn_copy"
                      title="Copy Text"
                      onClick={handleCopyClipboard}
                    >
                      Copy
                    </button>
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container no-top">
        <div className="row">
          <div className="col-lg-12">
            <div className="items_filter">
              <ul className="de_nav">
                <li id="Mainbtn" className="active">
                  <span onClick={handleBtnClick}>Owned</span>
                </li>

                <li id="Mainbtn1" className="">
                  <span onClick={handleBtnClick1}>On Sale</span>
                </li>

                {/* <li id="Mainbtn2" className="">
                  <span onClick={handleBtnClick2}>On Rent</span>
                </li> */}

                <li id="Mainbtn3" className="">
                  <span onClick={handleBtnClick3}>My Favorites</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {openMenu && myNfts.length ? (
          <div id="zero1" className="onStep fadeIn">
            <ColumnNewRedux type="myNfts" />
          </div>
        ) : null}

        {openMenu1 && myNfts.length ? (
          <div id="zero2" className="onStep fadeIn">
            <ColumnNewRedux type="myOnSaleNfts" />
          </div>
        ) : null}

        {/* {openMenu2 && myNfts.length ? (
          <div id="zero3" className="onStep fadeIn">
            <ColumnNewRedux type="myOnRentNfts"/>
          </div>
        ): null} */}

        {openMenu3 && myNfts.length ? (
          <div id="zero4" className="onStep fadeIn">
            <ColumnNewRedux type="myFavoritesNfts" />
          </div>
        ) : null}

        {!myNfts.length || !account ? (
          <div id="zero5" className="onStep fadeIn">
            <div className="d-flex justify-content-center align-items-center flex-column">
              <h1>No NFTs found</h1>
              <p>Connect your wallet or buy new nfts</p>
            </div>
          </div>
        ) : null}
      </section>

      <Footer />
    </div>
  );
};
export default memo(Colection);
