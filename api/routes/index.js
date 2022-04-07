/* Controllers */
const myFavoritesController = require("../controllers/my_favorites");
const missingController = require("../controllers/missing");
const cors = require("cors");

let whiteList = ["https://localhost:3000/"];

let corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

module.exports = (app) => {
  app.get("/", cors(corsOptions),(req, res) =>
    res.status(200).send({
      message:
        "Example project did not give you access to the api web services",
    })
  );

  ////////////////////////////////////////////////////// MY FAVORITES //////////////////////////////////////////////////////
  app.post(
    "/account/:account/id_nft/:id_nft/contract/:contract", cors(corsOptions),
    myFavoritesController.create
  );

  app.get(
    "/account/:account/id_nft/:id_nft", cors(corsOptions),
    myFavoritesController.search
  );

  app.delete(
    "/account/:account/id_nft/:id_nft", cors(corsOptions),
    myFavoritesController.delete
  );

  app.get("/all", cors(corsOptions), myFavoritesController.list);

  app.get("/account/:account", cors(corsOptions), myFavoritesController.find);

  app.get("/contract/:contract", cors(corsOptions), myFavoritesController.findByContract);

  //////////////////////////////////////////////////////// MISSING HORS ////////////////////////////////////////////////////////
  app.post(
    "/account/:account/missing/:missing", cors(corsOptions),
    missingController.create
  );

  /* app.get("/amount-nft", myFavoritesController.list);

  app.put("/amount-nft/:amount", myFavoritesController.update); */
};
