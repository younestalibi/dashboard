import './Formbrand.css'
import { React, useEffect, useState } from "react";
// import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";


import { UploadOutlined } from '@ant-design/icons';
import { Button, Space, Upload } from 'antd';
import { createBrand, getSingleBrand, resetState, updateBrand } from '../../../Provider/Features/Brand/brandSlice';
// import * as yup from "yup";
// import { useFormik } from "formik";
// import {
//   createBrand,
//   getABrand,
//   resetState,
//   updateABrand,
// } from "../features/brand/brandSlice";

// let schema = yup.object().shape({
//   title: yup.string().required("Brand Name is Required"),
// });
const Formbrand = () => {

    const {id}=useParams()
    const isEdite=!!id


  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [brand,setBrand]=useState(null)
  // const getBrandId = location.pathname.split("/")[3];
  const newBrand = useSelector((state) => state.brand);
  const {
    isSuccess,
    isError,
    isLoading,
    createdBrand,
    brandName,
    updatedBrand,
  } = newBrand;
  useEffect(() => {
    if (isEdite) {
      dispatch(getSingleBrand(id));
    } else {
      dispatch(resetState());
    }
  }, [id]);

  useEffect(() => {
    if (isSuccess && createdBrand) {
      toast.success("Brand Added Successfullly!");
    }
    if (isSuccess && updatedBrand) {
      toast.success("Brand Updated Successfullly!");
      // navigate("/admin/list-brand");
    }

    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);
//   const formik = useFormik({
//     enableReinitialize: true,
//     initialValues: {
//       title: brandName || "",
//     },
//     validationSchema: schema,
//     onSubmit: (values) => {
//       if (getBrandId !== undefined) {
//         const data = { id: getBrandId, brandData: values };
//         dispatch(updateABrand(data));
//         dispatch(resetState());
//       } else {
//         dispatch(createBrand(values));
//         formik.resetForm();
//         setTimeout(() => {
//           dispatch(resetState());
//         }, 300);
//       }
//     },
//   });
const [image,setImage]=useState()
const handleImage=(e)=>{
    setImage(e.fileList)
    console.log(image)
    // setImage(e.file.originFileObj)
}
const handleBrand = (e) => {
    setBrand(e.target.value)
};
const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', brand);
    formData.append('image', image[0].originFileObj);    
    if(isEdite){
      formData.append('id', id);
      dispatch(updateBrand(formData))
    }else{
      dispatch(createBrand(formData))
    }
    dispatch(resetState())
    setBrand('')
    setImage([])
};

  return (
    <div>
      <h3 className="mb-4 title">
        {isEdite? "Edit" : "Add"} Brandd
      </h3>
      <div>
        <form action="" onSubmit={handleSubmit}>
          <div className="form-floating mt-3">
          <input
            type="text"
            className="form-control"
            id="brand"
            placeholder="Brand's name"
            name="brand"
            value={brand}
            onChange={handleBrand}
          />
          <label htmlFor="category">Brand</label>
        </div>

        <Space
            direction="vertical"
            style={{
            width: '100%',
            }}
            size="large"
        >
            <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            maxCount={1}
            accept=".jpeg,.jpg,.png"
            onChange={handleImage}
            // file={}
            fileList={image}
            >
            <Button icon={<UploadOutlined />}></Button>
            </Upload>
        </Space>

          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {isEdite ? "Edit" : "Add"} Brand
          </button>
        </form>
      </div>
    </div>
  );
};

export default Formbrand;
