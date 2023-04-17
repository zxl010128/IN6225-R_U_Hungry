import React from 'react';
import { Button, Layout, Menu, theme } from 'antd';
import { GET_USER_INFO } from '../utils/api';
import AdminHeader from '../components/AdminHeader';
import { SmileOutlined, OrderedListOutlined } from '@ant-design/icons';
import "./css/AdminOrder.css"
import AdminOrderTable from '../components/AdminOrderTable';
import Sider from 'antd/es/layout/Sider';
import { useNavigate } from 'react-router-dom';
const { Content, Footer } = Layout;

export default function AdminOrder() {

  const token: string = localStorage.getItem("token") || ""
  const [pic, setPic] = React.useState<string>("");
  const [username, setUsername] = React.useState<string>("");

  const navigate = useNavigate();
  
  const handleMenuClick = (value: any) => {
    
    if (value.key === "1") {
      navigate("/admin/dish")
    } else if (value.key === "2") {
      navigate("/admin/order")
    }

  };

  React.useEffect(() => {

    GET_USER_INFO(token).then(res => {
      if (res.data.code === 1) {
        setPic(res.data.data.userPics)
        setUsername(res.data.data.username)
      }
    })
  }, []);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className='adminOrderLayout'>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
      >
        <img src={pic} alt='shopPic' className='sideBarPic'></img>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["2"]}
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
      <Layout>
        <AdminHeader userName={username} token={token}></AdminHeader>
        <Content style={{ margin: '32px 32px 0' }}>
          <div style={{ padding: 24, minHeight: 900, background: colorBgContainer }}>
            <AdminOrderTable token={token}/>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>IN6225 Individual Assignment from Zhang Xinlei</Footer>
      </Layout>
    </Layout>
  )
}