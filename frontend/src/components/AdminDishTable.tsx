import { Space, Table, notification, Modal, Form, Input, Button, Switch, Upload, message, Radio } from 'antd';
import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { ADD_PRODUCT, DELETE_PRODUCT, GET_PRODUCTS_PAGINATION, GET_PRODUCT_NUMBER, UPDATE_PRODUCT, UPDATE_PRODUCT_STOCK } from '../utils/api';
import { Product, UpdateProductData } from '../utils/types';
import "./AdminDishTable.css"

interface AdminDishTableProps {
  token: string
}

export default function AdminDishTable(props: AdminDishTableProps) {

  const columns = [
    {
      title: 'Picture',
      dataIndex: 'productPic',
      render: (text: string, record: Product) => (
        <img src={record.productPic} alt={record.productDescription} width="110" />
      ),
      key: 'productPic',
      width: 120
    },
    {
      title: 'Name',
      dataIndex: 'productDescription',
      key: 'productDescription',
      width: 200
    },
    {
      title: 'Price',
      dataIndex: 'productPrice',
      key: 'productPrice',
      width: 100
    },
    {
      title: 'Type',
      dataIndex: 'productType',
      key: 'productType',
      width: 200
    },
    {
      title: 'Reminder',
      dataIndex: 'productReminder',
      key: 'productReminder',
      width: 300
    },
    {
      title: 'Availability',
      dataIndex: 'productIsStock',
      key: 'productIsStock',
      width: 50,
      render: (text: boolean) => (
        text === true ? "Yes" : "No"
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: string, record: Product) => (
        <Space size="middle">
          <a onClick={() => showModal(record)}>Update</a>
          <a onClick={() => deleteProduct(record.productId)}>Delete</a>
          <a onClick={() => stockChangeProduct(record.productId)}>StockChange</a>
        </Space>
      ),
      width: 200
    },
  ];

  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(10);
  const [totalNumber, setTotalNumber] = React.useState<number>(0);
  const [tableData, settableData] = React.useState<Product[]>([])
  const [selectUpdateProductId, setSelectUpdateProductId] = React.useState<number>(0);

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isModalOpen2, setIsModalOpen2] = React.useState(false);

  const [updateForm] = Form.useForm();
  const [addForm] = Form.useForm();
  const [fileList, setFileList] = React.useState<any>([]);

  const showModal = (productInfo: Product) => {
    updateForm.setFieldsValue({
      productDescription: productInfo.productDescription,
      productPrice: productInfo.productPrice,
      productReminder: productInfo.productReminder,
      productType: productInfo.productType,
    });
    setSelectUpdateProductId(productInfo.productId)
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectUpdateProductId(0)
  };

  const showModal2 = () => {
    setIsModalOpen2(true);
  };

  const handleCancel2 = () => {
    setIsModalOpen2(false);
    addForm.resetFields();
    setFileList([]);
  };

  const handleUploadChange = (info: any) => {
    let fileList = [...info.fileList];

    // 限制上传文件的数量
    fileList = fileList.slice(-1);

    // 限制上传文件的类型
    fileList = fileList.filter(file => {
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        return true;
      }
      message.error('只能上传 JPG/PNG 格式的文件');
      return false;
    });

    setFileList(fileList);
  };


  const handleChangePage = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
    getData(pageSize, page)
  };

  const getProductNumber = () => {
    GET_PRODUCT_NUMBER(props.token).then(res => {
      
      if (res.data.code === 0) {
        notification.error({
          message: "Error",
          description: res.data.msg
        });

      } else if (res.data.code === 1) {
        setTotalNumber(res.data.data.number)
      }
    })
  }
  
  const getData = (pageSize: number, currentPage: number) => {
    GET_PRODUCTS_PAGINATION(props.token, pageSize, currentPage).then(res => {
      if (res.data.code === 0) {
        notification.error({
          message: "Error",
          description: res.data.msg
        });

      } else if (res.data.code === 1) {
        settableData(res.data.data)
      }
    })
  }

  const deleteProduct = (productId: number) => {
    DELETE_PRODUCT(props.token, productId).then(res => {
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
        getProductNumber();
        getData(pageSize, currentPage);
      }
    })
  }

  const stockChangeProduct = (productId: number) => {
    UPDATE_PRODUCT_STOCK(props.token, productId).then(res => {
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
        getProductNumber();
        getData(pageSize, currentPage);
      }
    })
  }

  const updateData = (value: UpdateProductData) => {
    UPDATE_PRODUCT(props.token, selectUpdateProductId, value).then(res => {
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
        getProductNumber();
        getData(pageSize, currentPage);
        handleCancel()
      }
    })
  }

  const addData = (value: UpdateProductData) => {

    let data = JSON.parse(JSON.stringify(value));

    if (fileList.length === 0) {
      notification.error({
        message: "Error",
        description: "No Pic Uploaded"
      })
      return;
    }

    data['productPic'] = fileList[0].thumbUrl;

    ADD_PRODUCT(props.token, data).then(res => {
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
        getProductNumber();
        getData(pageSize, currentPage);
        handleCancel2()
      }
    })
    
  }

  React.useEffect(() => {
    getProductNumber();
    getData(pageSize, currentPage);
  }, [])

  return (
    <>
      <div className="dishTitle">
        <p>Dish Management</p>
        <Button type="primary" onClick={() => showModal2()}>Add Dish</Button>
      </div>
      <Table 
      columns={columns} 
      dataSource={tableData}
      pagination={{
        pageSize: pageSize,
        total: totalNumber,
        onChange: handleChangePage,
        current: currentPage,
      }} />
      <Modal title="Update" open={isModalOpen} onCancel={handleCancel} footer={<></>}>
        <Form
          form={updateForm}
          name="update"
          initialValues={{ remember: true }}
          onFinish={updateData}
          style={{ width: "500px", display: "flex", alignItems: "center", justifyContent: "flex-end", flexDirection: "column", marginTop: "40px"}}
          labelCol={{ span: 3 }} wrapperCol={{ span: 16 }}
        >
          <Form.Item
            label="Name"
            name="productDescription"
            rules={[{ required: true, message: 'Please input the Name!' }]}
            style={{ fontSize: '16px', width: "400px" }}
          >
            <Input style={{width:"300px", height: "35px", marginLeft: "20px"}}/>
          </Form.Item>
          <Form.Item
            label="Price"
            name="productPrice"
            rules={[{ required: true, message: 'Please input the Price!' }]}
            style={{ fontSize: '16px', width: "400px"  }}
          >
            <Input style={{width:"300px", height: "35px", marginLeft: "20px"}}/>
          </Form.Item>
          <Form.Item
            label="Type"
            name="productType"
            rules={[{ required: true, message: 'Please input the Type!' }]}
            style={{ fontSize: '16px', width: "400px"  }}
          >
            <Input style={{width:"300px", height: "35px", marginLeft: "20px"}}/>
          </Form.Item>
          <Form.Item
            label="Reminder"
            name="productReminder"
            rules={[{ required: true, message: 'Please input the Reminder!' }]}
            style={{ fontSize: '16px', width: "400px"  }}
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
      
      <Modal title="AddProduct" open={isModalOpen2} onCancel={handleCancel2} footer={<></>}>
        <Form
          form={addForm}
          name="update"
          initialValues={{ remember: true }}
          onFinish={addData}
          style={{ width: "500px", display: "flex", alignItems: "center", justifyContent: "flex-end", flexDirection: "column", marginTop: "40px"}}
          labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}
        >
          <Form.Item
            label="Name"
            name="productDescription"
            rules={[{ required: true, message: 'Please input the Name!' }]}
            style={{ fontSize: '16px', width: "400px" }}
          >
            <Input style={{width:"300px", height: "35px", marginLeft: "20px"}}/>
          </Form.Item>
          <Form.Item
            label="Price"
            name="productPrice"
            rules={[{ required: true, message: 'Please input the Price!' }]}
            style={{ fontSize: '16px', width: "400px"  }}
          >
            <Input style={{width:"300px", height: "35px", marginLeft: "20px"}}/>
          </Form.Item>
          <Form.Item
            label="Type"
            name="productType"
            rules={[{ required: true, message: 'Please input the Type!' }]}
            style={{ fontSize: '16px', width: "400px"  }}
          >
            <Input style={{width:"300px", height: "35px", marginLeft: "20px"}}/>
          </Form.Item>
          <Form.Item
            label="Reminder"
            name="productReminder"
            rules={[{ required: true, message: 'Please input the Reminder!' }]}
            style={{ fontSize: '16px', width: "400px"  }}
          >
            <Input style={{width:"300px", height: "35px", marginLeft: "20px"}}/>
          </Form.Item>
          
          <Form.Item 
            label="Availability" 
            name="productIsStock" 
            style={{ fontSize: '16px', width: "400px" }}
            rules={[{ required: true, message: 'Please input the Availability!' }]}
          >
            <Radio.Group style={{marginLeft: "20px"}}>
              <Radio.Button value="true">True</Radio.Button>
              <Radio.Button value="false">False</Radio.Button>
            </Radio.Group>
          </Form.Item>

        
          <Upload listType="picture" name="file" fileList={fileList} onChange={handleUploadChange}>
            <div>
              <Button style={{ marginTop: 8 }}>Upload</Button>
            </div>
          </Upload>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{marginTop: "20px", width: "100px", height:"35px"}}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>

  );
}
