import axios from "axios";
import { urlApi } from "./variables";

export default axios.create({
  baseURL: `${urlApi}`,
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization, X-Requested-With",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Max-Age": 86400,
  },
  timeout: 5000,
});
