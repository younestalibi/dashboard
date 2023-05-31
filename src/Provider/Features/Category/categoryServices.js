import axiosHttp from "../../../utils/axios-client";
// import { base_url } from "../../utils/baseUrl";
// import { config } from "../../utils/axiosHttpconfig";

const getCategories = async () => {
  const response = await axiosHttp.get(`/get-categories`);
    console.log(response.data)
  return response.data;
};
const createCategory = async (category) => {
  const response = await axiosHttp.post(`/add-category`, category);
    console.log(response)
  return response.data;
};

const getSingleCategory = async (id) => {
  const response = await axiosHttp.get(`/get-single-category/${id}`);
    console.log(response.data)
  return response.data;
};

const deleteCategory = async (id) => {
  const response = await axiosHttp.delete(`/delete-category/${id}`);
  return response.data;
};
const updateCategory = async (category) => {
  const response = await axiosHttp.put(`/update-category/${category.get('id')}`,category);
console.log(response)
  return response.data;
};
const CategoryService = {
  getCategories,
  createCategory,
  getSingleCategory,
  deleteCategory,
  updateCategory,
};

export default CategoryService;
