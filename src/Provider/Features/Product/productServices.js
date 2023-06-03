import { config } from "../../../utils/config";
import axiosHttp from "../../../utils/axios-client";


const getProducts = async () => {
  const response = await axiosHttp.get(`/products`);
console.log(response)
  return response.data;
};
const createProduct = async (product) => {
  const response = await axiosHttp.post(`/product`, product, config);
    console.log(response)
  return response.data;
};
const deleteProduct = async (id) => {
    const response = await axiosHttp.delete(`/products/${id}`);
    return response.data;
  };
const getSingleProduct = async (id) => {
    console.log(id)
    const response = await axiosHttp.get(`/products/${id}`);
    return response.data;
};
const updateProduct = async (product) => {
    console.log(product.get('id'))
    const response = await axiosHttp.post(`/products/${product.get('id')}`,product,config);
  console.log(response)
    return response.data;
  };
const productService = {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getSingleProduct
};

export default productService;
