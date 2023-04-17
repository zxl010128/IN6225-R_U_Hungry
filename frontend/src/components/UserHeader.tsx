import React from 'react';
import { Button, Layout, notification } from 'antd';
import { ShoppingCartOutlined, OrderedListOutlined, LogoutOutlined } from '@ant-design/icons';
import "./UserHeader.css"
import { useNavigate } from 'react-router-dom';
import { LOG_OUT } from '../utils/api';
const { Header } = Layout;

interface UserShopProps {
	username: string,
	pic: string,
	token: string
}

export default function UserShop(props: UserShopProps) {

	const navigate = useNavigate();

	const handleLogout = () => {
    LOG_OUT(props.token).then(res => {
      
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

        localStorage.removeItem('userType');
        localStorage.removeItem('token');

        navigate("/login")

      }
    })
  }

	return (
		<>
			<Header style={{height: "100px"}}>
				<div className='userContainer'>
					<div className='userInfo'>
						<img src={props.pic} alt='avator' onClick={() => {navigate("/user/shop")}}></img>
						<p>{props.username}</p>
					</div>
				<div className='buttonList'>
					<Button type="text" onClick={() => {navigate("/user/order")}}>
						<OrderedListOutlined style={{fontSize: "35px", color:"white"}} />
					</Button>
					<Button type="text" onClick={() => {navigate("/user/cart")}}>
						<ShoppingCartOutlined style={{fontSize: "40px", color:"white"}} />
					</Button>
					<Button type="text" onClick={handleLogout}>
						<LogoutOutlined style={{fontSize: "33px", color:"white"}} />
					</Button>
				</div>
				</div>
				
			</Header>
		</>
	);
}
