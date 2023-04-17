import { DELETE, GET, POST, PUT } from "./request";
import { AddCartData, AddProductData, LoginData, OrderStatusData, RegisterData, UpdateProductData } from "./types";

// User API
export const LOG_IN = (data: LoginData) => {return POST('/user/login', data);};
export const LOG_OUT = (token: string) => {return POST('/user/logout', {}, token);};
export const REGISTER = (data: RegisterData) => {return POST('/user/register', data);};
export const GET_USER_INFO = (token: string) => {return GET('/user/info', token);};
export const UPDATE_ADDRESS = (data: any, token: string) => {return PUT('/user/updateAddress', data, token);};

// Product API
export const GET_PRODUCT_NUMBER = (token: string) => {return GET('/product/countAll', token);};
export const GET_PRODUCTS_PAGINATION = (token: string, size: number, page: number) => {return GET(`/product/page?page=${page}&size=${size}`, token);}
export const DELETE_PRODUCT = (token: string, id: number) => {return DELETE(`/product/${id}`, {}, token);}
export const UPDATE_PRODUCT_STOCK = (token: string, id: number) => {return PUT(`/product/stockChange/${id}`, {}, token);}
export const UPDATE_PRODUCT = (token: string, id: number, data: UpdateProductData) => {return PUT(`/product/${id}`, data, token);}
export const ADD_PRODUCT = (token: string, data: AddProductData) => {return POST(`/product/add`, data, token);}
export const GET_PRODUCT_TYPE = (token: string) => {return GET('/product/byType', token);};
export const GET_PRODUCTS = (token: string) => {return GET('/product/list', token);};
export const GET_PRICE = (token: string, data: any) => {return POST('/product/calculatePrice', data, token);};

// Order API
export const GET_ORDER_NUMBER = (token: string) => {return GET('/order/countAll', token);};
export const GET_ORDERS_PAGINATION = (token: string, size: number, page: number) => {return GET(`/order/page?page=${page}&size=${size}`, token);}
export const UPDATE_ORDER_STATUS = (token: string, id: number, data: OrderStatusData) => {return PUT(`/order/status/${id}`, data, token);}
export const GET_ALL_ORDER = (token: string) => {return GET(`/order/getOrders`, token);};
export const ADD_ORDER = (token: string, data: any) => {return POST(`/order/addOrder`, data, token);}
export const GET_ORDER = (token: string, id: number) => {return GET(`/order/get?id=${id}`, token);};

// Cart API
export const ADD_TO_CART = (token: string, data: AddCartData) => {return POST(`/cart/add`, data, token);}
export const DELETE_TO_CART = (token: string, data: any) => {return DELETE(`/cart/delete`, data, token);}
export const GET_CART = (token: string) => {return GET('/cart/getCart', token);};
export const UPDATE_TO_CART = (token: string, data: any) => {return PUT(`/cart/put`, data, token);}