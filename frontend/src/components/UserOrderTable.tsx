import { Table, notification, Tag, Button } from 'antd';
import React from 'react';
import { GET_ALL_ORDER, UPDATE_ORDER_STATUS } from '../utils/api';
import { Order } from '../utils/types';
import moment from 'moment';
import "./UserOrderTable.css"
import { colorList } from '../utils/helper';
import { useNavigate } from 'react-router-dom';

interface UserOrderTableProps {
  token: string
}

export default function UserOrderTable(props: UserOrderTableProps) {

  const navigate = useNavigate();
  
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
        record.orderStatus === "Delivered" ? (
          <>
            <Button type='primary' ghost
              onClick={() => statusChange(record, "yes")}>Request Refund</Button>
          </>
        ) : record.orderStatus === "PaymentWaiting" ? 
        <>
          <Button type='primary' ghost
            onClick={() => navigate(`/user/payment/${record.orderId}`)}>Pay</Button>
        </> : (
          <></>
        )
      ),
      width: 200
    },
  ];

  const [tableData, settableData] = React.useState<Order[]>([])
  
  const getData = () => {
    GET_ALL_ORDER(props.token).then(res => {
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
        getData();
      }
    })
  }

  React.useEffect(() => {
    getData();
  }, [])

  return (
    <>
      <div className="orderTitle">
        <p>My Order</p>
      </div>
      <Table 
        columns={columns} 
        dataSource={tableData}
        pagination={false}
      />
    </>

  );
}

