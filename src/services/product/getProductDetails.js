import axiosInstance from "../axiosInstance";
import ROUTES from "../../constants/routes";

const getProductDetails = (factoryId, productId) =>
  new Promise((resolve, reject) => {
    axiosInstance
      .get(ROUTES.API_ROUTE + `/factories/${factoryId}/products/${productId}/`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

export default getProductDetails;
