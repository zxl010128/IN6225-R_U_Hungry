import React from 'react';
import { Avatar, Button, Card, Layout, notification, theme } from 'antd';
import "./css/UserShop.css"
import UserHeader from '../components/UserHeader';
import { ADD_TO_CART, GET_PRODUCT_TYPE, GET_USER_INFO } from '../utils/api';
import UserFooter from '../components/UserFooter';
import Meta from 'antd/es/card/Meta';
const { Content} = Layout;

export default function UserShop() {
    const {
      token: { colorBgContainer },
    } = theme.useToken();

    const token: string = localStorage.getItem("token") || ""
    const [pic, setPic] = React.useState<string>("");
    const [username, setUsername] = React.useState<string>("");
    const [data, setData] = React.useState({});


    React.useEffect(() => {
  
      GET_USER_INFO(token).then(res => {
        if (res.data.code === 1) {
          setPic(res.data.data.userPics)
          setUsername(res.data.data.username)
        }
      })

      GET_PRODUCT_TYPE(token).then(res => {
        // console.log(res.data.data.data)
        if (res.data.code === 1) {
          setData(res.data.data.data);
        }
      })
    }, []);

    const handleAddCart = (productDescription: string) => {
      ADD_TO_CART(token, {
        productDescription: productDescription,
        number: "1"
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
        }
      })
    }

    return (
      <Layout className="layout">
        <UserHeader pic={pic} username={username} token={token} />
        <Content style={{ padding: '50px 50px 0px 50px' }}>
          <div className="site-layout-content" style={{ background: colorBgContainer }}>
            {Object.entries(data).map(([key, value]: any) => (
              <div className='cardBigBox'>
                <p>{key}</p>
                <div className='cardBox'>
                  {value.map((item: any) => { return (
                    <Card
                      style={{ width: 400, margin: "20px" }}
                      cover={
                        <img
                          alt="example"
                          src={item.productPic}
                        />
                    }
                    >
                      <Meta
                        title={item.productDescription}
                        description={
                          <>
                            <div>{item.productReminder}</div>
                            <p style={{fontSize: "20px", marginTop: "10px"}}>${item.productPrice}</p>
                            {item.productIsStock === true ? 
                              <Button type="primary" onClick={() => handleAddCart(item.productDescription)}>Add to Cart</Button> : 
                              <Button disabled>Unavailable</Button>  
                            }
                          </>
                          
                        }
                      />
                    </Card>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </Content>
        <UserFooter></UserFooter>
      </Layout>
    );
}
