import './CategoriesList.css'
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteCategory, getCategories, resetStateCategory } from '../../../Provider/Features/Category/categorySlice';
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
    title: "Action",
    dataIndex: "action",
  },
];
const CategoriesList = () => {

    const [deleteId,setDeleteId]=useState(null)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(resetStateCategory());
        dispatch(getCategories());
    }, []);
    const {isSuccess,isError,isLoading,Categories,deletedCategory}= useSelector((state) => state.Category);
    useEffect(() => {
        if (isSuccess && deletedCategory) {
        toast.success("Category Deleted Successfullly!");
        }
        if (isError) {
        toast.error("Something Went Wrong!");
        }
    }, [isSuccess, isError, isLoading]);
    const data = [];
    for (let i = 0; i < Categories.length; i++) {
        data.push({
        key: i + 1,
        name: Categories[i].name,
        action: (
            <>     
                <Link to={`/admin/form-category/${ Categories[i].id}`} className=" fs-3 text-danger">
                    <BiEdit />
                </Link>
                <button
                className="ms-3 fs-3 text-danger bg-transparent border-0"
                onClick={() => showModal(Categories[i].id)}
                >
                    <AiFillDelete />
                </button>
            </>
        ),
        });
    }
    const deleteRecord = (e) => {
        dispatch(deleteCategory(e));
        dispatch(resetStateCategory())
        setOpen(false);
        setTimeout(() => {
        dispatch(getCategories());
        }, 100);
    };
    const [open, setOpen] = useState(false);
    const showModal = (e) => {
        setOpen(true);
        setDeleteId(e)
    };

  return (
    <div>        
      <h3 className="mb-4 title">Product Categories</h3>
      <div>
        <Table columns={columns} loading={isLoading} dataSource={data} />
      </div>
      <CustomAlert
        setOpen={setOpen}
        open={open}
        performAction={() => {
            deleteRecord(deleteId);
        }}
        title="Are you sure you want to delete this Product Category?"
      />
    </div>
  );
};

export default CategoriesList;
