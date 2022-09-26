import axiosInstance from "../axiosInstance";
import ROUTES from "../../constants/routes";

const getAllFactories = () =>
  new Promise((resolve, reject) => {
    axiosInstance
      .get(ROUTES.API_ROUTE + "/factories/")
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

export default getAllFactories;
