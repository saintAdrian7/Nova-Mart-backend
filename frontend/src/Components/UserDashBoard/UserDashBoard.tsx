import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Avatar, Grid, Card, CardContent, CardMedia, Divider, Paper } from '@mui/material';
import axios from 'axios';
import { styled } from '@mui/system';
import { useAuth } from '../../context/AuthContext/AuthContextConsts';
import { User } from '../../Models/Models';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CreateProduct from '../../Features/Products/ProductForm';
import ShoppingCart from '../../Features/ShoppingCart/ShoppingCart';

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  padding: '2rem',
  backgroundColor: '#f5f5f5',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));

const MainContent = styled(Box)({
  flex: '1',
});

const Sidebar = styled(Box)(({ theme }) => ({
  width: '600px',
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}));

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

  const truncateDescription = (description: string, maxLength: number = 200) => {
    return description.length > maxLength ? `${description.substring(0, maxLength)}...` : description;
  };

  return (
    <StyledContainer maxWidth="lg">
      <MainContent>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Welcome, {user.firstName} {user.lastName}
          </Typography>
          <Avatar
            sx={{ width: 100, height: 100, marginBottom: '1rem', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}
            src={user.image}
            alt={user.firstName}
          />
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
              <Grid item xs={12} sm={6} md={4} key={product._id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={product.Image[0]}
                    alt={product.Name}
                    style={{ objectFit: 'cover' }}
                  />
                  <CardContent>
                    <Typography variant="h6">{product.Name}</Typography>
                    <Typography variant="body2" color="textSecondary" noWrap>
                      {truncateDescription(product.Description)}
                    </Typography>
                    <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body1" color="textSecondary" sx={{ textDecoration: 'line-through', mr: 1 }}>
                        ${product.CashPrice}
                      </Typography>
                      <Typography variant="h6" color="primary">
                        ${product.DiscountedPrice}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
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
            <Card key={order._id} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6">Order ID: {order._id}</Typography>
                <Typography>Status: {order.status}</Typography>
                <Typography>Total: ${order.totalAmount}</Typography>
                <Typography>Products:</Typography>
                {order.products.map((orderProduct) => (
                  <Typography key={orderProduct.product._id}>
                    - {orderProduct.product.Name} (${orderProduct.product.DiscountedPrice})
                  </Typography>
                ))}
              </CardContent>
            </Card>
          ))}
        </Box>
      </MainContent>

      <Sidebar>
        <Paper elevation={3} sx={{ padding: '1rem', borderRadius: '10px' }}>
          <ShoppingCart />
        </Paper>
        <Paper elevation={3} sx={{ padding: '1rem', borderRadius: '10px' }}>
          <CreateProduct />
        </Paper>
      </Sidebar>
    </StyledContainer>
  );
};

export default UserDashboard;
