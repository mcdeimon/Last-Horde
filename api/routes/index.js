/* Controllers */
const myFavoritesController = require("../controllers/my_favorites");
const missingController = require("../controllers/missing");
const purchasePackageController = require("../controllers/purchase_packages");
const onSellController = require("../controllers/on_sell");
const raritysController = require("../controllers/raritys");

module.exports = (app) => {
  ////////////////////////////////////////////////////// My favorites routes
  app.post(
    "/account/:account/id_nft/:id_nft/contract/:contract",
    myFavoritesController.create
  );

  app.get("/account/:account/id_nft/:id_nft", myFavoritesController.search);

  app.delete("/account/:account/id_nft/:id_nft", myFavoritesController.delete);

  app.get("/all", myFavoritesController.list);

  app.get("/account/:account", myFavoritesController.find);

  app.get("/contract/:contract", myFavoritesController.findByContract);

  //////////////////////////////////////////////////////// Missing HORs routes
  app.post("/account/:account/missing/:missings", missingController.create);

  //////////////////////////////////////////////////////// Purchase packages routes
  app.post(
    "/account/:account/package/:package",
    purchasePackageController.create
  );

  app.get(
    "/purchage_packages/account/:account",
    purchasePackageController.find
  );

  //////////////////////////////////////////////////////// On sale NFT routes
  app.get("/on-sale", onSellController.find);

  app.post("/on-sale", onSellController.create);

  app.post(
    "/on-sale/account/:account/order_id/:order_id",
    onSellController.update
  );

  //////////////////////////////////////////////////////// Raritys routes
  app.post("/raritys", raritysController.raritys);
};
