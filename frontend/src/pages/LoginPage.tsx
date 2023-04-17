import React from 'react';
import "./css/LoginPage.css"
import { Form, Input, Button, notification } from 'antd';
import ELEM from "../assets/elem.jpeg"
import { LOG_IN } from '../utils/api';
import { LoginData } from '../utils/types';
import { useNavigate } from 'react-router-dom';

export default function Login() {

  const navigate = useNavigate();

  React.useEffect(() => {
    if (localStorage.getItem("userType") !== null) {
      notification.info({
        message: "Notification",
        description: "You have already logged in. Switching to the page you should be..."
      })
      if (localStorage.getItem("userType") === "Shop") {
        navigate("/admin/dish");
      } else {
        navigate("/user/shop")
      }
    }
  }, [])

  const onFinish = (values: LoginData) => {
    
    LOG_IN(values).then(res => {
      
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

        localStorage.setItem('userType', res.data.data.userType);
        localStorage.setItem('token', res.data.data.token);

        if (res.data.data.userType === "Shop") {
          navigate("/admin/dish")
        } else {
          navigate("/user/shop")
        }
      }
    })

  };

  const handleClick = () => {
    navigate("/register");
  }

  return (
    <div style={{width: "100%", height: "100%"}}>
      <div className='backgroundLogin'>
        <div className='inputContainer'>
          <div className='shopBox'>
            <img src={ELEM} alt='No' className='shopImg'></img>
            <p>R U Hungry</p>
          </div>
          
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            style={{ width: "450px", display: "flex", justifyContent: "flex-end" , flexDirection: "column"}}
          >
            <Form.Item
              label= {<p style={{fontSize: "20px", fontFamily: "sans-serif", fontWeight: "700", color: "white"}}>Username</p>}
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
              style={{ display: 'flex', justifyContent:"flex-end", fontSize: '16px' }}
            >
              <Input style={{width:"300px", height: "45px", marginLeft: "20px"}}/>
            </Form.Item>

            <Form.Item
              label={<p style={{fontSize: "20px", fontFamily: "sans-serif", fontWeight: "700", color: "white"}}>Password</p>}
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
              style={{ display: 'flex', justifyContent:"flex-end", fontSize: '16px'}}
            >
              <Input.Password style={{width:"300px", height: "45px", marginLeft: "20px"}} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" style={{marginTop: "30px", width: "100px", height:"35px"}}>
                Login
              </Button>
            </Form.Item>
          </Form>

          <p className='joinUs' onClick={handleClick}>Join US Right Now</p>
        </div>
      </div>
    </div>

  )
}