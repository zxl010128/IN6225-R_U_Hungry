import React from 'react';
import "./css/RegisterPage.css"
import { Form, Input, Button, notification } from 'antd';
import ELEM from "../assets/elem.jpeg"
import { REGISTER } from '../utils/api';
import { RegisterData } from '../utils/types';
import { useNavigate } from 'react-router-dom';

export default function Register() {

  const navigate = useNavigate();

  const onFinish = (values: RegisterData) => {
    
    REGISTER(values).then(res => {
      
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

  };

  const handleClick = () => {
    navigate("/login");
  }

  return (
    <div style={{width: "100%", height: "100%"}}>
      <div className='backgroundRegister'>
        <div className='inputContainerR'>
          <div className='shopBoxR'>
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
              label= {<p style={{fontSize: "20px", fontFamily: "sans-serif", fontWeight: "700", color: "white"}}>Name</p>}
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
              style={{ display: 'flex', justifyContent:"flex-end", fontSize: '16px' }}
            >
              <Input style={{width:"300px", height: "35px", marginLeft: "20px"}}/>
            </Form.Item>
            
            <Form.Item
              label= {<p style={{fontSize: "20px", fontFamily: "sans-serif", fontWeight: "700", color: "white"}}>Username</p>}
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
              style={{ display: 'flex', justifyContent:"flex-end", fontSize: '16px' }}
            >
              <Input style={{width:"300px", height: "35px", marginLeft: "20px"}}/>
            </Form.Item>

            <Form.Item
              label= {<p style={{fontSize: "20px", fontFamily: "sans-serif", fontWeight: "700", color: "white"}}>Email</p>}
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
              style={{ display: 'flex', justifyContent:"flex-end", fontSize: '16px' }}
            >
              <Input style={{width:"300px", height: "35px", marginLeft: "20px"}}/>
            </Form.Item>

            <Form.Item
              label={<p style={{fontSize: "20px", fontFamily: "sans-serif", fontWeight: "700", color: "white"}}>Password</p>}
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
              style={{ display: 'flex', justifyContent:"flex-end", fontSize: '16px'}}
            >
              <Input.Password style={{width:"300px", height: "35px", marginLeft: "20px"}} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" style={{marginTop: "30px", width: "100px", height:"35px"}}>
                Register
              </Button>
            </Form.Item>
          </Form>

          <p className='joinUs' onClick={handleClick}>Already have an account?</p>
        </div>
      </div>
    </div>

  )
}