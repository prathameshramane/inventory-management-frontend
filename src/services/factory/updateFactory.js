import axiosInstance from "../axiosInstance";
import ROUTES from "../../constants/routes";

const updateFactory = (factoryId, updatedFactoryData) =>
  new Promise((resolve, reject) => {
    axiosInstance
      .patch(ROUTES.API_ROUTE + `/factories/${factoryId}/`, updatedFactoryData)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

export default updateFactory;
