import axiosInstance from "../axiosInstance";
import ROUTES from "../../constants/routes";

const getNumberOfOrders = (productId) =>
  new Promise((resolve, reject) => {
    axiosInstance
      .get(ROUTES.ORDERS_ROUTE + `/order-count/${productId}/`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

export default getNumberOfOrders;
