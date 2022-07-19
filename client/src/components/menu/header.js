import React, { useEffect, useState } from "react";
import { Link } from "@reach/router";
import { useDispatch, useSelector } from "react-redux";
import { getAccount, resetAccount } from "../../redux/actions";
import Breakpoint, {
  BreakpointProvider,
  setDefaultBreakpoints,
} from "react-socks";

// Set default breakpoints
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

  // Get params from global store
  const accountState = useSelector((state) => state.account);

  // Extra data of the NFT or PACKAGE
  const [account, setAccount] = useState(accountState);
  const [showmenu, btn_icon] = useState(false);

  // Function to load in the store the account
  useEffect(() => {
    setAccount(accountState);
  }, [accountState]);

  // Function to set the account
  const handleConnectWallet = () => {
    if (!account) dispatch(getAccount());
    else dispatch(resetAccount());
  };

  // Function to set styles of the menu
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
                  {/* Big logo */}
                  <img
                    src="/img/logolight.png"
                    className="navbarImg d-inline"
                    alt="Logo"
                    id="logo"
                  />

                  {/* Small logo */}
                  <img
                    src="/img/logolightSmall.png"
                    className="navbarImg d-none"
                    alt="Logo"
                    id="logoSmall"
                  />
                </NavLink>
              </div>
            </div>

            <BreakpointProvider>
              {/* Menu in xl size */}
              <Breakpoint xl>
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
                      <NavLink to="/stake">
                        <p className="navbarLink">Stake</p>
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </Breakpoint>
            </BreakpointProvider>
          </div>

          <div className="navbarContainerItems">
            <BreakpointProvider>
              {/* Menu in xl size */}
              <Breakpoint xl>
                <ul className="navbarList">
                  <li className="navbarListItem">
                    <NavLink to="/old-token">
                      <p className="navbarLink">Old Token</p>
                    </NavLink>
                  </li>

                  <li className="navbarListItem">
                    <NavLink to="/my-account">
                      <p className="navbarLink">Account</p>
                    </NavLink>
                  </li>
                </ul>
              </Breakpoint>
            </BreakpointProvider>

            <div className="mainside">
              <div className="connect-wal" onClick={handleConnectWallet}>
                <p to="">{account ? "Disconnect" : "Connect Wallet"}</p>
              </div>
            </div>

            <button className="nav-icon" onClick={() => btn_icon(!showmenu)}>
              <div className="menu-line white"></div>
              <div className="menu-line1 white"></div>
              <div className="menu-line2 white"></div>
            </button>
          </div>

          <BreakpointProvider>
            {/* Menu in l size */}
            <Breakpoint l down>
              {showmenu && (
                <div className="navbarContainerItemsSmall">
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
                      <NavLink to="/stake">
                        <p className="navbarLink">Stake</p>
                      </NavLink>
                    </li>

                    <li className="navbarListItem">
                      <NavLink to="/old-token">
                        <p className="navbarLink">Old Token</p>
                      </NavLink>
                    </li>

                    <li className="navbarListItem">
                      <NavLink to="/my-account">
                        <p className="navbarLink">Account</p>
                      </NavLink>
                    </li>
                  </ul>
                </div>
              )}
            </Breakpoint>
          </BreakpointProvider>
        </div>
      </div>
    </header>
  );
};
export default Header;
