import React, { useState } from 'react';
import { Layout, theme, Button, notification } from 'antd';
import "./css/UserShop.css"
import UserHeader from '../components/UserHeader';
import { GET_ORDER, GET_USER_INFO, UPDATE_ORDER_STATUS } from '../utils/api';
import UserFooter from '../components/UserFooter';
import { useNavigate, useParams } from "react-router-dom";
import CreditCard from '../components/CreditCard';
const { Content } = Layout;



export default function UserPayment() {
    const {
      token: { colorBgContainer },
    } = theme.useToken();

    let { id } = useParams(); 

    const navigate = useNavigate();
    
    const token: string = localStorage.getItem("token") || ""
    const [pic, setPic] = React.useState<string>("");
    const [username, setUsername] = React.useState<string>("");
    const [check, setCheck] = React.useState<boolean>(false)
    const [price, setPrice] = React.useState<number>(0);

    React.useEffect(() => {
  
      GET_USER_INFO(token).then(res => {
        if (res.data.code === 1) {
          setPic(res.data.data.userPics)
          setUsername(res.data.data.username)
        }
      })

      if (id !== undefined) {
        GET_ORDER(token, parseInt(id)).then(res => {
          setPrice(res.data.data.orderPrice);
        })
      }

    }, []);

    const handleCheck = () => {
      if (id !== undefined) {
        UPDATE_ORDER_STATUS(token, parseInt(id), {
          accept: "yes"
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
            navigate("/user/order")
          }
        })
      }
    }

    return (
      <Layout className="layout">
        <UserHeader pic={pic} username={username} token={token} />
        <Content style={{ padding: '50px 50px 50px 50px' }}>
          <div className="site-layout-content" style={{ background: colorBgContainer, display:"flex", flexDirection: "row", justifyContent: "center" }}>
            <CreditCard setCheck={setCheck}/>
            <div style={{marginLeft: "100px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
              <p style={{fontSize: "20px"}}>{`Price: ${price}`}</p>
              <Button disabled={!check} style={{marginTop: "30px", height: "40px", width: "80px"}} onClick={handleCheck}>Pay</Button>
            </div>
          </div>
        </Content>
        <UserFooter></UserFooter>
      </Layout>
      
    );
}
