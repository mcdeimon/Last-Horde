import mysql from "mysql";



const query = (account, id_nft) => {
  connection.connect(function (error) {
    if (error) {
      throw error;
    } else {
      console.log("Conexion correcta.");
    }
  });

  connection.query(
    "INSERT INTO my_favorites(account, id_nft) VALUES(?, ?)",
    [account, id_nft],
    function (error, result) {
      if (error) {
        throw error;
      } else {
        console.log(result);
      }
    }
  );

  connection.end();
};
