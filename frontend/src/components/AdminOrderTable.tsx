import { Space, Table, notification, Tag, Button } from 'antd';
import React from 'react';
import { GET_ORDERS_PAGINATION, GET_ORDER_NUMBER, UPDATE_ORDER_STATUS } from '../utils/api';
import { Order, Product } from '../utils/types';
import moment from 'moment';
import "./AdminOrderTable.css"
import { colorList } from '../utils/helper';

interface AdminOrderTableProps {
  token: string
}

export default function AdminOrderTable(props: AdminOrderTableProps) {

  const columns = [
    {
      title: 'Recipient Name',
      dataIndex: 'recipientName',
      key: 'recipientName',
      width: 120
    },
    {
      title: 'Recipient Phone',
      dataIndex: 'recipientPhone',
      key: 'recipientPhone',
      width: 120
    },
    {
      title: 'Recipient Address',
      dataIndex: 'recipientAddress',
      key: 'recipientAddress',
      width: 200
    },
    {
      title: 'Time',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 200,
      render: (text: string, record: Order) => (
        moment(text).format('YYYY-MM-DD HH:mm:ss')
      ),
    },
    {
      title: 'Order Content',
      dataIndex: 'orderContent',
      key: 'orderContent',
      width: 150,
      render: (text: string, record: Order) => (
        Object.entries(JSON.parse(text)).map((value) => {
          return (
            <p>{`${value[0]} X${value[1]} `}</p>
          )
        })
      ),
    },
    {
      title: 'Order Price',
      dataIndex: 'orderPrice',
      key: 'orderPrice',
      width: 80,
    },
    {
      title: 'Status',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
      width: 100,
      render: (text: string, record: Order) => (
        <Tag color={colorList[text]} style={{color: "black", fontSize: "16px", height: "25px"}}>{text}</Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: string, record: Order) => (
        record.orderStatus === "Received" ? (
          <>
            <Button type='primary' ghost
              onClick={() => statusChange(record, "yes")}>Accept</Button>
            <Button style={{marginLeft: "20px"}} danger ghost
              onClick={() => statusChange(record, "no")}>Reject</Button>
          </>
        ) : record.orderStatus === "Cooking" ? (
          <Button type='primary' ghost
            onClick={() => statusChange(record, "yes")}>Send Out</Button>
        ) : record.orderStatus === "Delivering" ? (
          <Button type='primary' ghost
            onClick={() => statusChange(record, "yes")}>Delivered</Button> 
        ) : record.orderStatus === "Refunding" ? (
          <>
            <Button type='primary' ghost
              onClick={() => statusChange(record, "yes")}>Accept</Button>
            <Button style={{marginLeft: "20px"}} danger ghost
              onClick={() => statusChange(record, "no")}>Reject</Button>
          </>
        ) : (
          <></>
        )
      ),
      width: 200
    },
  ];

  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(10);
  const [totalNumber, setTotalNumber] = React.useState<number>(0);
  const [tableData, settableData] = React.useState<Order[]>([])

  const handleChangePage = (page: number, pageSize: number) => {
    console.log(page)
    setCurrentPage(page);
    setPageSize(pageSize);
    getData(pageSize, page)
  };

  const getProductNumber = () => {
    GET_ORDER_NUMBER(props.token).then(res => {
      
      if (res.data.code === 0) {
        notification.error({
          message: "Error",
          description: res.data.msg
        });

      } else if (res.data.code === 1) {
        setTotalNumber(res.data.data.number)
      }
    })
  }
  
  const getData = (pageSize: number, currentPage: number) => {
    GET_ORDERS_PAGINATION(props.token, pageSize, currentPage).then(res => {
      if (res.data.code === 0) {
        notification.error({
          message: "Error",
          description: res.data.msg
        });

      } else if (res.data.code === 1) {
        settableData(res.data.data)
      }
    })
  }

  const statusChange = (record: Order, accept: string) => {
    UPDATE_ORDER_STATUS(props.token, record.orderId, {
      accept: accept
    }).then(res => {
      if (res.data.code === 0) {
        notification.error({
          message: "Error",
          description: res.data.msg
        });

      } else if (res.data.code === 1) {
        notification.success({
          message: "Success",
          description: res.data.msg
        });
        getProductNumber();
        getData(pageSize, currentPage);
      }
    })
  }

  React.useEffect(() => {
    getProductNumber();
    getData(pageSize, currentPage);
  }, [])

  return (
    <>
      <div className="orderTitle">
        <p>Order Management</p>
      </div>
      <Table 
      columns={columns} 
      dataSource={tableData}
      pagination={{
        pageSize: pageSize,
        total: totalNumber,
        onChange: handleChangePage,
        current: currentPage,
      }}
      />
    </>

  );
}

