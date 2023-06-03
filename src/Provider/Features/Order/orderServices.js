import axiosHttp from "../../../utils/axios-client";
import { config } from "../../../utils/config";

const getOrders = async () => {
  const response = await axiosHttp.get(`/orders`);

  return response.data;
};
const createOrder = async (order) => {
  const response = await axiosHttp.post(`/order`, order, config);

  return response.data;
};

const orderService = {
  getOrders,
  createOrder,
};

export default orderService;
