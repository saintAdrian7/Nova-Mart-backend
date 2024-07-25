import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Avatar, Grid, Card, CardContent, CardMedia, Divider, Paper, Button, Modal } from '@mui/material';
import axios from 'axios';
import { styled } from '@mui/system';
import { useAuth } from '../../context/AuthContext/AuthContextConsts';
import { User } from '../../Models/Models';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CreateProduct from '../../Features/Products/ProductForm';
import ShoppingCart from '../../Features/ShoppingCart/ShoppingCart';
import OrderHistory from '../../Features/OrderManagement/OrderHistory';
import Footer from '../Footer/Footer';

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '2rem',
  backgroundColor: '#f5f5f5',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));

const MainContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  '& > div': {
    flexBasis: '50%',
  },
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    '& > div': {
      flexBasis: '100%',
    },
  },
}));


const Sidebar = styled(Box)(({ theme }) => ({
  width: '600px',
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}));

const CenteredModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const ModalContent = styled(Paper)(({ theme }) => ({
  padding: '2rem',
  backgroundColor: theme?.palette?.background?.paper || '#fff',
  boxShadow:  '0 4px 8px rgba(0,0,0,0.1)',
  outline: 'none',
  borderRadius: '10px',
  width: '80%',
  maxWidth: '500px',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: '1rem',
  borderRadius: '10px',
  backgroundColor: theme?.palette?.background?.default || '#fafafa',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
}));

const UserDashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const { state } = useAuth();
  const [openModal, setOpenModal] = useState(false);

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

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const filteredOrders = user.orders.filter(order => order.status !== 'Delivered');

  return (
    <>
    <StyledContainer maxWidth="lg">
      <MainContent>
        <div>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" gutterBottom color="primary">
              Welcome, {user.firstName} {user.lastName}
            </Typography>
            <Avatar
              sx={{ width: 100, height: 100, marginBottom: '1rem', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}
              src={user.image}
              alt={user.firstName}
            />
            <Typography variant="h6" color="secondary">Email: {user.email}</Typography>
            <Typography variant="h6" color="secondary">Role: {user.role}</Typography>
          </Box>

          <Divider />

          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom color="primary">
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
                      <Typography variant="h6" color="textPrimary">{product.Name}</Typography>
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
        </div>

        <Divider sx={{ my: 4 }} />
        <Sidebar>
          <StyledPaper elevation={3}>
            <ShoppingCart />
          </StyledPaper>
          <StyledPaper elevation={3}>
            <Button sx={{ml:15}} variant="contained" color="primary" onClick={handleOpenModal}>
              Create Product
            </Button>
          </StyledPaper>
        </Sidebar>
      </MainContent>
      <div className='order-management'>
        <div>
          <Typography variant="h5" gutterBottom color="primary">
            Your Orders
          </Typography>
          {filteredOrders.map((order) => (
            <Card key={order._id} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" color="textPrimary">Order ID: {order._id}</Typography>
                <Typography color="secondary">Status: {order.status}</Typography>
                <Typography color="secondary">Total: ${order.totalAmount}</Typography>
                <Typography color="primary">Products:</Typography>
                {order.products.map((orderProduct) => (
                  <Typography key={orderProduct.product._id} color="textSecondary">
                    - {orderProduct.product.Name} (${orderProduct.product.DiscountedPrice})
                  </Typography>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className='order-history'>
          <Typography variant="h5" gutterBottom color="primary">
            Order History
          </Typography>
          <OrderHistory />
        </div>
      </div>

      <CenteredModal open={openModal} onClose={handleCloseModal}>
        <ModalContent>
          <CreateProduct />
        </ModalContent>
      </CenteredModal>
     
    </StyledContainer>
     <Footer/>
     </>
  );
};

export default UserDashboard;
