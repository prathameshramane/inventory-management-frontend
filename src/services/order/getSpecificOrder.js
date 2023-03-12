import axiosInstance from "../axiosInstance";
import ROUTES from "../../constants/routes";

const getSpecificOrder = (orderId) =>
  new Promise((resolve, reject) => {
    axiosInstance
      .get(ROUTES.ORDERS_ROUTE + `/orders/${orderId}/`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

export default getSpecificOrder;
