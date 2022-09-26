import axiosInstance from "../axiosInstance";
import ROUTES from "../../constants/routes";

const deleteFactory = (factoryId) =>
  new Promise((resolve, reject) => {
    axiosInstance
      .delete(ROUTES.API_ROUTE + `/factories/${factoryId}/`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

export default deleteFactory;
