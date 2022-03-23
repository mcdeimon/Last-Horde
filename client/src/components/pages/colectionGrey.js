import React, { memo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ColumnNewRedux from "../components/ColumnNewRedux";
import Footer from "../components/footer";
import * as selectors from "../../store/selectors";
import api from "../../core/api";

//IMPORT DYNAMIC STYLED COMPONENT
import { StyledHeader } from "../Styles";
//SWITCH VARIABLE FOR PAGE STYLE
const theme = "GREY"; //LIGHT, GREY, RETRO

const Colection = function ({ collectionId = 1 }) {
  const [openMenu, setOpenMenu] = React.useState(true);
  const [openMenu1, setOpenMenu1] = React.useState(false);
  const [openMenu2, setOpenMenu2] = React.useState(false);
  const [openMenu3, setOpenMenu3] = React.useState(false);

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
                      0x5d5484554d45454454554a544545749949518956285
                    </span>

                    <button id="btn_copy" title="Copy Text">
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

        {openMenu && (
          <div id="zero1" className="onStep fadeIn">
            <ColumnNewRedux />
          </div>
        )}

        {openMenu1 && (
          <div id="zero2" className="onStep fadeIn">
            <ColumnNewRedux />
          </div>
        )}

        {/* {openMenu2 && (
          <div id="zero2" className="onStep fadeIn">
            <ColumnNewRedux />
          </div>
        )} */}

        {openMenu3 && (
          <div id="zero2" className="onStep fadeIn">
            <ColumnNewRedux />
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};
export default memo(Colection);
