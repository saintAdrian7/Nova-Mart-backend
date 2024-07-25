import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext/AuthContextConsts';
import { fetchUser } from './context/AuthContext/AuthContextActions';
import AdminOrders from './Features/OrderManagement/OrderManagement';
import { Box, CircularProgress, Typography } from '@mui/material';
import FallbackComponent from './Components/ProtectPages';

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
      <Suspense
        fallback={
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
              backgroundColor: '#f5f5f5',
            }}
          >
            <Box textAlign="center">
              <CircularProgress color="primary" size={60} />
              <Typography variant="h6" color="textSecondary" mt={2}>
                Loading...
              </Typography>
            </Box>
          </Box>
        }
      >
        <Routes>
          <Route path='/' element={<LayoutPage />}>
            <Route path="/Homepage" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/admin/orders" element={ state.loggedInUser ? <AdminOrders /> : <FallbackComponent />} />
            <Route path="/admin/users" element={ state.loggedInUser ?  <Users /> : <FallbackComponent />} />
            <Route path="/admin/products" element={<><h1>Products</h1></>} />
            <Route path="/admin/reports" element={<><h1>Reports</h1></>} />
            <Route path="/checkout" element={state.loggedInUser ? <CheckOut /> : <FallbackComponent />} />
          </Route>
          <Route path='/dashboard/:id' element={state.loggedInUser? <DashBoard />: <FallbackComponent/>} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
