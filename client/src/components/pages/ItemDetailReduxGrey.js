import React, { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Footer from "../components/footer";
import { IoGrid } from "react-icons/io5";
import { HiUsers } from "react-icons/hi";
import { FaShareSquare } from "react-icons/fa";

//IMPORT DYNAMIC STYLED COMPONENT
import { StyledHeader } from "../Styles";
import { getNFTById, getPackagesById, getRarity } from "../../redux/actions";
import { useParams } from "@reach/router";
import { useQuery } from "../../utils/useQuery";
//SWITCH VARIABLE FOR PAGE STYLE
const theme = "GREY"; //LIGHT, GREY, RETRO

const ItemDetailRedux = () => {
  const dispatch = useDispatch();

  const nftItem = useSelector((state) => state.nft);
  const packageItem = useSelector((state) => state.package);

  const { itemId } = useParams();
  const query = useQuery();

  const [item, setItem] = useState({});

  const [openCheckout, setOpenCheckout] = useState(false);
  const [openCheckoutbid, setOpenCheckoutbid] = useState(false);

  const handleCopyClipboard = () => {
    navigator.clipboard.writeText(
      `https://app.lasthorde.com/detail/${itemId}${
        query.get("package") ? "?package=true" : ""
      }`
    );
  };

  useEffect(() => {
    dispatch(getRarity());

    if (query.get("package")) dispatch(getPackagesById(itemId));
    else dispatch(getNFTById(itemId));
  }, [dispatch]);

  useEffect(() => {
    if (query.get("package")) setItem(packageItem);
    else setItem(nftItem);
  }, [nftItem, packageItem]);

  return (
    <div className="greyscheme">
      <StyledHeader theme={theme} />
      <section className="container">
        <div className="row mt-md-5 pt-md-4">
          <div className="col-md-6 text-center">
            <img src={item?.image} className="img-fluid img-rounded" alt="" />
          </div>

          <div className="col-md-6">
            <div className="item_info">
              <div className="item_title">
                <h2>{item?.name}</h2>
                <p>#{itemId}</p>
                <FaShareSquare onClick={handleCopyClipboard} />
              </div>

              {!query.get("package") ? (
                <div className="item_info_counts">
                  <div className="item_info_type">
                    <HiUsers size="1rem" />
                    <p>5 owners</p>
                  </div>

                  <div className="item_info_like">
                    <IoGrid size="1rem" />
                    <p>230 total</p>
                  </div>
                </div>
              ) : null}

              <p>{item?.description}</p>

              <div className="de_tab">
                <div className="de_tab_content">
                  {query.get("package") ? null : (
                    <div className="tab-1 onStep fadeIn">
                      <div className="d-block mb-3">
                        <div className="row mt-5">
                          {item?.attributes?.map((attribute, index) => (
                            <div
                              className="col-lg-4 col-md-6 col-sm-6"
                              key={index}
                            >
                              <div className="nft_attr">
                                <h5>{attribute?.trait_type}</h5>
                                <span>{attribute?.value}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* button for checkout */}
                  <div className="d-flex flex-row mt-5">
                    <button
                      className="btn-main lead mb-5 mr15"
                      onClick={() => setOpenCheckout(true)}
                    >
                      Buy Now
                    </button>

                    <button
                      className="btn-main btn2 lead mb-5 "
                      onClick={() => setOpenCheckoutbid(true)}
                    >
                      Place Bid
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      {openCheckout && (
        <div className="checkout">
          <div className="maincheckout">
            <button
              className="btn-close"
              onClick={() => setOpenCheckout(false)}
            >
              x
            </button>
            <div className="heading">
              <h3>Checkout</h3>
            </div>
            <p>
              You are about to purchase a{" "}
              <span className="bold">AnimeSailorClub #304</span>
              <span className="bold">from Monica Lucas</span>
            </p>
            <div className="detailcheckout mt-4">
              <div className="listcheckout">
                <h6>
                  Enter quantity.
                  <span className="color">10 available</span>
                </h6>
                <input
                  type="text"
                  name="buy_now_qty"
                  id="buy_now_qty"
                  className="form-control"
                />
              </div>
            </div>
            <div className="heading mt-3">
              <p>Your balance</p>
              <div className="subtotal">10.67856 ETH</div>
            </div>
            <div className="heading">
              <p>Service fee 2.5%</p>
              <div className="subtotal">0.00325 ETH</div>
            </div>
            <div className="heading">
              <p>You will pay</p>
              <div className="subtotal">0.013325 ETH</div>
            </div>
            <button className="btn-main lead mb-5">Checkout</button>
          </div>
        </div>
      )}
      {openCheckoutbid && (
        <div className="checkout">
          <div className="maincheckout">
            <button
              className="btn-close"
              onClick={() => setOpenCheckoutbid(false)}
            >
              x
            </button>
            <div className="heading">
              <h3>Place a Bid</h3>
            </div>
            <p>
              You are about to purchase a{" "}
              <span className="bold">AnimeSailorClub #304</span>
              <span className="bold">from Monica Lucas</span>
            </p>
            <div className="detailcheckout mt-4">
              <div className="listcheckout">
                <h6>Your bid (ETH)</h6>
                <input type="text" className="form-control" />
              </div>
            </div>
            <div className="detailcheckout mt-3">
              <div className="listcheckout">
                <h6>
                  Enter quantity.
                  <span className="color">10 available</span>
                </h6>
                <input
                  type="text"
                  name="buy_now_qty"
                  id="buy_now_qty"
                  className="form-control"
                />
              </div>
            </div>
            <div className="heading mt-3">
              <p>Your balance</p>
              <div className="subtotal">10.67856 ETH</div>
            </div>
            <div className="heading">
              <p>Service fee 2.5%</p>
              <div className="subtotal">0.00325 ETH</div>
            </div>
            <div className="heading">
              <p>You will pay</p>
              <div className="subtotal">0.013325 ETH</div>
            </div>
            <button className="btn-main lead mb-5">Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(ItemDetailRedux);
