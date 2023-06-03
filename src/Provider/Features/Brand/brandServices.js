// import axiosHttp from "axiosHttp";
// import { config } from "../../utils/axiosHttpconfig";

import axiosHttp from "../../../utils/axios-client";
import { config } from "../../../utils/config";

// import { base_url } from "../../utils/baseUrl";
const getBrands = async () => {
  const response = await axiosHttp.get(`/brands`);
  return response.data;
};
const createBrand = async (brand) => {
  console.log(brand)
  const response = await axiosHttp.post(`/brand`, brand,config);
    console.log(response.data)
  return response.data;
};
const updateBrand = async (brand) => {
  console.log(brand.get('name'))
  const response = await axiosHttp.post(`/brands/${brand.get('id')}`,brand,config);
console.log(response)
  return response.data;
};
const getSingleBrand = async (id) => {
  const response = await axiosHttp.get(`/brands/${id}`);
  return response.data;
};

const deleteBrand = async (id) => {
  const response = await axiosHttp.delete(`/brands/${id}`);

  return response.data;
};

const brandService = {
  getBrands,
  createBrand,
  getSingleBrand,
  updateBrand,
  deleteBrand,
};

export default brandService;
