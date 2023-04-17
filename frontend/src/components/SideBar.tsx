import React from 'react';
import { SmileOutlined, OrderedListOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import "./SideBar.css"
import { useNavigate } from 'react-router-dom';

const { Sider } = Layout;

interface sideBarProps {
  pic: string
  key: string
}

export default function SideBar(props: sideBarProps) {

  const navigate = useNavigate();
  
  const handleMenuClick = (value: any) => {
    
    if (value.key === "1") {
      navigate("/admin/dish")
    } else if (value.key === "2") {
      navigate("/admin/order")
    }

  };

  return (
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
      >
        <img src={props.pic} alt='shopPic' className='sideBarPic'></img>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{marginTop: "50px"}}
          onClick={handleMenuClick}
          items={[SmileOutlined, OrderedListOutlined].map(
            (icon, index) => (
            index === 0 ? {
              key: String(index + 1),
              icon: React.createElement(icon),
              label: `Dish Management`,
            } : {
              key: String(index + 1),
              icon: React.createElement(icon),
              label: `Order Management`,
            }),
          )}
        />
      </Sider>
  )
}