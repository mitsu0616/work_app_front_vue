import axios from "axios";

const HOST = "http://127.0.0.1:3000";

export const railsAxios = axios.create({
  baseURL: HOST,
  responseType: 'json'  
});
