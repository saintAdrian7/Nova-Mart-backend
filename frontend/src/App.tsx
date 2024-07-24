import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Homepage/HomePage';
import ProductPage from './pages/ProductPage/ProductPage';
import LayoutPage from './pages/LayoutPage/LayoutPage';
import DashBoard from './pages/DashboardPage/Dashboard';
import { useAuth } from './context/AuthContext/AuthContextConsts';
import { fetchUser } from './context/AuthContext/AuthContextActions';
import Users from './Components/Users/Users';
import CheckOut from './pages/CheckoutPage/CheckOutPage';



const App: React.FC = () => {
  const { state, dispatch } = useAuth();

  useEffect(() => {
    const  userId = sessionStorage.getItem("userId");
    if (userId && !state.loggedInUser) {
      fetchUser(dispatch, userId);
    }
    
  }, [state.loggedInUser, dispatch]);
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LayoutPage/>} >
          <Route path="/Homepage" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/admin/orders" element={<><h1>Orders</h1></>} />
          <Route path="/admin/users" element={<Users/>} />
          <Route path="/admin/products" element={<><h1>Products</h1></>} />
          <Route path="/admin/reports" element={<><h1>reports</h1></>} />
          <Route path="/checkout" element={<CheckOut/>} />
        </Route>
        <Route path='/dashboard/:id' element={<DashBoard/>} />
      </Routes>
    </Router>
  );
}

export default App;
