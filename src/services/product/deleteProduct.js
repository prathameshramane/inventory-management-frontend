import axiosInstance from "../axiosInstance";
import ROUTES from "../../constants/routes";

const deleteProduct = (factoryId, productId) =>
  new Promise((resolve, reject) => {
    axiosInstance
      .delete(
        ROUTES.API_ROUTE + `/factories/${factoryId}/products/${productId}/`
      )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

export default deleteProduct;
