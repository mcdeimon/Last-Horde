import React, { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterType, getOnSell, getRarity } from "../../redux/actions";
import ColumnNewRedux from "../components/ColumnNewRedux";
import Footer from "../components/footer";

//IMPORT DYNAMIC STYLED COMPONENT
import { StyledHeader } from "../Styles";
//SWITCH VARIABLE FOR PAGE STYLE
const theme = "GREY"; //LIGHT, GREY, RETRO

const Colection = function () {
  const dispatch = useDispatch();

  // Get params from global store
  const accountState = useSelector((state) => state.account);
  const myNftsState = useSelector((state) => state.myNfts);
  const myFavoritesNftsState = useSelector((state) => state.myFavorites);
  const myOnSaleState = useSelector((state) => state.myOnSales);

  // Extra data of the NFT or PACKAGE
  const [account, setAccount] = useState(accountState);
  const [myNfts, setMyNfts] = useState(myNftsState);
  const [myFavoritesNfts, setMyFavoritesNfts] = useState(myFavoritesNftsState);
  const [myOnSale, setMyOnSale] = useState(myOnSaleState);

  // Function to load in the store the NFTs and PACKAGES
  useEffect(() => {
    setAccount(accountState);
    setMyNfts(myNftsState);
    setMyFavoritesNfts(myFavoritesNftsState);
    setMyOnSale(myOnSaleState);
  }, [accountState, myNftsState, myFavoritesNftsState, myOnSaleState]);

  // Variable to show the nfts
  const [openMenu, setOpenMenu] = useState(true);
  const [openMenu1, setOpenMenu1] = useState(false);
  const [openMenu2, setOpenMenu2] = useState(false);
  const [openMenu3, setOpenMenu3] = useState(false);

  // Function to show the nfts
  const handleBtnClick = (btn) => {
    setOpenMenu(btn === 0 && true);
    setOpenMenu1(btn === 1 && true);
    setOpenMenu2(btn === 2 && true);
    setOpenMenu3(btn === 3 && true);

    document.getElementById("Mainbtn0").classList.remove("active");
    document.getElementById("Mainbtn1").classList.remove("active");
    /* document.getElementById("Mainbtn2").classList.remove("active"); */
    document.getElementById("Mainbtn3").classList.remove("active");

    document.getElementById(`Mainbtn${btn}`).classList.add("active");
  };

  // Function to copy the address to the clipboard
  const handleCopyClipboard = () => {
    navigator.clipboard.writeText(account);
  };

  // Function to load in the store the NFTs and PACKAGES
  useEffect(() => {
    dispatch(getOnSell());
    dispatch(getRarity());
    dispatch(filterType("nfts"));
  }, [dispatch]);

  return (
    <div className="greyscheme">
      {/* Theme */}
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
                      {/* Cuenta */}
                      {account ? account : "Connect your Wallet"}
                    </span>

                    {/* Boton for copy the address to the clipboard */}
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
                <li id="Mainbtn0" className="active">
                  {/* Btn to show My NFTs */}
                  <span onClick={() => handleBtnClick(0)}>Owned</span>
                </li>

                <li id="Mainbtn1" className="">
                  {/* Btn to show My NFTs on sale */}
                  <span onClick={() => handleBtnClick(1)}>On Sale</span>
                </li>

                {/* <li id="Mainbtn2" className="">
                  <span onClick={() => handleBtnClick(2)}>On Rent</span>
                </li> */}

                <li id="Mainbtn3" className="">
                  {/* Btn to show My favorite NFTs */}
                  <span onClick={() => handleBtnClick(3)}>My Favorite</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {openMenu && myNfts.length ? (
          <div id="zero1" className="onStep fadeIn">
            {/* Show my NFTs */}
            <ColumnNewRedux type="myNfts" />
          </div>
        ) : openMenu1 && myOnSale.length ? (
          <div id="zero2" className="onStep fadeIn">
            {/* Show my NFTs on sale */}
            <ColumnNewRedux type="myOnSaleNfts" />
          </div>
        ) : openMenu2 && myNfts.length ? (
          <div id="zero3" className="onStep fadeIn">
            {/* Show my NFTs on rent */}
            <ColumnNewRedux type="myOnRentNfts" />
          </div>
        ) : openMenu3 && myFavoritesNfts.length ? (
          <div id="zero4" className="onStep fadeIn">
            {/* Show my favorite NFTs */}
            <ColumnNewRedux type="myFavoritesNfts" />
          </div>
        ) : !myNfts.length || !myFavoritesNfts.length || !account ? (
          <div id="zero5" className="onStep fadeIn">
            <div className="d-flex justify-content-center align-items-center flex-column">
              <h1>No NFTs found</h1>
              <p>Connect your wallet or buy new nfts</p>
            </div>
          </div>
        ) : null}
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};
export default memo(Colection);
