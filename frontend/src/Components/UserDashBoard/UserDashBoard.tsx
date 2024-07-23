import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Avatar, Grid, Card, CardContent, CardMedia, Divider } from '@mui/material';
import axios from 'axios';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import { useAuth } from '../../context/AuthContext/AuthContextConsts';
import { User } from '../../Models/Models';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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



const ImageCarousel = styled(Slider)({
  '& .slick-slide': {
    padding: '0 10px',
  },
  '& .slick-list': {
    margin: '0 -10px',
  },
  '& .slick-dots': {
    bottom: '10px',
  },
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

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const truncateDescription = (description: string, maxLength: number = 200) => {
    return description.length > maxLength ? `${description.substring(0, maxLength)}...` : description;
  };

  return (
    <StyledContainer maxWidth="lg">
      <Box sx={{  mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {user.firstName} {user.lastName}
        </Typography>
        <Avatar sx={{ width: 100,
          height: 100,
         marginBottom: '1rem',
         boxShadow: '0 4px 8px rgba(0,0,0,0.2)'}}  src={user.image} alt={user.firstName} />
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
              <motion.div whileHover={{ scale: 1.05 }}>
                <StyledCard>
                  {product.Image.length > 1 ? (
                    <ImageCarousel {...carouselSettings}>
                      {product.Image.map((img, index) => (
                        <div key={index}>
                          <img src={img} alt={product.Name} style={{ width: '100%', height: 'auto' }} />
                        </div>
                      ))}
                    </ImageCarousel>
                  ) : (
                    <CardMedia
                      component="img"
                      height="140"
                      image={product.Image[0]}
                      alt={product.Name}
                    />
                  )}
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
                {order.products.map((orderProduct) => (
                  <Typography key={orderProduct.product._id}>
                    - {orderProduct.product.Name} (${orderProduct.product.DiscountedPrice})
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
