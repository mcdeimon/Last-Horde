import React, { useEffect, useState } from "react";
import Breakpoint, {
  BreakpointProvider,
  setDefaultBreakpoints,
} from "react-socks";
//import { header } from 'react-bootstrap';
import { Link } from "@reach/router";
import useOnclickOutside from "react-cool-onclickoutside";
import { useDispatch, useSelector } from "react-redux";
import { getAccount, resetAccount } from "../../redux/actions";

setDefaultBreakpoints([{ xs: 0 }, { l: 1199 }, { xl: 1200 }]);

const NavLink = (props) => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      // the object returned here is passed to the
      // anchor element's props
      return {
        className: isCurrent ? "active" : "non-active",
      };
    }}
  />
);

const Header = function ({ className }) {
  const dispatch = useDispatch();

  const accountState = useSelector((state) => state.account);

  const [account, setAccount] = useState(accountState);

  useEffect(() => {
    setAccount(accountState);
  }, [accountState]);

  const [showmenu, btn_icon] = useState(false);
  const [showpop, btn_icon_pop] = useState(false);
  const [shownot, btn_icon_not] = useState(false);

  const closePop = () => {
    btn_icon_pop(false);
  };
  const closeNot = () => {
    btn_icon_not(false);
  };
  const refpop = useOnclickOutside(() => {
    closePop();
  });
  const refpopnot = useOnclickOutside(() => {
    closeNot();
  });

  const handleConnectWallet = () => {
    if (!account) dispatch(getAccount());
    else dispatch(resetAccount());
  };

  useEffect(() => {
    const header = document.getElementById("myHeader");
    const totop = document.getElementById("scroll-to-top");
    const sticky = header.offsetTop;
    const scrollCallBack = window.addEventListener("scroll", () => {
      btn_icon(false);
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
        totop.classList.add("show");
      } else {
        header.classList.remove("sticky");
        totop.classList.remove("show");
      }
    });
    return () => {
      window.removeEventListener("scroll", scrollCallBack);
    };
  }, []);
  return (
    <header className={`navbar white ${className}`} id="myHeader">
      <div className="container">
        <div className="row navbarContainer">
          <div className="navbarContainerItems">
            <div className="logo px-0">
              <div className="navbar-title navbar-item navbarContainerItems">
                <NavLink to="/">
                  <img
                    src="/img/logolight.png"
                    className="navbarImg"
                    alt="Logo"
                  />
                </NavLink>
              </div>
            </div>

            <div className="navbarContainerItems">
              <ul className="navbarList">
                <li className="navbarListItem">
                  <a href="https://lasthorde.com/">
                    <a className="navbarLink">Home</a>
                  </a>
                </li>

                <li className="navbarListItem">
                  <NavLink to="/">
                    <a className="navbarLink">Marketplace</a>
                  </NavLink>
                </li>

                <li className="navbarListItem">
                  <a href="https://app.lasthorde.com/stake">
                    <a className="navbarLink">Stake</a>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="navbarContainerItems">
            <ul className="navbarList">
              <li className="navbarListItem">
                <NavLink to="/explore">
                  <a className="navbarLink">Explore</a>
                </NavLink>
              </li>

              <li className="navbarListItem">
                <NavLink to="/my-account">
                  <a className="navbarLink">Account</a>
                </NavLink>
              </li>
            </ul>

            <div className="mainside">
              <div className="connect-wal" onClick={handleConnectWallet}>
                <p to="">{account ? "Disconnect" : "Connect Wallet"}</p>
              </div>
            </div>
          </div>
        </div>

        <button className="nav-icon" onClick={() => btn_icon(!showmenu)}>
          <div className="menu-line white"></div>
          <div className="menu-line1 white"></div>
          <div className="menu-line2 white"></div>
        </button>
      </div>
    </header>
  );
};
export default Header;
