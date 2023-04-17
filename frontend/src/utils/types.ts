export interface LoginData {
  username: string,
  password: string 
}

export interface RegisterData {
  username: string,
  password: string,
  name: string,
  email: string
}

export interface Product {
  productDescription: string,
  productId: number,
  productIsStock: boolean,
  productPic: string,
  productPrice: number, 
  productReminder: string,
  productType: string
}

export interface UpdateProductData {
  productDescription: string,
  productPrice: number, 
  productReminder: string,
  productType: string
}

export interface AddProductData {
  productDescription: string,
  productPrice: number, 
  productReminder: string,
  productType: string,
  productPic: string
}

export interface Order {
  createTime: string,
  orderContent: string,
  orderId: number,
  orderStatus: string,
  orderPrice: number, 
  recipientAddress: string,
  recipientName: string,
  recipientPhone: string,
  userId: number
}

export interface OrderStatusData {
  accept: string
}

export interface AddCartData {
  number: string,
  productDescription: string
}