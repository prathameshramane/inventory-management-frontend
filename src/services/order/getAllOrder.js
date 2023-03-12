import axiosInstance from "../axiosInstance";
import ROUTES from "../../constants/routes";

const getAllOrder = () =>
  new Promise((resolve, reject) => {
    axiosInstance
      .get(ROUTES.ORDERS_ROUTE + `/orders/`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

export default getAllOrder;
