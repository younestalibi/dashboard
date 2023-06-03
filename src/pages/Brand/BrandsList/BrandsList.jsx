import './BrandsList.css'
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { deleteBrand, getBrands, resetStateBrand } from '../../../Provider/Features/Brand/brandSlice';
import CustomAlert from '../../../components/CustomAlert/CustomAlert';
// import {
//   deleteABrand,
//   getBrands,
//   resetStateBrand,
// } from "../features/brand/brandSlice";
// import CustomModal from "../components/CustomModal";

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
    title:'Image',
    dataIndex:'image',
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const BrandsList = () => {
  const [deleteId,setDeleteId]=useState(null)
  const [brandId, setbrandId] = useState("");
 

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetStateBrand());
    dispatch(getBrands());
  }, []);
  const {brands,isSuccess,isError,isLoading,createdBrand,deletedBrand,brandName,updatedBrand} = useSelector((state) => state.brand);
  const data1 = [];
  console.log(brands)
  useEffect(() => {
    if (isSuccess && deletedBrand) {
    toast.success("Brand Deleted Successfullly!");
    }
    if (isError) {
    toast.error("Something Went Wrong!");
    }
}, [isSuccess, isError, isLoading]);
  for (let i = 0; i < brands.length; i++) {
    data1.push({
      key: i + 1,
      name: brands[i].name,
      image: <img style={{width:'60px',height:'60px',objectFit:"cover"}} src={`${import.meta.env.VITE_SERVER_URL}/storage/${brands[i].image}`}/>,
      action: (
        <>
          <Link to={`/admin/form-brand/${ brands[i].id}`} className=" fs-3 text-danger">
              <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(brands[i].id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  // const deleteBrand = (e) => {
  //   // dispatch(deleteABrand(e));

  //   // setOpen(false);
  //   // setTimeout(() => {
  //   //   dispatch(getBrands());
  //   // }, 100);
  // };
  const deleteRecord = (e) => {
    console.log('delete record')
    dispatch(deleteBrand(deleteId))
    dispatch(resetStateBrand())
    setOpen(false);
    setTimeout(() => {
    dispatch(getBrands());
    }, 100);
};
const [open, setOpen] = useState(false);
const showModal = (e) => {
  console.log('open alert')
    setOpen(true);
    setDeleteId(e)
};
  return (
    <div>
      <h3 className="mb-4 title">Brands</h3>
      <div>
        <Table columns={columns} loading={isLoading} dataSource={data1} />
      </div>
      <CustomAlert
        setOpen={setOpen}
        open={open}
        performAction={() => {
          console.log('perform alert')
            deleteRecord(deleteId);
        }}
        title="Are you sure you want to delete this Product Category?"
      />
    </div>
  );
};

export default BrandsList;
