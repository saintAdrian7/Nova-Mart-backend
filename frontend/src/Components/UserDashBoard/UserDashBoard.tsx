import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Avatar, Grid, Card, CardContent, Divider } from '@mui/material';
import axios from 'axios';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext/AuthContextConsts';
import { User } from '../../Models/Models';



const StyledContainer = styled(Container)({
  padding: '2rem',
  backgroundColor: '#f5f5f5',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
});

const StyledCard = styled(Card)({
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const StyledAvatar = styled(Avatar)({
  width: 100,
  height: 100,
  marginBottom: '1rem',
  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
});

const UserDashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const { state } = useAuth();
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${state.loggedInUser?._id}`);
        setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [state.loggedInUser?._id]);

  if (!user) return <Typography>Loading...</Typography>;

  return (
    <StyledContainer maxWidth="lg">
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {user.firstName} {user.lastName}
        </Typography>
        <StyledAvatar src={user.image} alt={user.firstName} />
        <Typography variant="h6">Email: {user.email}</Typography>
        <Typography variant="h6">Role: {user.role}</Typography>
      </Box>

      <Divider />

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Your Products
        </Typography>
        <Grid container spacing={3}>
          {user.products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.Name}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <StyledCard>
                  <CardContent>
                    <Typography variant="h6">{product.Name}</Typography>
                    <Typography>{product.description}</Typography>
                    <Typography variant="h6">${product.price}</Typography>
                  </CardContent>
                </StyledCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Your Orders
        </Typography>
        {user.orders.map((order) => (
          <motion.div whileHover={{ scale: 1.05 }} key={order._id}>
            <StyledCard sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6">Order ID: {order._id}</Typography>
                <Typography>Status: {order.status}</Typography>
                <Typography>Total: ${order.totalAmount}</Typography>
                <Typography>Products:</Typography>
                {order.products.map((product) => (
                  <Typography key={product.product.Name}>
                    - {product.product.Name} (${product.product.CashPrice})
                  </Typography>
                ))}
              </CardContent>
            </StyledCard>
          </motion.div>
        ))}
      </Box>
    </StyledContainer>
  );
};

export default UserDashboard;
