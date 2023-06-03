import React, { useEffect, useState } from 'react';
import { createCategory, getSingleCategory, resetStateCategory, updateCategory } from '../../../Provider/Features/Category/categorySlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { useNavigate, useParams } from 'react-router-dom';

function FormCategory() {
    const {id}=useParams()
    const isEdite=!!id
    const dispatch=useDispatch()
    const newCategory = useSelector((state) => state.Category);
    const {
        isSuccess,
        isError,
        isLoading,
        createdCategory,
        categoryName,
        Categories,
        updatedCategory,
    } = newCategory;
    console.log(newCategory)
    const [category, setCategory] = useState(categoryName);
    useEffect(()=>{
      setCategory(categoryName)
    },[categoryName])
    useEffect(() => {
      if (isEdite) {
        dispatch(getSingleCategory(id))
      } else {
        dispatch(resetStateCategory());
      }
    }, [id]);
    const navigate=useNavigate()
    useEffect(() => {
        if (isSuccess && createdCategory) {
          toast.success("Category Added Successfullly!");
        }
        if (isSuccess && updatedCategory) {
          toast.success("Category Updated Successfullly!");
          // alert('hello world')
          navigate("/admin/list-categories");
        }
        if (isError) {
          toast.error("Something Went Wrong!");
        }

      }, [isSuccess, isError, isLoading]);

    const handleChange = (e) => {
        setCategory(e.target.value)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', category);
        
        

        if(isEdite){
          formData.append('id', id);
          dispatch(updateCategory(formData))
        }else{
          dispatch(createCategory(formData))
        }
        dispatch(resetStateCategory())
        setCategory('')
    };



  return (
    <div>
      <h2>{isEdite? "Edit" : "Add"} Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-floating mt-3">
          <input
            type="text"
            className="form-control"
            id="category"
            placeholder="Category's name"
            name="category"
            value={category}
            onChange={handleChange}
          />
          <label htmlFor="category">Category</label>
        </div>


        <button type="submit" className="btn btn-primary mt-3">Submit</button>
      </form>
    </div>
  );
}

export default FormCategory;
