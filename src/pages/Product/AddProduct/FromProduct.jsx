import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, resetStateCategory } from '../../../Provider/Features/Category/categorySlice';
import { useNavigate, useParams } from 'react-router-dom';
import { getBrands, resetStateBrand } from '../../../Provider/Features/Brand/brandSlice';
import { toast } from "react-toastify";
import './FromProduct.css'
import { createProduct, getSingleProduct, resetStateProduct, updateProduct } from '../../../Provider/Features/Product/productSlice';


function FromProduct() {
  const {id}=useParams()
  const isEdite=!!id
  const initialState = {
    slug: '',
    name: '',
    description: '',
    price: null,
    color: '',
    quantity: null,
    brand: '',
    category: '',
    size: '',
    gender: '',
    is_available: 1,
    images: []
  };
  const {isError,isLoading,isSuccess,message,createdProduct,singleProduct,updatedProduct} = useSelector((state) => state.product);
  const [product, setProduct] = useState(initialState);
  const {Categories}= useSelector((state) => state.Category);
  const {brands} = useSelector((state) => state.brand);

    const dispatch = useDispatch();
    const navigate=useNavigate()
    useEffect(() => {
        dispatch(resetStateCategory());
        dispatch(resetStateBrand())
        dispatch(getCategories());
        dispatch(getBrands());
    }, []);
    useEffect(() => {
      if (isSuccess && createdProduct) {
        toast.success("Product Added Successfullly!");
      }
      if (isSuccess && updatedProduct) {
        toast.success("Product Updated Successfullly!");
        navigate("/admin/list-products");
      }
  
      if (isError) {
        toast.error("Something Went Wrong!");
      }
    }, [isSuccess, isError, isLoading]);
  

    useEffect(()=>{
      if(singleProduct){
        setProduct({
        slug: singleProduct.slug,
        name: singleProduct.name,
        description: singleProduct.description,
        price: singleProduct.price,
        color: singleProduct.color,
        quantity: singleProduct.quantity,
        brand: singleProduct.brand.id,
        category: singleProduct.category.id,
        size: singleProduct.size,
        gender: singleProduct.gender,
        is_available: singleProduct.is_available,
        images:[]
      })
      }
    },[singleProduct])
    useEffect(() => {
      if (isEdite) {
        dispatch(getSingleProduct(id));
      } else {
        dispatch(resetStateProduct());
      }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const parsedValue = ['category', 'brand','quantity','is_available'].includes(name) ? parseInt(value) : value;
        setProduct((prevState) => ({
        ...prevState,
        [name]: parsedValue,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();        
        const formData = new FormData();
        formData.append('slug', product.slug);
        formData.append('name', product.name);
        formData.append('description', product.description);
        formData.append('price', product.price);
        formData.append('color', product.color);
        formData.append('quantity', product.quantity);
        formData.append('brand', product.brand);
        formData.append('category', product.category);
        formData.append('size', product.size);
        formData.append('gender', product.gender);
        formData.append('is_available', product.is_available);
        // Append each image file to the FormData
        for (let i = 0; i < product.images.length; i++) {
          formData.append('images[]', product.images[i]);
        }      
    if(isEdite){
      formData.append('id', id);
      dispatch(updateProduct(formData))
    }else{
        dispatch(createProduct(formData))
    }
    dispatch(resetStateProduct())    


    };


  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const updatedImages = [...product.images];

    files.forEach((file) => {
      updatedImages.push(file);
    });

    // setImages(updatedImages);
    setProduct((prevState) => ({
      ...prevState,
      ['images']: updatedImages,
      }));
  };

  const handleImageDelete = (index) => {
    const updatedImages = [...product.images];
    updatedImages.splice(index, 1);
    // setImages(updatedImages);
    setProduct((prevState) => ({
      ...prevState,
      ['images']: updatedImages,
      }));
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  return (
    <div>
      <h2>{isEdite?'Edit':'Add'} Product</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-floating mt-3">
        <input
          type="text"
          className="form-control"
          id="name"
          placeholder="Name"
          name="name"
          value={product.name}
          onChange={handleChange}
        />
        <label htmlFor="name">Name</label>
      </div>
     

        <div className="form-floating mt-3">
          <input
            type="text"
            className="form-control"
            id="slug"
            placeholder="Slug"
            name="slug"
            value={product.slug}
            onChange={handleChange}
          />
          <label htmlFor="slug">Slug</label>
        </div>

        <div className="form-floating mt-3">
          <input
            type="text"
            className="form-control"
            id="description"
            placeholder="Description"
            name="description"
            value={product.description}
            onChange={handleChange}
          />
          <label htmlFor="description">Description</label>
        </div>

        {
          isEdite&&
          <div className="form-floating mt-3">
          <select
            className="form-control"
            id="is_available"
            name="is_available"
            value={product.is_available}
            onChange={handleChange}
          >
            <option value='1'>Yes</option>
            <option value='0'>No</option>
          </select>
          <label htmlFor="is_available">Product's status</label>
        </div>
        }

      <div className="form-floating mt-3">
        <select
          className="form-control"
          id="gender"
          name="gender"
          value={product.gender}
          onChange={handleChange}
        >
          <option value="">Select Target gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <label htmlFor="gender">Gender</label>
      </div>

      <div className="form-floating mt-3">
        <select
          className="form-control"
          id="size"
          name="size"
          value={product.size}
          onChange={handleChange}
        >
          <option value="">Select Size</option>
          <option value="S">Small</option>
          <option value="M">Medium</option>
          <option value="L">Large</option>
          <option value="XL">Extra Large</option>
        </select>
        <label htmlFor="size">Size</label>
      </div>

      <div className="form-floating mt-3">
        <input
          type="number"
          className="form-control"
          id="price"
          placeholder="Price"
          name="price"
          value={product.price}
          onChange={handleChange}
        />
        <label htmlFor="price">Price</label>
      </div>

      <div className="form-floating mt-3">
        <input type="color" 
        className="form-control"
        id="color"
        name="color"
        value={product.color}
        onChange={handleChange}
        />
        <label htmlFor="color">Color</label>
      </div>


      <div className="form-floating mt-3">
        <input
          type="number"
          className="form-control"
          id="quantity"
          placeholder="Quantity"
          name="quantity"
          value={product.quantity}
          onChange={handleChange}
        />
        <label htmlFor="quantity">Quantity</label>
      </div>

        

      <div className="form-floating mt-3">
        <select
          className="form-select"
          id="brand"
          name="brand"
          value={product.brand}
          onChange={handleChange}
        >
          <option value="">Select Brand</option>
          {brands&&brands.map((brand,i) => (
            <option key={i} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>
        <label htmlFor="brand">Brand</label>
      </div>
      <div className="form-floating mt-3">
        <select
          className="form-select"
          id="category"
          name="category"
          value={product.category}
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          {Categories&&Categories.map((category,i) => (
            <option key={i} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <label htmlFor="category">Category</label>
      </div>

        {/* <>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChangeImage}
        accept=".jpeg,.jpg,.png"
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
    </> */}

    <div className="form-floating mt-3">
        <input
          type="button"
          className="form-control"
          id="images"
          name="images"
          onClick={handleButtonClick}
          value='Select images'
        />
        <label htmlFor="images">Images</label>
        <input
          type="file"
          className="form-control visually-hidden"
          id="images"
          name="images"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
        />
        <label htmlFor="images">Images</label>
      </div>

      <div className='images-container'>
        {product.images.map((image, index) => (
          <div key={index} className="image-preview">
            <img src={URL.createObjectURL(image)} alt={`Image ${index + 1}`} />
            <div className='close' onClick={() => handleImageDelete(index)}>X</div>
          </div>
        ))}
      </div>

        <button type="submit" className="btn btn-primary mt-3">{isEdite?'Edit':'Add'} Product</button>
      </form>
    </div>
  );
}

export default FromProduct;
