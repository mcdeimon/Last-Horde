import React, { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Footer from "../components/footer";
import { IoGrid } from "react-icons/io5";
import { HiUsers } from "react-icons/hi";
import { FaShareSquare } from "react-icons/fa";
import ContractNfts, {
  address as addressNft,
} from "../../contracts/ContractNfts";
import ContractMarket, {
  address as addressMarket,
} from "../../contracts/ContractMarket";

//IMPORT DYNAMIC STYLED COMPONENT
import { StyledHeader } from "../Styles";
import {
  getMyFavorites,
  getNFTById,
  getPackagesById,
  getRarity,
} from "../../redux/actions";
import { useParams } from "@reach/router";
import { useQuery } from "../../utils/useQuery";
import axios from "axios";
import { web3 } from "../../utils/web3";
//SWITCH VARIABLE FOR PAGE STYLE
const theme = "GREY"; //LIGHT, GREY, RETRO

const { REACT_APP_HOST_DB } = process.env;

const ItemDetailRedux = () => {
  const dispatch = useDispatch();

  const nftItem = useSelector((state) => state.nft);
  const packageItem = useSelector((state) => state.package);
  const myNftsState = useSelector((state) => state.myNfts);
  const accountState = useSelector((state) => state.account);
  const myFavoritesState = useSelector((state) => state.myFavorites);

  const { itemId } = useParams();
  const query = useQuery();

  const [item, setItem] = useState({});

  const [myNfts, setMyNfts] = useState([]);
  const [account, setAccount] = useState(accountState);
  const [myFavorites, setMyFavorites] = useState(myFavoritesState);

  const [openSell, setOpenSell] = useState(false);
  const [sellObject, setSellObject] = useState({
    price: 0,
    expirationDays: 0,
  });

  const [openCheckoutbid, setOpenCheckoutbid] = useState(false);

  const handleCopyClipboard = () => {
    navigator.clipboard.writeText(
      `https://app.lasthorde.com/detail/${itemId}${
        query.get("package") ? "?package=true" : ""
      }`
    );
  };

  const handleLike = async () => {
    if (account) {
      if (myFavorites.find((nft) => nft.id === itemId))
        await axios
          .delete(
            `https://${REACT_APP_HOST_DB}/account/${account}/id_nft/${itemId}`
          )
          .then(() => dispatch(getMyFavorites()));
      else
        await axios
          .post(
            `https://${REACT_APP_HOST_DB}/account/${account}/id_nft/${itemId}/contract/${addressNft}`
          )
          .then(() => dispatch(getMyFavorites()));
    }
  };

  const handleSell = async () => {
    try {
      await ContractNfts.methods
        .setApprovalForAll(addressMarket, true)
        .send({ from: account });

      const priceWei = await web3.utils.toWei(sellObject.price, "ether");

      const order = await ContractMarket.methods
        .createOrder(
          addressNft,
          `${itemId}`,
          priceWei,
          sellObject.expirationDays
        )
        .send({ from: account, gas: "30000000" });

      await web3.eth.getBlockNumber().then((blockNumber) => {
        blockNumber = blockNumber - 50;

        ContractMarket.getPastEvents("allEvents", {
          fromBlock: blockNumber,
          toBlock: "latest",
        }).then((events) => {
          console.log(events);
        });
      });

      await axios.post(`https://${REACT_APP_HOST_DB}/on-sell`, {
        account: account,
        id_nft: itemId,
        price: priceWei,
        expiration_days: sellObject.expirationDays,
        order_id: 34242,
        sold: false,
        expired: false,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    dispatch(getRarity());

    if (query.get("package")) dispatch(getPackagesById(itemId));
    else dispatch(getNFTById(itemId));
  }, [dispatch, query, itemId]);

  useEffect(() => {
    if (query.get("package")) setItem(packageItem);
    else setItem(nftItem);
  }, [nftItem, packageItem, query]);

  useEffect(() => {
    setMyNfts(myNftsState);
    setAccount(accountState);
    setMyFavorites(myFavoritesState);
  }, [myNftsState, accountState, myFavoritesState]);

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

                <div
                  className={`nft__item_like ${
                    myFavorites.find((nft) => nft.id === item.id)
                      ? "likedHeart"
                      : ""
                  }`}
                  onClick={handleLike}
                >
                  <i className="fa fa-heart"></i>
                </div>
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
                  {!query.get("package") ? (
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
                  ) : null}

                  {/* button for checkout */}
                  {myNfts.find((nft) => nft.id === parseInt(itemId)) &&
                  !query.get("package") ? (
                    <div className="d-flex flex-row mt-5">
                      <button
                        className="btn-main lead mb-5 mr15"
                        onClick={() => setOpenSell(true)}
                      >
                        Sell
                      </button>

                      <button
                        className="btn-main btn2 lead mb-5 mr15"
                        onClick={() => setOpenCheckoutbid(true)}
                      >
                        Send
                      </button>

                      {/* <button
                        className="btn-main btn2 lead mb-5 "
                        onClick={() => setOpenCheckoutbid(true)}
                      >
                        Rent
                      </button> */}
                    </div>
                  ) : (
                    <div className="d-flex flex-row mt-5">
                      <button
                        className="btn-main lead mb-5 mr15"
                        onClick={() => setOpenCheckoutbid(true)}
                      >
                        Buy Now
                      </button>

                      {/* <button
                        className="btn-main btn2 lead mb-5 "
                        onClick={() => setOpenCheckoutbid(true)}
                      >
                        Rent
                      </button> */}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {openSell && (
        <div className="checkout">
          <div className="maincheckout">
            <button className="btn-close" onClick={() => setOpenSell(false)}>
              x
            </button>

            <div className="heading">
              <h3>Sell</h3>
            </div>

            <p>
              You are about to sell a <span className="bold">{item?.name}</span>
            </p>

            <div className="detailcheckout mt-4">
              <div className="listcheckout">
                <h6>
                  Enter price. <span className="color">Price in HOR</span>
                </h6>

                <input
                  type="number"
                  name="sellPrice"
                  id="sellPrice"
                  className="form-control"
                  onChange={(e) =>
                    setSellObject({ ...sellObject, price: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="detailcheckout mt-4">
              <div className="listcheckout">
                <h6>Enter number of expiration days.</h6>

                <input
                  type="number"
                  name="sellDays"
                  id="sellDays"
                  className="form-control"
                  onChange={(e) =>
                    setSellObject({
                      ...sellObject,
                      expirationDays: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <button className="btn-main lead mb-5" onClick={handleSell}>
              Sell
            </button>
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
