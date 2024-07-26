import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Card, CardContent, Divider, Grid } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext/AuthContextConsts';
import { Order } from '../../Models/Models';

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { state } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://nova-mart-server.onrender.com/api/orders/delivered/${state.loggedInUser?._id}`);
        setOrders(response.data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchUserData();
  }, [state.loggedInUser?._id]);

  if (!orders) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="lg" style={{ padding: '2rem', backgroundColor: '#f5f5f5', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <Box style={{ flex: '1' }}>
        <Divider style={{ marginBottom: '1rem' }} />

        <Grid container spacing={3}>
          {orders.map((order) => (
            <Grid item xs={12} key={order._id}>
              <Card style={{ marginBottom: '1rem', backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '10px' }}>
                <CardContent>
                  <Typography variant="h6" color="textPrimary">Order ID: {order._id}</Typography>
                  <Typography color="secondary">Status: {order.status}</Typography>
                  <Typography color="secondary">
                    Total: ${order.totalAmount ? order.totalAmount.toFixed(2) : 'N/A'}
                  </Typography>
                  <Typography color="primary">Products:</Typography>
                  {order.products.map((orderProduct) => (
                    <Typography key={orderProduct.product._id} color="textSecondary">
                      - {orderProduct.product.Name} (${orderProduct.product.DiscountedPrice ? orderProduct.product.DiscountedPrice.toFixed(2) : 'N/A'}) x {orderProduct.quantity}
                    </Typography>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default OrderHistory;
