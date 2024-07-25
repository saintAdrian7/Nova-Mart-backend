import React from 'react';
import { Container, Typography, Box, Avatar,  Card, CardContent, CardMedia, Divider,  styled } from '@mui/material';

import { User } from '../../Models/Models';
import { keyframes } from '@mui/system';
 
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const StyledContainer = styled(Container)(({ theme }) => ({
  padding: '2rem',
  backgroundColor: '#f5f5f5',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  [theme.breakpoints.down('md')]: {
    padding: '1rem',
  },
}));

const ProfileHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '2rem',
  gap: '1rem',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
}));

const UserDetails = styled(Box)(({ theme }) => ({
  marginBottom: '2rem',
  width: '700px',
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: '1rem',
  color: 'transparent',
  background: 'linear-gradient(45deg, #ff6e40, #ff8e53)',
  backgroundClip: 'text',
  textFillColor: 'transparent',
  fontWeight: 600,
  fontSize: '1.5rem',
  animation: `${fadeIn} 1s ease-in-out`,
  [theme.breakpoints.down('md')]: {
    fontSize: '1.25rem',
  },
}));

const StyledCard = styled(Card)(() => ({
  marginBottom: '1rem',
  backgroundColor: '#fff',
  width:'300px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  animation: `${slideIn} 1s ease-in-out`,
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
  },
 
}));



const ProductScrollContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  overflowX: 'auto',
  padding: '1rem 0',
  gap: '1rem',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'center',
    overflowX: 'hidden',
    overflowY: 'auto',
  },
}));

const UserDetailsPage: React.FC<{ selectedUser: User }> = ({ selectedUser }) => {
  const user = selectedUser;
  if (!user) return <Typography>Loading...</Typography>;
  return (
    <StyledContainer maxWidth="lg">
      <ProfileHeader>
        <Avatar
          sx={{ width: 120, height: 120, boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}
          src={user.image}
          alt={user.firstName}
        />
        <Box>
          <Typography variant="h4" color="primary">
            {user.firstName} {user.lastName}
          </Typography>
          <Typography variant="h6" color="secondary">
            Email: {user.email}
          </Typography>
          <Typography variant="h6" color="secondary">
            Role: {user.role}
          </Typography>
        </Box>
      </ProfileHeader>



      <Divider sx={{ my: 4 }} />

      <UserDetails>
        <SectionTitle>User Products</SectionTitle>
        <ProductScrollContainer>
          {user.products.map((product) => (
            <StyledCard key={product._id}>
              <CardMedia
                component="img"
                height="140"
                image={product.Image[0]}
                alt={product.Name}
                style={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="h6" color="textPrimary">
                  {product.Name}
                </Typography>
                <Typography variant="body2" color="textSecondary" noWrap>
                  {product.Description.length > 100
                    ? `${product.Description.substring(0, 100)}...`
                    : product.Description}
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
          ))}
        </ProductScrollContainer>
      </UserDetails>

      <Divider sx={{ my: 4 }} />

      <UserDetails>
        <SectionTitle>User Orders</SectionTitle>
        {user.orders.map((order) => (
          <StyledCard key={order._id}>
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
          </StyledCard>
        ))}
      </UserDetails>
    </StyledContainer>
  );
};

export default UserDetailsPage;
