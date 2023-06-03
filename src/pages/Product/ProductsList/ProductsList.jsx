import './ProductsList.css'
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
// import { getProducts } from "../features/product/productSlice";
import { Link } from "react-router-dom";
import { deleteProduct, getProducts, resetStateProduct } from '../../../Provider/Features/Product/productSlice';
import { toast } from "react-toastify";
import CustomAlert from '../../../components/CustomAlert/CustomAlert';


const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Image",
    dataIndex: "image",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const ProductsList = () => {
  const dispatch = useDispatch();
  const [deleteId,setDeleteId]=useState(null)
  const [open, setOpen] = useState(false);
  const showModal = (e) => {
      setOpen(true);
      setDeleteId(e)
  };
  const hideModal = () => {
    setOpen(false);
  };

  const {products,isError,isLoading,isSuccess,message,deletedProduct} = useSelector((state) => state.product);
  const test= useSelector((state) => state.product);
  console.log(test)
  useEffect(() => {
    if (isSuccess && deletedProduct) {
    toast.success("Product Deleted Successfullly!");
    }
    if (isError) {
    toast.error("Something Went Wrong!");
    }
}, [isSuccess, isError, isLoading]);
  useEffect(() => {
    dispatch(resetStateProduct())
    dispatch(getProducts());
  }, []);
  const data1 = [];
  for (let i = 0; i < products.length; i++) {
    data1.push({
      key: i + 1,
      name: products[i].name,
      brand: products[i].brand.name,
      category: products[i].category.name,
      color: <span style={{backgroundColor:products[i].color,padding:'0 27px',margin:'auto',borderRadius:'4px'}}></span>,
      price: `${products[i].price}`,
      image:
      <img style={{width:'60px',height:'60px',objectFit:"cover"}} 
      src={`${import.meta.env.VITE_SERVER_URL}/storage/${products[i].images.length>0 && products[i].images[0].image_path}`}/>,
      action: (
        <>
          <Link to={`/admin/form-product/${ products[i].id}`} className=" fs-3 text-danger">
              <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(products[i].id)}
          >
            <AiFillDelete />
          </button>
        </> 
      ),
    });
  }
  const deleteRecord = (e) => {
    console.log('delete record')
    dispatch(deleteProduct(deleteId))
    dispatch(resetStateProduct())
    setOpen(false);
    setTimeout(() => {
    dispatch(getProducts());
    }, 100);
  };
  console.log(data1);
  return (
    <div>
      <h3 className="mb-4 title">Products</h3>
      <div>
        <Table columns={columns} loading={isLoading} dataSource={data1} />
      </div>
      <CustomAlert
        setOpen={setOpen}
        open={open}
        performAction={() => {
            deleteRecord(deleteId);
        }}
        title="Are you sure you want to delete this Product?"
      />
    </div>
  );
};

export default ProductsList;
