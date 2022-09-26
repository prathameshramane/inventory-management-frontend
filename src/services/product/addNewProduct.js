import axiosInstance from "../axiosInstance";
import ROUTES from "../../constants/routes";

const addNewProduct = (factoryId, productData) =>
  new Promise((resolve, reject) => {
    axiosInstance
      .post(ROUTES.API_ROUTE + `/factories/${factoryId}/products/`, productData)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

export default addNewProduct;
