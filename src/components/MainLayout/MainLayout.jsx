import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import './MainLayout.css'
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineBgColors,
} from "react-icons/ai";
import { RiCouponLine } from "react-icons/ri";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { ImBlog } from "react-icons/im";
import { IoIosNotifications } from "react-icons/io";
import { FaClipboardList, FaBloggerB } from "react-icons/fa";
import { SiBrandfolder } from "react-icons/si";
import { BiCategoryAlt } from "react-icons/bi";
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const { user, isError, isSuccess, isLoading, message} = useSelector((state) => state.auth);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <Layout /* onContextMenu={(e) => e.preventDefault()} */>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="header-sidebar">
          <h2 className="text-white fs-5 text-center py-3 mb-0">
            <span className="sm-header-sidebar">YT</span>
            <span className="lg-header-sidebar">Younes Talibi</span>
          </h2>
        </div>
        <div className="header-sidebar border-top border-white">
          <h2 className="text-white d-flex align-items-center justify-content-evenly fs-5 text-center py-3 mb-0">
          <div>
                <img
                  width={40}
                  height={40}
                  className="rounded-circle"
                  src="https://avatars.githubusercontent.com/u/118536564?v=4"
                  alt=""
                />
              </div>
            <span className="lg-header-sidebar">Younes Talibi</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key == "signout") {
            } else {
              // alert(key)
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <AiOutlineDashboard className="fs-4" />,
              label: "Dashboard",
            },
            {
              key: "customers",
              icon: <AiOutlineUser className="fs-4" />,
              label: "Customers",
            },
            {
              key: "Catalog",
              icon: <AiOutlineShoppingCart className="fs-4" />,
              label: "Catalog",
              children: [
                {
                  key: "form-product",
                  icon: <AiOutlineShoppingCart className="fs-4" />,
                  label: "Add Product",
                },
                {
                  key: "list-products",
                  icon: <AiOutlineShoppingCart className="fs-4" />,
                  label: "Products List",
                },
                {
                  key: "form-brand",
                  icon: <SiBrandfolder className="fs-4" />,
                  label: "Add Brand",
                },
                {
                  key: "list-brands",
                  icon: <SiBrandfolder className="fs-4" />,
                  label: "Brands List ",
                },
                {
                  key: "form-category",
                  icon: <BiCategoryAlt className="fs-4" />,
                  label: "Add Category",
                },
                {
                  key: "list-categories",
                  icon: <BiCategoryAlt className="fs-4" />,
                  label: "Categories List",
                },
                // {
                //   key: "color",
                //   icon: <AiOutlineBgColors className="fs-4" />,
                //   label: "Color",
                // },
                // {
                //   key: "list-color",
                //   icon: <AiOutlineBgColors className="fs-4" />,
                //   label: "Color List",
                // },
              ],
            },
            {
              key: "list-orders",
              icon: <FaClipboardList className="fs-4" />,
              label: "Orders",
            },
            {
              key: "marketing",
              icon: <RiCouponLine className="fs-4" />,
              label: "Marketing",
              children: [
                {
                  key: "coupon",
                  icon: <ImBlog className="fs-4" />,
                  label: "Add Coupon",
                },
                {
                  key: "coupon-list",
                  icon: <RiCouponLine className="fs-4" />,
                  label: "Coupon List",
                },
              ],
            },
            // {
            //   key: "blogs",
            //   icon: <FaBloggerB className="fs-4" />,
            //   label: "Blogs",
            //   children: [
            //     {
            //       key: "blog",
            //       icon: <ImBlog className="fs-4" />,
            //       label: "Add Blog",
            //     },
            //     {
            //       key: "blog-list",
            //       icon: <FaBloggerB className="fs-4" />,
            //       label: "Blog List",
            //     },
            //     {
            //       key: "blog-category",
            //       icon: <ImBlog className="fs-4" />,
            //       label: "Add Blog Category",
            //     },
            //     {
            //       key: "blog-category-list",
            //       icon: <FaBloggerB className="fs-4" />,
            //       label: "Blog Category List",
            //     },
            //   ],
            // },
            // {
            //   key: "enquiries",
            //   icon: <FaClipboardList className="fs-4" />,
            //   label: "Enquiries",
            // },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="d-flex justify-content-between ps-1 pe-5"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div className="d-flex gap-4 align-items-center">
            <div className="position-relative">
              <IoIosNotifications className="fs-4" />
              <span 
              style={{width:'15px',height:'15px',padding:'9px'}}
              className="d-flex justify-content-center  align-items-center badge bg-danger rounded-circle position-absolute">
                23
              </span>
            </div>
            <div className="d-flex gap-3 align-items-center dropdown">
              <div>
                <img
                  width={40}
                  height={40}
                  className="rounded-circle"
                  src="https://avatars.githubusercontent.com/u/118536564?v=4"
                  alt="profile image"
                />
              </div>
              <div
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h5 className="mb-0">{user&&user.name}</h5>
                <p className="mb-0">{user&&user.email}</p>
              </div>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                  >
                    View Profile
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                  >
                    Signout
                  </Link>
                </li>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "25px 20px",
            background: colorBgContainer,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
