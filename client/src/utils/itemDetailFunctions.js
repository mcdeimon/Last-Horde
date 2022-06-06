import axios from "axios";
import ContractHorde from "../contracts/ContractHorde";
import ContractMarket, {
  address as addressMarket,
} from "../contracts/ContractMarket";
import ContractNfts, { address as addressNft } from "../contracts/ContractNfts";
import ContractQuickMarket, {
  address as addressQuickMarket,
} from "../contracts/ContractQuickMarket";
import { web3 } from "./web3";

const { REACT_APP_HOST_DB } = process.env;

// Function set like or unlike a nft
export const handleLike = async (account, itemId, myFavorites) => {
  // If there is an account connected
  if (account) {
    // If the nft is not in my favorites
    if (myFavorites.find((nft) => nft.id === itemId))
      await axios.delete(
        `${REACT_APP_HOST_DB}/account/${account}/id_nft/${itemId}`
      );
    // Delete the nft from my favorites
    else
      await axios.post(
        `${REACT_APP_HOST_DB}/account/${account}/id_nft/${itemId}/contract/${addressNft}`
      );
  }
};

// Function set the nft on sale
export const handleSell = async (account, itemId, sellObject, setStep) => {
  // Set the approval for all the nfts
  await ContractNfts.methods
    .setApprovalForAll(addressMarket, true)
    .send({ from: account });
  setStep(2);

  // Get the price in HOR
  const priceWei = await web3.utils.toWei(sellObject.price, "ether");

  // Get the if of order in the market
  const order = await ContractMarket.methods
    .createOrder(addressNft, `${itemId}`, `${priceWei}`) // `${sellObject.expirationDays}`
    .send({ from: account, gas: "300000" });

  // Save the data in the database
  await axios.post(`${REACT_APP_HOST_DB}/on-sale`, {
    account: account,
    id_nft: itemId,
    price: `${priceWei}`,
    // expiration_days: sellObject.expirationDays,
    order_id: order.events.OrderCreated.returnValues.id,
    sold: false,
    // expired: false,
    // created_days: new Date(),
    canceled: false,
  });

  return order.events.OrderCreated.returnValues.id;
};

// Function buy the nft on sale
export const handleBuy = async (account, itemId, onSale, query, setStep) => {
  // Get the id of order, the price in wei and the account
  const order_id = query.get("order_id");
  const price = onSale?.find(
    (nft) => nft.id === parseInt(itemId) && `${nft.order_id}` === order_id
  )?.price;
  const accountOwner = onSale?.find(
    (nft) => nft.id === parseInt(itemId) && `${nft.order_id}` === order_id
  )?.account;

  // Set the approval for the market
  await ContractHorde.methods.approve(addressMarket, price).send({
    from: account,
  });
  setStep(2);

  // Buy the nft
  await ContractMarket.methods
    .safePayment(addressNft, account, `${order_id}`)
    .send({ from: account, gas: "300000" });

  // Set the nft as sold in the database
  await axios.post(
    `${REACT_APP_HOST_DB}/on-sale/account/${accountOwner}/order_id/${order_id}`,
    {
      sold: true,
    }
  );

  return true;
};

// Function to cancel the nft on sale
export const handleCancelSell = async (account, query) => {
  // Get the id of order
  const order_id = query.get("order_id");

  // Cancel the sale of the nft
  await ContractMarket.methods.cancelOrder(addressNft, order_id).send({
    from: account,
    gas: "300000",
  });

  // Set the nft as canceled in the database
  await axios.post(
    `${REACT_APP_HOST_DB}/on-sale/account/${account}/order_id/${order_id}`,
    {
      canceled: true,
    }
  );
};

// Function to buy packs
export const handleBuyPacks = async (
  account,
  feed,
  code,
  pkg_type,
  setStep
) => {
  // Set the approval for the market
  await ContractHorde.methods
    .approve(addressQuickMarket, web3.utils.toWei(feed, "ether"))
    .send({ from: account });
  setStep(2);

  // Buy the nft
  await ContractQuickMarket.methods.buy(`${code}`).send({
    from: account,
    gas: "300000",
  });

  // Set the sale in the database
  await axios.post(
    `${REACT_APP_HOST_DB}/account/${account}/package/${pkg_type}`
  );
};

// Function to claim packs
export const handleClaimPacks = async (account, code, raritys) => {
  let lengthCards = code === 0 ? 3 : code === 1 ? 7 : 11;

  // Get random cards
  let cards = await axios.post(`${REACT_APP_HOST_DB}/raritys`, {
    raritys: ["0", "1", "2", "3", "4", "5"],
    lengthCards,
    account,
    code,
  });
  cards = cards.data;

  console.log(cards);
  /*  await ContractQuickMarket.methods
      .unbox(`${code}`, account, cards.keys, cards.values)
      .send({
        from: "0xccd665A7114960cccc42De2258C8C8cCaBd90dC6",
        gas: "3000000",
      }); */
};
