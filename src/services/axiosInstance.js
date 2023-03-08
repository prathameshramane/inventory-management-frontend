import axiosInstance from "axios";
import { CONFIGS } from "../constants/api.config";

axiosInstance.defaults.headers.common[CONFIGS.API_HEADER] = CONFIGS.APIM_KEY;

export default axiosInstance;
