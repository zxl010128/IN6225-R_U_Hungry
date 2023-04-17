import React from 'react';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import './App.css';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import AdminDish from './pages/AdminDish';
import AdminOrder from './pages/AdminOrder';
import UserShop from './pages/UserShop';
import UserOrder from './pages/UserOrder';
import UserCart from './pages/UserCart';
import UserPayment from './pages/UserPayment';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/admin/dish' element={<AdminDish />}></Route>
          <Route path='/admin/order' element={<AdminOrder />}></Route>
          <Route path='/user/shop' element={<UserShop />}></Route>
          <Route path='/user/order' element={<UserOrder />}></Route>
          <Route path='/user/cart' element={<UserCart />}></Route>
          <Route path='/user/payment/:id' element={<UserPayment />}></Route>
          <Route path="*" element={<Navigate to='/login' replace />} />
          <Route index element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
