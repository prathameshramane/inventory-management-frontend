import axiosInstance from "../axiosInstance";
import ROUTES from "../../constants/routes";

const getFactoryById = (factoryId) =>
  new Promise((resolve, reject) => {
    axiosInstance
      .get(ROUTES.API_ROUTE + `/factories/${factoryId}/`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

export default getFactoryById;
