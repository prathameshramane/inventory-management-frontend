import axiosInstance from "../axiosInstance";
// import ROUTES from "../../constants/routes";

const addOrderToQueue = (data) =>
  new Promise((resolve, reject) => {
    axiosInstance
      // .post(ROUTES.ORDERS_ROUTE + `/queue-order/`, data)
      .post(
        "https://prathamesh-orders-backend.azurewebsites.net/queue-order/",
        data
      )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

export default addOrderToQueue;
