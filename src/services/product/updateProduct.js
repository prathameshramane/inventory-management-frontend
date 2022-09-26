import axiosInstance from "../axiosInstance";
import ROUTES from "../../constants/routes";

const updateProduct = (factoryId, productId, updatedProductData) =>
  new Promise((resolve, reject) => {
    axiosInstance
      .patch(
        ROUTES.API_ROUTE + `/factories/${factoryId}/products/${productId}/`,
        updatedProductData
      )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

export default updateProduct;
