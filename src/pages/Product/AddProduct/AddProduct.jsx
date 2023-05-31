import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, resetState } from '../../../Provider/Features/Category/categorySlice';
import CustomSelect from '../../../components/CustomAlert/CustomSelect';




const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
});


function AddProduct() {
    const [product, setProduct] = useState({
        slug: '',
        description: '',
        price: '',
        color: '',
        quantity:null,
        brand: null,
        category:null,
        images:null
    });
    const {isSuccess,isError,isLoading,Categories}= useSelector((state) => state.Category);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(resetState());
        dispatch(getCategories());
    }, []);

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([
        {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
    ]);
    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    const handleChangeImage = ({ fileList: newFileList }) => {setFileList(newFileList);setProduct({...product,['images']: newFileList,});};
    const uploadButton = (
        <div>
        <PlusOutlined/>
        <div
            style={{
            marginTop: 8,
            }}
        >
            Upload
        </div>
        </div>
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        const parsedValue = ['categories', 'brand','quantity'].includes(name) ? parseInt(value) : value;
        setProduct((prevState) => ({
        ...prevState,
        [name]: parsedValue,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log(product); // Replace with your logic
    };
console.log(Categories)
  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
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

        <div className="form-floating mt-3">
          <input
            type="text"
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
          <input
            type="text"
            className="form-control"
            id="color"
            placeholder="Color"
            name="color"
            value={product.color}
            onChange={handleChange}
          />
          <label htmlFor="color">Color</label>
        </div>

        <div className="form-floating mt-3">
          <input
            type="text"
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
            <option value="brand1">Brand 1</option>
            <option value="brand2">Brand 2</option>
            {/* Add more options as needed */}
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

        <>
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
    </>

        <button type="submit" className="btn btn-primary mt-3">Submit</button>
      </form>
    </div>
  );
}

export default AddProduct;
