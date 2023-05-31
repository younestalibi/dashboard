// import axiosHttp from "axiosHttp";
// import { config } from "../../utils/axiosHttpconfig";

import axiosHttp from "../../../utils/axios-client";

// import { base_url } from "../../utils/baseUrl";
const getBrands = async () => {
  const response = await axiosHttp.get(`/brands`);
    console.log(response.data)
  return response.data;
};
const createBrand = async (brand) => {
  const response = await axiosHttp.post(`/brand`, brand,);
    console.log(response.data)
  return response.data;
};
const updateBrand = async (brand) => {
  const response = await axiosHttp.put(
    `${base_url}brand/${brand.id}`,
    { title: brand.brandData.title },
    config
  );

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
