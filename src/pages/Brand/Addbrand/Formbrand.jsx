import './Formbrand.css'
import { React, useEffect, useRef, useState } from "react";
// import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";


import { UploadOutlined } from '@ant-design/icons';
import { Button, Space, Upload } from 'antd';
import { createBrand, getSingleBrand, resetStateBrand, updateBrand } from '../../../Provider/Features/Brand/brandSlice';
// import * as yup from "yup";
// import { useFormik } from "formik";
// import {
//   createBrand,
//   getABrand,
//   resetStateBrand,
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
  useEffect(()=>{
    setBrand(brandName)
  },[brandName])
  useEffect(() => {
    if (isEdite) {
      dispatch(getSingleBrand(id));
    } else {
      dispatch(resetStateBrand());
    }
  }, [id]);

  useEffect(() => {
    if (isSuccess && createdBrand) {
      toast.success("Brand Added Successfullly!");
    }
    if (isSuccess && updatedBrand) {
      toast.success("Brand Updated Successfullly!");
      navigate("/admin/list-brands");
    }

    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);

const [image,setImage]=useState([])
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
      
    if(isEdite){
      console.log(image)
      // if(image.length>0){
        // formData.append('image', image[0].originFileObj);  
        formData.append('image', image);  
      // }
      formData.append('id', id);
      dispatch(updateBrand(formData))
    }else{
      
      // formData.append('image', image[0].originFileObj);  
      formData.append('image', image);  
      dispatch(createBrand(formData))
    }
    dispatch(resetStateBrand())
    setBrand('')
    setImage([])
};



const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleChangeImage = (event) => {
    const file = event.target.files[0];
    
    if (file) {
      setImage(file)
    }
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

        
          <div className="form-floating mt-3">
          <input
            type="button"
            className="form-control"
            id="image"
            value="Select File"
            name="image"
            onClick={handleButtonClick}
          />
          {/* <label htmlFor="category">Brand</label> */}
          <input
          type="file"
          ref={fileInputRef}
          accept=".jpeg,.png,.jpg"
          style={{ display: "none" }}
          onChange={handleChangeImage}
          />
        </div>


        

        {/* <Space
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
        </Space> */}

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


// import './Formbrand.css';
// import React, { useRef, useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { createBrand, getSingleBrand, resetStateBrand, updateBrand } from '../../../Provider/Features/Brand/brandSlice';

// const Formbrand = () => {
//   const { id } = useParams();
//   const isEdit = !!id;
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [brand, setBrand] = useState('');
//   const [image, setImage] = useState(null);

//   const newBrand = useSelector((state) => state.brand);
//   const { isSuccess, isError, isLoading, createdBrand, updatedBrand } = newBrand;

//   useEffect(() => {
//     if (isEdit) {
//       dispatch(getSingleBrand(id));
//     } else {
//       dispatch(resetStateBrand());
//     }
//   }, [id]);

//   useEffect(() => {
//     if (isSuccess && createdBrand) {
//       toast.success("Brand Added Successfully!");
//     }
//     if (isSuccess && updatedBrand) {
//       toast.success("Brand Updated Successfully!");
//       // navigate("/admin/list-brand");
//     }
//     if (isError) {
//       toast.error("Something Went Wrong!");
//     }
//   }, [isSuccess, isError, isLoading]);

//   const handleBrand = (e) => {
//     setBrand(e.target.value);
//   };

//   const handleButtonClick = () => {
//     fileInputRef.current.click();
//   };

//   const fileInputRef = useRef(null);

//   const handleChangeImage = (event) => {
//     const file = event.target.files[0];
//     setImage(file);
//     if (file) {
//       console.log("Selected file:", file);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('name', brand);
//     if (image) {
//       formData.append('image', image);
//     }
//     if (isEdit) {
//       formData.append('id', id);
//       dispatch(updateBrand(formData));
//     } else {
//       dispatch(createBrand(formData));
//     }
//     dispatch(resetStateBrand());
//     setBrand('');
//     setImage(null);
//   };

//   return (
//     <div>
//       <h3 className="mb-4 title">
//         {isEdit ? "Edit" : "Add"} Brand
//       </h3>
//       <div>
//         <form action="" onSubmit={handleSubmit}>
//           <div className="form-floating mt-3">
//             <input
//               type="text"
//               className="form-control"
//               id="brand"
//               placeholder="Brand's name"
//               name="brand"
//               value={brand}
//               onChange={handleBrand}
//             />
//             <label htmlFor="brand">Brand</label>
//           </div>

//           <div className="form-floating mt-3">
//             <input
//               type="button"
//               className="form-control"
//               id="image"
//               value="Select File"
//               name="image"
//               accept=".jpeg,.jpg,.png"
//               onClick={handleButtonClick}
//             />
//             <input
//               type="file"
//               ref={fileInputRef}
//               style={{ display: "none" }}
//               onChange={handleChangeImage}
//             />
//           </div>

//           <button
//             className="btn btn-success border-0 rounded-3 my-5"
//             type="submit"
//           >
//             {isEdit ? "Edit" : "Add"} Brand
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Formbrand;
