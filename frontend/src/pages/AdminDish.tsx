import React from 'react';
import { Button, Layout, Menu, theme } from 'antd';
import SideBar from '../components/SideBar';
import { GET_USER_INFO } from '../utils/api';
import AdminHeader from '../components/AdminHeader';
import AdminDishTable from '../components/AdminDishTable';
import "./css/AdminDish.css"
const { Content, Footer } = Layout;

export default function AdminDish() {

  const token: string = localStorage.getItem("token") || ""
  const [pic, setPic] = React.useState<string>("");
  const [username, setUsername] = React.useState<string>("");

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
    <Layout className='adminDishLayout'>
      <SideBar pic={pic} key="dish"/>
      <Layout>
        <AdminHeader userName={username} token={token}></AdminHeader>
        <Content style={{ margin: '32px 32px 0' }}>
          <div style={{ padding: 24, minHeight: 900, background: colorBgContainer }}>
            <AdminDishTable token={token}/>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>IN6225 Individual Assignment from Zhang Xinlei</Footer>
      </Layout>
    </Layout>
  )
}