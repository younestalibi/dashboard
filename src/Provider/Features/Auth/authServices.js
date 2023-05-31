import axios from "axios";
// import { config } from "../../utils/axiosconfig";
import { base_url } from "../../../utils/baseUrl";
import axiosHttp from "../../../utils/axios-client";
const login = async (user) => {
    console.log('hello world')
  const response = await axiosHttp.post(`${base_url}/login`,user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data.token));
  }
  console.log(response.data)
  return response.data;
};
const getUser = async (user) => {
  const response = await axiosHttp.get(`${base_url}/user`);
  return response.data;
};

const getOrders = async () => {
  const response = await axios.get(`${base_url}user/getallorders`);

  return response.data;
};
const getOrder = async (id) => {
  const response = await axios.post(
    `${base_url}user/getorderbyuser/${id}`,
    ""
  );

  return response.data;
};

const authService = {
  login,
  getUser,
  getOrders,
  getOrder,
};

export default authService;
