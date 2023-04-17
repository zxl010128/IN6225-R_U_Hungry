import React from 'react';
import { Button, Divider, Form, Input, Layout, Modal, Radio, notification, theme } from 'antd';
import "./css/UserShop.css"
import UserHeader from '../components/UserHeader';
import { ADD_ORDER, DELETE_TO_CART, GET_CART, GET_PRICE, GET_PRODUCTS, GET_USER_INFO, UPDATE_ADDRESS, UPDATE_TO_CART } from '../utils/api';
import UserFooter from '../components/UserFooter';
import { useNavigate } from 'react-router-dom';
const { Content } = Layout;

export default function UserCart() {
    const {
      token: { colorBgContainer },
    } = theme.useToken();

    const token: string = localStorage.getItem("token") || ""
    const [pic, setPic] = React.useState<string>("");
    const [username, setUsername] = React.useState<string>("");
    const [refresh, setRefresh] = React.useState<boolean>(true);
    const [name, setName] = React.useState<string>("");

    const [dishData, setDishData] = React.useState([])
    const [cartData, setCartData] = React.useState({})
    const [price, setPrice] = React.useState<number>(0);

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [updateForm] = Form.useForm();
    const [addressForm] = Form.useForm();

    const navigate = useNavigate();

    const showModal = (value: any, key: string) => {
      updateForm.setFieldsValue({
        productNum: value
      });
      setName(key);
      setIsModalOpen(true);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
      updateForm.resetFields();
    };

    React.useEffect(() => {
  
      GET_USER_INFO(token).then(res => {
        if (res.data.code === 1) {
          setPic(res.data.data.userPics)
          setUsername(res.data.data.username)

          if (res.data.data.addrAddress !== null) {
            addressForm.setFieldsValue({
              recipientAddress: res.data.data.addrAddress,
              recipientName: res.data.data.addrName,
              recipientPhone: res.data.data.addrPhone,
            });
          }
        }
      })

      GET_CART(token).then(res => {
        setCartData(res.data.data)
        GET_PRICE(token, res.data.data).then(res => {
          setPrice(res.data.data.data)
        })
      })

      GET_PRODUCTS(token).then(res => {
        setDishData(res.data.data)
      })

    }, [refresh]);

    const handleDelete = (productDescription: string) => {
      DELETE_TO_CART(token, {
        productDescription: productDescription
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
          setRefresh(!refresh)
        }
      }) 
    }

    const updateData = (value: any) => {
      
      if (value.productNum <= 0) {
        notification.error({
          message: "Error",
          description: "Number must large than 0"
        })
        return;
      }
      UPDATE_TO_CART(token, {
        productNum: value.productNum,
        productDescription: name
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
        handleCancel()
        setName("")
        setRefresh(!refresh)
      }
      })

    }

    const addressData = (value: any) => {

      if (value.isDefault === 'true') {
        UPDATE_ADDRESS({
          addrAddress: value.recipientAddress,
          addrName: value.recipientName,
          addrPhone: value.recipientPhone
        }, token).then(res => {
          if (res.data.code === 0) {
            notification.error({
            message: "Error",
            description: res.data.msg
            });
          }

        });
      } 

      ADD_ORDER(token, {
        recipientAddress: value.recipientAddress,
        recipientName: value.recipientName,
        recipientPhone: value.recipientPhone,
        orderStatus: "PaymentWaiting",
        orderPrice: (price + 5).toFixed(2),
        orderContent: JSON.stringify(cartData),
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
          navigate("/user/order");
        }
      })
      

    }

    return (
      <Layout className="layout">
        <UserHeader pic={pic} username={username} token={token} />
        <Content style={{ padding: '50px 50px 50px 50px' }}>
          <div className="s te-layout-content" style={{ background: colorBgContainer }}>
            <div className='shoppingCartBig'>
              <p>Shopping Cart</p>
              <div>
                {Object.entries(cartData).map(([key, value]: any) => (
                  <>
                    <div className='smallList'>
                      <div>{`${key} X ${value}`}</div>
                      <div className='smallButtonList'>
                        <div>{`${dishData.filter(map => map['productDescription'] === key).map(map => map['productPrice'])} pre pax`}</div>
                        <Button type="primary" onClick={() => showModal(value, key)}>Edit</Button>
                        <Button danger onClick={() => handleDelete(key)}>Delete</Button>
                      </div>

                    </div>
                    
                    <Divider />
                  </>  
                ))}
              </div>
              <p>Calculation</p>
              <div className='calcu'>
                <p>{`Delivery Fee: $5`}</p>
                <p>{`Price: $${price.toFixed(2)}`}</p>
                <p>{`Total: $${(price + 5).toFixed(2)}`}</p>
              </div>
              <Divider />
              <p>Address</p>
              <Form
                form={addressForm}
                name="Address"
                initialValues={{ remember: true }}
                onFinish={addressData}
                style={{ margin: "0 auto", width: "1000px", display: "flex", alignItems: "center", justifyContent: "flex-end", flexDirection: "column", marginTop: "40px"}}
                labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}
              >
                <Form.Item
                  label="Recipient Address"
                  name="recipientAddress"
                  rules={[{ required: true, message: 'Please input the Address!' }]}
                  style={{ fontSize: '20px', width: "600px" }}
                >
                  <Input style={{width:"300px", height: "35px", marginLeft: "20px"}}/>
                </Form.Item>

                <Form.Item
                  label="Recipient Name"
                  name="recipientName"
                  rules={[{ required: true, message: 'Please input the Name!' }]}
                  style={{ fontSize: '20px', width: "600px" }}
                >
                  <Input style={{width:"300px", height: "35px", marginLeft: "20px"}}/>
                  </Form.Item>

                  <Form.Item
                  label="Recipient Phone"
                  name="recipientPhone"
                  rules={[{ required: true, message: 'Please input the Number!' }]}
                  style={{ fontSize: '20px', width: "600px" }}
                >
                  <Input style={{width:"300px", height: "35px", marginLeft: "20px"}}/>
                  </Form.Item>

                  <Form.Item 
                    label="Default" 
                    name="isDefault" 
                    style={{ fontSize: '16px', width: "600px" }}
                    rules={[{ required: true, message: 'Please input!' }]}
                  >
                    <Radio.Group style={{marginLeft: "20px"}}>
                      <Radio.Button value="true">True</Radio.Button>
                      <Radio.Button value="false">False</Radio.Button>
                    </Radio.Group>
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit" style={{marginTop: "20px", width: "100px", height:"35px"}}>
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
            </div>
            
          </div>
        </Content>
        <UserFooter></UserFooter>
        <Modal title="Update Product Number" open={isModalOpen} onCancel={handleCancel} footer={<></>}>
          <Form
            form={updateForm}
            name="update"
            initialValues={{ remember: true }}
            onFinish={updateData}
            style={{ width: "500px", display: "flex", alignItems: "center", justifyContent: "flex-end", flexDirection: "column", marginTop: "40px"}}
            labelCol={{ span: 4 }} wrapperCol={{ span: 14 }}
          >
            <Form.Item
              label="Number"
              name="productNum"
              rules={[{ required: true, message: 'Please input the Number!' }]}
              style={{ fontSize: '16px', width: "400px" }}
            >
              <Input style={{width:"300px", height: "35px", marginLeft: "20px"}}/>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" style={{marginTop: "20px", width: "100px", height:"35px"}}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Modal>
      </Layout>
      
    );            
}
