import axiosInstance from "../axiosInstance";
import ROUTES from "../../constants/routes";

const addNewFactory = (factoryData) =>
  new Promise((resolve, reject) => {
    axiosInstance
      .post(ROUTES.API_ROUTE + "/factories/", factoryData)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

export default addNewFactory;
