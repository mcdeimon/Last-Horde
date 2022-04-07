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
        <div className="row">
          <div className="col-md-3 col-sm-6 col-xs-1">
            <div className="widget">
              <img
                width="205"
                height="58"
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
              <h3>LATEST NEWS</h3>

              <ul>
                <li>
                  <a
                    to="https://medium.com/@lasthorde/lets-talk-about-security-b94486011850"
                    target="_blank"
                  >
                    Let’s talk about security?
                  </a>
                </li>

                <li>
                  <a
                    to="https://medium.com/@lasthorde/next-steps-after-the-ido-833f65422676"
                    target="_blank"
                  >
                    Next steps after the IDO
                  </a>
                </li>

                <li>
                  <a
                    to="https://medium.com/@lasthorde/next-steps-after-the-ido-833f65422676"
                    target="_blank"
                  >
                    About Last Horde
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-md-3 col-sm-6 col-xs-1">
            <div className="widget">
              <h3>INFORMATION</h3>

              <ul>
                <li>
                  <a
                    to="https://lasthorde.com/docs/Whitepaper-V1.11.pdf"
                    target="_blank"
                  >
                    Whitepaper
                  </a>
                </li>

                <li>
                  <a to="https://lasthorde.com/privacy-policy/" target="_blank">
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
                to="https://www.youtube.com/channel/UCiCG9a0u-DvJR8HoudRXDdg"
                target="_blank"
              >
                <i className="fa fa-youtube fa-lg"></i>
              </a>

              <a to="https://t.me/lasthorde" target="_blank">
                <i className="fa fa-telegram fa-lg"></i>
              </a>

              <a to="https://twitter.com/LastHorde" target="_blank">
                <i className="fa fa-twitter fa-lg"></i>
              </a>

              <a to="https://www.facebook.com/lasthordegame/" target="_blank">
                <i className="fa fa-facebook fa-lg"></i>
              </a>

              <a
                to="https://www.linkedin.com/company/last-horde/"
                target="_blank"
              >
                <i className="fa fa-linkedin fa-lg"></i>
              </a>

              <a to="https://medium.com/@lasthorde/" target="_blank">
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
                  <span>
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
                  </span>
                </div>

                <div className="de-flex-col">
                  <span>
                    <span className="copy">
                      &copy; Copyright Last Horde. All rights reserved.
                    </span>
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
