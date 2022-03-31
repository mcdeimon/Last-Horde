/* Controllers */
const myFavoritesController = require("../controllers/my_favorites");

module.exports = (app) => {
  app.get("/", (req, res) =>
    res.status(200).send({
      message:
        "Example project did not give you access to the api web services",
    })
  );

  app.post(
    "/account/:account/id_nft/:id_nft",
    myFavoritesController.create
  );

  app.get("/all", myFavoritesController.list);

  app.get("/account/:account", myFavoritesController.find);
};
