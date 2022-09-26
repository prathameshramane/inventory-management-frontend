import axiosInstance from "../axiosInstance";
import ROUTES from "../../constants/routes";

const getProductsByFactory = (factoryId) =>
  new Promise((resolve, reject) => {
    axiosInstance
      .get(ROUTES.API_ROUTE + `/factories/${factoryId}/products/`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

export default getProductsByFactory;
