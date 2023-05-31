import React from "react";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import { Column } from "@ant-design/plots";
import { DualAxes } from '@ant-design/plots';
import './Dashboard.css'
import { Table } from "antd";
import PathNavigation from "../../components/PathNavigation/PathNavigation";
// const columns = [
//   {
//     title: "SNo",
//     dataIndex: "key",
//   },
//   {
//     title: "Name",
//     dataIndex: "name",
//   },
//   {
//     title: "Product",
//     dataIndex: "product",
//   },
//   {
//     title: "Status",
//     dataIndex: "staus",
//   },
// ];
// const data1 = [];
// for (let i = 0; i < 46; i++) {
//   data1.push({
//     key: i,
//     name: `Edward King ${i}`,
//     product: 32,
//     staus: `London, Park Lane no. ${i}`,
//   });
// }
const Dashboard = () => {

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        filters: [
        {
            text: 'Joe',
            value: 'Joe',
        },
        {
            text: 'Category 1',
            value: 'Category 1',
            children: [
            {
                text: 'Yellow',
                value: 'Yellow',
            },
            {
                text: 'Pink',
                value: 'Pink',
            },
            ],
        },
        {
            text: 'Category 2',
            value: 'Category 2',
            children: [
            {
                text: 'Green',
                value: 'Green',
            },
            {
                text: 'Black',
                value: 'Black',
            },
            ],
        },
        ],
        filterMode: 'tree',
        filterSearch: true,
        onFilter: (value, record) => record.name.includes(value),
        width: '30%',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        sorter: (a, b) => a.age - b.age,
    },
    {
        title: 'Address',
        dataIndex: 'address',
        filters: [
        {
            text: 'London',
            value: 'London',
        },
        {
            text: 'New York',
            value: 'New York',
        },
        ],
        onFilter: (value, record) => record.address.startsWith(value),
        filterSearch: true,
        width: '40%',
    },
];
const data1 = [
{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
},
{
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
},
{
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
},
{
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
},
{
    key: '5',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
},
{
    key: '6',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
},
{
    key: '7',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
},
{
    key: '8',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
},
{
    key: '9',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
},
{
    key: '10',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
},
{
    key: '11',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
},
{
    key: '12',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
},
];
const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};
// ---chart---
const data = [
    {
      year: '9',
      value:9,
      count: 10,
    },
    {
      year: '1992',
      value: 4,
      count: 4,
    },
    {
      year: '1993',
      value: 3.5,
      count: 5,
    },
    {
      year: '1994',
      value: 5,
      count: 5,
    },
    {
      year: '1995',
      value: 4.9,
      count: 4.9,
    },
    {
      year: '1996',
      value: 6,
      count: 35,
    },
    {
      year: '1997',
      value: 7,
      count: 7,
    },
    {
      year: '1998',
      value: 9,
      count: 1,
    },
    {
      year: '1999',
      value: 13,
      count: 20,
    },
  ];
const config = {
data: [data, data],
xField: 'year',
yField: ['value', 'count'],
geometryOptions: [
    {
    geometry: 'line',
    color: '#5B8FF9',
    },
    {
    geometry: 'line',
    color: '#5AD8A6',
    },
],
};
// ---chart---
return (
    <div>
      
      <h2 className="mb-4">Dashboard</h2>
      <PathNavigation paths={['Home', 'Dashboard']} currentPage={'Analystic'} />
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="shadow-sm d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Total sells</p>
            <h4 className="mb-0 sub-title">3722 MAD</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6>
              <BsArrowDownRight /> 32%
            </h6>
            <p className="mb-0  desc">Compared To April 2022</p>
          </div>
        </div>
        <div className="shadow-sm d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Average order value</p>
            <h4 className="mb-0 sub-title">193 MAD</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="red">
              <BsArrowDownRight /> 32%
            </h6>
            <p className="mb-0  desc">Compared To April 2022</p>
          </div>
        </div>
        <div className="shadow-sm d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Toatal orders</p>
            <h4 className="mb-0 sub-title">424</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="green">
              <BsArrowDownRight /> 32%
            </h6>
            <p className="mb-0 desc">Compared To April 2022</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-5 dashboard-title-secions">CASH DEPOSITS</h3>
        <div className="d-flex gap-5">
        <div className="w-50">
            <DualAxes {...config} />
        </div>
          {/* <Column {...config} /> */}
          <div className="w-50">
            <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
                <h5 className="card-title text font-weight-bold h2">TOTAL SALES</h5>
                <h2 className="card-text">$ 28835</h2>
                <p className="card-text h4 text-muted">Gross sales over the years Today, many people rely on computers to do homework, work, and create or store useful information. Therefore, it is important</p>
            </div>
            </div>

          </div>
        </div>
      </div>
      <div className="mt-4">
        <h4 className="mb-5 dashboard-title-secions">RECENT PURCHASES</h4>
        <div>
          {/* <Table columns={columns} dataSource={data1} /> */}
          <Table columns={columns} loading={''} dataSource={''} onChange={onChange} pagination={{ pageSize: 6 }}/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
