import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaCopy } from "react-icons/fa";

const Footer = () => {
  const contractState = useSelector((state) => state.contract);

  const [contract, setContract] = useState(contractState);

  useEffect(() => {
    setContract(contractState);
  }, [contractState]);

  const handleCopyClipboard = () => {
    navigator.clipboard.writeText(contract);
  };

  const truncateContract = () => {
    if (contract.length > 12) {
      return `${contract.slice(0, 7)}...${contract.slice(-7)}`;
    }
    return contract;
  };

  return (
    <footer className="footer-light">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-3 col-sm-6 col-xs-1 me-xl-5">
            <div className="widget">
              <img
                width="205"
                src="/img/logolight.png"
                alt="Logo"
                className="footerLogo"
              />

              <p>
                Last Horde is a fantasy card game based on NFT technology that
                runs on the Binance Smart Chain (BSC) network. The game uses the
                Unity engine to offer an immersive gaming experience where
                players must face off in duels using their cards.
              </p>
            </div>
          </div>

          <div className="col-md-3 col-sm-6 col-xs-1">
            <div className="widget">
              <h3>INFORMATION</h3>

              <ul>
                <li>
                  <a
                    href="https://lasthorde.com/docs/Whitepaper-V1.11.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Whitepaper
                  </a>
                </li>

                <li>
                  <a
                    href="https://lasthorde.com/privacy-policy/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-md-3 col-sm-6 col-xs-1">
            <div className="widget">
              <h3>FOLLOW US</h3>

              <a
                href="https://www.youtube.com/channel/UCiCG9a0u-DvJR8HoudRXDdg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-youtube fa-lg"></i>
              </a>

              <a
                href="https://t.me/lasthorde"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-telegram fa-lg"></i>
              </a>

              <a
                href="https://twitter.com/LastHorde"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-twitter fa-lg"></i>
              </a>

              <a
                href="https://www.facebook.com/lasthordegame/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-facebook fa-lg"></i>
              </a>

              <a
                href="https://www.linkedin.com/company/last-horde/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-linkedin fa-lg"></i>
              </a>

              <a
                href="https://medium.com/@lasthorde/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-medium fa-lg"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="subfooter">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="de-flex">
                <div className="de-flex-col">
                  <span className="contract">
                    HOR Contract:
                    <img
                      width="24"
                      height="24"
                      src="/logo-1.png"
                      alt="HOR Contract"
                    />
                    {truncateContract()}
                    <FaCopy onClick={handleCopyClipboard} />
                    <img
                      width="24"
                      height="24"
                      src="/metamask-icon.png"
                      alt="Add to Metamask"
                    />
                  </span>
                </div>

                <div className="de-flex-col">
                  <span className="copy">
                    &copy; Copyright Last Horde. All rights reserved.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
