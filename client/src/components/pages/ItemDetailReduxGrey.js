import React, { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Footer from "../components/footer";
import { IoGrid } from "react-icons/io5";
import { HiUsers } from "react-icons/hi";
import { FaShareSquare } from "react-icons/fa";
import { StyledHeader } from "../Styles";
import {
  getAccount,
  getMyFavorites,
  getNFTById,
  getOnSell,
  getPackagesById,
  getRarity,
} from "../../redux/actions";
import { useNavigate, useParams } from "@reach/router";
import { useQuery } from "../../utils/useQuery";
import {
  handleBuy,
  handleBuyPacks,
  handleCancelSell,
  handleClaimPacks,
  handleLike,
  handleSell,
} from "../../utils/itemDetailFunctions";

//SWITCH VARIABLE FOR PAGE STYLE
const theme = "GREY"; //LIGHT, GREY, RETRO

const ItemDetailRedux = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get params from global store
  const nftItem = useSelector((state) => state.nft);
  const packageItem = useSelector((state) => state.package);
  const myNftsState = useSelector((state) => state.myNfts);
  const accountState = useSelector((state) => state.account);
  const myFavoritesState = useSelector((state) => state.myFavorites);
  const myOnSaleState = useSelector((state) => state.myOnSales);
  const onSalesState = useSelector((state) => state.onSale);
  const myPackagesState = useSelector((state) => state.myPackages);
  const raritysState = useSelector((state) => state.rarity);

  // Get params from url
  const { itemId } = useParams();
  const query = useQuery();

  // Data of the NFT or PACKAGE
  const [item, setItem] = useState({});

  // Extra data of the NFT or PACKAGE
  const [myNfts, setMyNfts] = useState(myNftsState);
  const [account, setAccount] = useState(accountState);
  const [myFavorites, setMyFavorites] = useState(myFavoritesState);
  const [myOnSale, setMyOnSale] = useState(myOnSaleState);
  const [onSale, setOnSale] = useState(onSalesState);
  const [myPackages, setMyPackages] = useState(myPackagesState);
  const [raritys, setRaritys] = useState(raritysState);
  const [step, setStep] = useState(1);

  // Information about the Sale
  const [openSell, setOpenSell] = useState(false);
  const [sellObject, setSellObject] = useState({
    price: 0,
    expirationDays: 0,
  });
  const [noAccount, setNoAccount] = useState(false);

  // Variable for loading while waiting
  const [loading, setLoading] = useState(false);

  // Variable for future sending of nfts
  const [openCheckoutbid, setOpenCheckoutbid] = useState(false);

  // Funciton to copy the address to clipboard
  const handleCopyClipboard = () => {
    let auxOrderId = query.get("order_id");

    navigator.clipboard.writeText(
      query.get("package")
        ? `http://app.lasthorde.com/detail/${itemId}?package=true`
        : auxOrderId
        ? `http://localhost:3000/detail/${itemId}?order_id=${auxOrderId}`
        : `http://app.lasthorde.com/detail/${itemId}`
    );
  };

  // Function to handle the like
  const handleLikes = async () => {
    handleLike(account, itemId, myFavorites).then(() =>
      dispatch(getMyFavorites())
    );
  };

  // Function set the nft on sale
  const handleSellNft = async () => {
    const order_id = await handleSell(
      account,
      itemId,
      sellObject,
      setLoading,
      setOpenSell,
      setStep,
      setSellObject
    );

    // Reload the data in the store
    dispatch(getOnSell());
    dispatch(getAccount());

    // Navigate to the order page
    navigate(`/detail/${itemId}?order_id=${order_id}`);
  };

  // Function to cancel the sell
  const handleCancelSellNft = async () => {
    await handleCancelSell(account, query, setLoading);

    // Reload the data in the store
    dispatch(getOnSell());
    dispatch(getAccount());
  };

  // Function to buy the nft
  const handleBuyNft = async () => {
    await handleBuy(account, itemId, onSale, query, setLoading, setStep);

    // Reload the data in the store
    dispatch(getOnSell());
    dispatch(getAccount());
  };

  // Function to buy the package
  const handleBuyPackage = async () => {
    await handleBuyPacks(
      account,
      item.fee,
      itemId - 1,
      item.value,
      setLoading,
      setStep
    );

    // Reload the data in the store
    // dispatch(getAccount());
  };

  // Function to claim the package
  const handleClaimPackage = async () => {
    await handleClaimPacks(account, itemId - 1, raritys, setLoading);

    // Reload the data in the store
    dispatch(getAccount());
  };

  // Function to load in the store the rarities, the nfts for sale, the packages and the nft
  useEffect(() => {
    dispatch(getRarity());
    dispatch(getOnSell());

    if (query.get("package")) dispatch(getPackagesById(itemId));
    else dispatch(getNFTById(itemId));
  }, [dispatch, query, itemId]);

  // Function to set the information of the nft or the package
  useEffect(() => {
    if (query.get("package")) setItem(packageItem);
    else setItem(nftItem);
  }, [nftItem, packageItem, query]);

  // Function to set extra data
  useEffect(() => {
    setMyNfts(myNftsState);
    setAccount(accountState);
    setMyFavorites(myFavoritesState);
    setMyOnSale(myOnSaleState);
    setOnSale(onSalesState);
    setMyPackages(myPackagesState);
    setRaritys(raritysState);
  }, [
    myNftsState,
    accountState,
    myFavoritesState,
    myOnSaleState,
    onSalesState,
    myPackagesState,
    raritysState,
  ]);

  return (
    <div className="greyscheme">
      <StyledHeader theme={theme} />

      <section className="container">
        <div className="row mt-md-5 pt-md-4">
          {/* Image of the nft */}
          <div className="col-md-6 text-center">
            <img src={item?.image} className="img-fluid img-rounded" alt="" />
          </div>

          <div className="col-md-6">
            <div className="item_info">
              {/* Name of the nft, id and like */}
              <div className="item_title">
                <h2>{item?.name}</h2>

                <p>#{itemId}</p>

                <FaShareSquare onClick={handleCopyClipboard} />

                <div
                  className={`nft__item_like detail ${
                    myFavorites.find((nft) => nft.id === item.id)
                      ? "likedHeart"
                      : ""
                  }`}
                  onClick={handleLikes}
                >
                  <i className="fa fa-heart"></i>
                </div>
              </div>

              {/* Description of the amount of nft */}
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

              {/* Description of the nft */}
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

                  {/* Button for checkout */}
                  {account && !query.get("package") ? (
                    <div className="d-flex flex-row mt-5">
                      {[...onSale]?.filter(
                        (nft) =>
                          `${nft.order_id}` === query.get("order_id") &&
                          nft.account !== account
                      ).length ? (
                        <button
                          className="btn-main lead mb-5 mr15"
                          onClick={handleBuyNft}
                          disabled={
                            account && query.get("order_id") ? false : true
                          }
                        >
                          Buy Now
                        </button>
                      ) : null}

                      {[...onSale]?.find(
                        (nft) =>
                          `${nft.order_id}` === query.get("order_id") &&
                          nft.account === account
                      ) ? (
                        <button
                          className="btn-main lead mb-5 mr15"
                          onClick={handleCancelSellNft}
                        >
                          Cancel Sale
                        </button>
                      ) : null}

                      {[...myOnSale]?.filter(
                        (nft) => nft.id === parseInt(itemId)
                      ).length <
                      [...myNfts]?.filter((nft) => nft.id === parseInt(itemId))
                        .length ? (
                        <button
                          className="btn-main lead mb-5 mr15"
                          onClick={() => setOpenSell(true)}
                        >
                          Sell
                        </button>
                      ) : null}

                      {myNfts.find((nft) => nft.id === parseInt(itemId)) ? (
                        <button
                          className="btn-main btn2 lead mb-5 mr15"
                          onClick={() => setOpenSell(false)}
                        >
                          Send
                        </button>
                      ) : null}

                      {/* <button
                        className="btn-main btn2 lead mb-5 "
                        onClick={() => setOpenCheckoutbid(true)}
                      >
                        Rent
                      </button> */}
                    </div>
                  ) : null}

                  {query.get("package") && account ? (
                    <div className="d-flex flex-row mt-5">
                      <button
                        className="btn-main lead mb-5 mr15"
                        onClick={handleBuyPackage}
                      >
                        Buy Now
                      </button>

                      {myPackages.find((pkg) => pkg.id === parseInt(itemId)) ? (
                        <button
                          className="btn-main lead mb-5 mr15"
                          onClick={handleClaimPackage}
                        >
                          Claim Now
                        </button>
                      ) : null}
                    </div>
                  ) : null}

                  {!account ? (
                    <div className="d-flex flex-row mt-5">
                      <button
                        className="btn-main lead mb-5 mr15"
                        onClick={() => setNoAccount(true)}
                      >
                        Buy Now
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Modal to sell the nft */}
      {openSell && (
        <div className="checkout">
          <div className="maincheckout">
            <button className="btn-close" onClick={() => setOpenSell(false)}>
              X
            </button>

            <div className="heading">
              <h3>Sell</h3>
            </div>

            <p>
              You are about to sell a <span className="bold">{item?.name}</span>
            </p>

            {/* Input to save the price */}
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

            {/* <div className="detailcheckout mt-4">
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
            </div> */}

            <button
              className="btn-main lead mb-5"
              onClick={handleSellNft}
              disabled={sellObject.price ? false : true}
            >
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
              X
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

      {/* Modal to wait */}
      {loading ? (
        <div className="checkout">
          <div className="maincheckout">
            <div className="loading">
              <h2>Wait to finish the transaction</h2>
              <h3>Step:{` ${step}`}</h3>
            </div>
          </div>
        </div>
      ) : null}

      {/* Modal when no account is connected */}
      {noAccount ? (
        <div className="checkout">
          <div className="maincheckout">
            <button className="btn-close" onClick={() => setNoAccount(false)}>
              X
            </button>

            <div className="noAccount">
              <h3>Please connect your Smart Chain account to buy the NFT</h3>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default memo(ItemDetailRedux);
