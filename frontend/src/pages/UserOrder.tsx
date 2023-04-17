import React from 'react';
import { Layout, theme } from 'antd';
import "./css/UserShop.css"
import UserHeader from '../components/UserHeader';
import { GET_USER_INFO } from '../utils/api';
import UserFooter from '../components/UserFooter';
import UserOrderTable from '../components/UserOrderTable';
const { Content, Footer } = Layout;

export default function UserOrder() {
    const {
      token: { colorBgContainer },
    } = theme.useToken();

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

    return (
      <Layout className="layout">
        <UserHeader pic={pic} username={username} token={token} />
        <Content style={{ padding: '50px 50px 50px 50px' }}>
          <div className="site-layout-content" style={{ background: colorBgContainer }}>
            <UserOrderTable token={token} />
          </div>
        </Content>
        <UserFooter></UserFooter>
      </Layout>
      
    );
}
