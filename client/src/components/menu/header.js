import React, { useEffect, useState } from "react";
import { Link } from "@reach/router";
import { useDispatch, useSelector } from "react-redux";
import { getAccount, resetAccount } from "../../redux/actions";

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

  const handleConnectWallet = () => {
    if (!account) dispatch(getAccount());
    else dispatch(resetAccount());
  };

  useEffect(() => {
    const header = document.getElementById("myHeader");
    const totop = document.getElementById("scroll-to-top");
    const sticky = header.offsetTop;
    const scrollCallBack = window.addEventListener("scroll", () => {
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
                    <p className="navbarLink">Home</p>
                  </a>
                </li>

                <li className="navbarListItem">
                  <NavLink to="/">
                    <p className="navbarLink">Marketplace</p>
                  </NavLink>
                </li>

                <li className="navbarListItem">
                  <a href="https://app.lasthorde.com/stake">
                    <p className="navbarLink">Stake</p>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="navbarContainerItems">
            <ul className="navbarList">
              <li className="navbarListItem">
                <NavLink to="/explore">
                  <p className="navbarLink">Explore</p>
                </NavLink>
              </li>

              <li className="navbarListItem">
                <NavLink to="/my-account">
                  <p className="navbarLink">Account</p>
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
      </div>
    </header>
  );
};
export default Header;
