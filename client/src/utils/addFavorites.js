import axios from "axios";

const addFavorite = async (id_nft, account, contract) => {
  try {
    let isFavorite = await axios.get(
      `https://localhost:8000/account/${account}/id_nft/${id_nft}`
    );
    let response;

    if (isFavorite.data.isFavorite)
      await axios.delete(
        `https://localhost:8000/account/${account}/id_nft/${id_nft}`
      );
    else
      response = await axios.post(
        `https://localhost:8000/account/${account}/id_nft/${id_nft}/contract/${contract}`
      );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
