import React from 'react';
import { Button, Layout, notification, theme } from 'antd';
import "./AdminHeader.css";
import { LOG_OUT } from '../utils/api';
import { useNavigate } from 'react-router-dom';
const { Header } = Layout;

interface adminHeaderProps {
  userName: string,
  token: string
}

export default function AdminHeader(props: adminHeaderProps) {

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
  const {
      token: { colorBgContainer },
    } = theme.useToken();

  return (
    <Header style={{ padding: 0, background: colorBgContainer, }}>
      <div className='adminHeaderSession'>
        <p>{props.userName}</p>
        <Button onClick={handleLogout} type="dashed">Logout</Button>
      </div>
    </Header>
  )
}