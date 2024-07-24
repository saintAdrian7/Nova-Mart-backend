import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography, Box, List, ListItem, ListItemText, TextField, Button, Divider, Grid, Paper } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext/AuthContextConsts';
import { Product } from '../../Models/Models';
import { Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const CheckoutPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const {state} = useAuth()
  const cart:{_id:string, quantity:number}[] = location.state?.cart || [];
  const [userInfo, setUserInfo] = useState({ name: '', email: '', address: '' });
  const [loading, setLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [productDetails, setProductDetails] = useState<{ [key: string]: Product }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');


  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const responses = await Promise.all(cart.map(item =>
          axios.get(`http://localhost:5000/api/products/product/${item._id}`)
        ));
        
        const details = responses.reduce((acc, response) => {
          const product = response.data.product;
          acc[product._id] = product;
          return acc;
        }, {} as { [key: string]: Product });

        setProductDetails(details);
        calculateTotalAmount(details);
      } catch (error) {
        console.error('Failed to fetch product details:', error);
      }
    };

    fetchProductDetails();
  }, [cart]);

  const calculateTotalAmount = (details: { [key: string]: Product }) => {
    const amount = cart.reduce((total, item) => {
      const product = details[item._id];
      if (product) {
        return total + product.DiscountedPrice  * item.quantity;
      }
      return total;
    }, 0);
    setTotalAmount(amount);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors: { [key: string]: string } = {};

    if (!userInfo.name) {
      newErrors.name = 'Name is required';
      valid = false;
    }
    if (!userInfo.email) {
      newErrors.email = 'Email is required';
      valid = false;
    }
    if (!userInfo.address) {
      newErrors.address = 'Address is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
     const response = await axios.post('http://localhost:5000/api/orders', {
        user: state.loggedInUser?._id,
        products: cart.map(item => ({
          product: item._id,
          quantity: item.quantity,
        })),
        totalAmount,
      });
      await axios.patch(`http://localhost:5000/api/users/${state.loggedInUser?._id}`, {
        orders:[response.data.order._id],
        cart:[]
      })
      setSnackbarMessage('Order submitted successfully!');
      setSnackbarSeverity('success');
      navigate(`/dashboard/${state.loggedInUser?._id}`)
      
    } catch (error) {
      console.error('Order submission failed:', error);
      setSnackbarMessage('Order submission failed. Please try again.');
       setSnackbarSeverity('error');
    } finally {
      setLoading(false);
      setSnackbarOpen(true);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Order Summary
        </Typography>
        <Paper sx={{ p: 2 }}>
          <List>
            {cart.map(item => {
              const product = productDetails[item._id];
              return (
                <ListItem key={item._id}>
                  <ListItemText
                    primary={`Product Name: ${product?.Name || 'Loading...'}`}
                    secondary={`Quantity: ${item.quantity}`}
                  />
                  <Typography variant="body2" color="textSecondary">
                    ${product?.DiscountedPrice || 'Loading...'} each
                  </Typography>
                </ListItem>
              );
            })}
          </List>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" align="right">
            Total: ${totalAmount.toFixed(2)}
          </Typography>
        </Paper>
      </Box>

      <Typography variant="h6" gutterBottom>
        Shipping Information
      </Typography>
      <Paper sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              name="name"
              fullWidth
              value={userInfo.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              value={userInfo.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Address"
              name="address"
              multiline
              rows={4}
              fullWidth
              value={userInfo.address}
              onChange={handleChange}
              error={!!errors.address}
              helperText={errors.address}
            />
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Place Order'}
        </Button>
      </Box>
      <Snackbar
    open={snackbarOpen}
    autoHideDuration={6000}
    onClose={() => setSnackbarOpen(false)}
  >
    <Alert 
      onClose={() => setSnackbarOpen(false)} 
      severity={snackbarSeverity} 
      sx={{ width: '100%' }}
    >
      {snackbarMessage}
    </Alert>
  </Snackbar>
  
    </Container>

  );
};

export default CheckoutPage;
