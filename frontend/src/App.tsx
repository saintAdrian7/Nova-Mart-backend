import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext/AuthContextConsts';
import { fetchUser } from './context/AuthContext/AuthContextActions';
import AdminOrders from './Features/OrderManagement/OrderManagement';

const HomePage = lazy(() => import('./pages/Homepage/HomePage'));
const ProductPage = lazy(() => import('./pages/ProductPage/ProductPage'));
const LayoutPage = lazy(() => import('./pages/LayoutPage/LayoutPage'));
const DashBoard = lazy(() => import('./pages/DashboardPage/Dashboard'));
const Users = lazy(() => import('./Components/Users/Users'));
const CheckOut = lazy(() => import('./pages/CheckoutPage/CheckOutPage'));

const App: React.FC = () => {
  const { state, dispatch } = useAuth();

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    if (userId && !state.loggedInUser) {
      fetchUser(dispatch, userId);
    }
  }, [state.loggedInUser, dispatch]);

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<LayoutPage />}>
            <Route path="/Homepage" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/admin/orders" element={<AdminOrders/>} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/products" element={<><h1>Products</h1></>} />
            <Route path="/admin/reports" element={<><h1>Reports</h1></>} />
            <Route path="/checkout" element={<CheckOut />} />
          </Route>
          <Route path='/dashboard/:id' element={<DashBoard />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
