/* Controllers */
const myFavoritesController = require("../controllers/my_favorites");
const missingController = require("../controllers/missing");
const purchasePackageController = require("../controllers/purchase_packages");
const amountNftController = require("../controllers/amount_nfts");
const onSellController = require("../controllers/on_sell");

module.exports = (app) => {
  app.get("/", (req, res) =>
    res.status(200).send({
      message:
        "Example project did not give you access to the api web services",
    })
  );

  ////////////////////////////////////////////////////// MY FAVORITES //////////////////////////////////////////////////////
  app.post(
    "/account/:account/id_nft/:id_nft/contract/:contract",
    myFavoritesController.create
  );

  app.get("/account/:account/id_nft/:id_nft", myFavoritesController.search);

  app.delete("/account/:account/id_nft/:id_nft", myFavoritesController.delete);

  app.get("/all", myFavoritesController.list);

  app.get("/account/:account", myFavoritesController.find);

  app.get("/contract/:contract", myFavoritesController.findByContract);

  //////////////////////////////////////////////////////// MISSING HORS ////////////////////////////////////////////////////////
  app.post("/account/:account/missing/:missing", missingController.create);

  //////////////////////////////////////////////////////// PURCHASE PACKAGES ////////////////////////////////////////////////////////
  app.post(
    "/account/:account/package/:package",
    purchasePackageController.create
  );

  //////////////////////////////////////////////////////// AMOUNT NFTs ////////////////////////////////////////////////////////
  app.get("/amount-nft", amountNftController.get);

  app.put("/amount-nft/:amount", amountNftController.update);

  app.post("/amount-nft/:amount", amountNftController.create);

  //////////////////////////////////////////////////////// ON SELL NFT ////////////////////////////////////////////////////////
  app.post("/on-sell", onSellController.create);

  app.put("/on-sell/account/:account/id_nft/:id_nft", onSellController.update);
};
