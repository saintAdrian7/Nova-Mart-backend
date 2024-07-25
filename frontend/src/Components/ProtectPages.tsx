import React from 'react';
import {  Typography, Button, Container } from '@mui/material';
import { styled } from '@mui/system';
import { useAuth } from '../context/AuthContext/AuthContextConsts';
import { useNavigate } from 'react-router';

const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  backgroundColor: '#f5f5f5',
  padding: '2rem',
});

const StyledTypography = styled(Typography)({
  fontFamily: 'Inder',
  textAlign: 'center',
  marginBottom: '2rem',
  color: '#333',
});

const StyledButton = styled(Button)({
  backgroundColor: '#007bff',
  color: '#fff',
  padding: '1rem 2rem',
  '&:hover': {
    backgroundColor: '#0056b3',
  },
});

const FallbackComponent: React.FC = () => {
    const {dispatch} = useAuth()
    const navigate = useNavigate()
    const handleAuth = () => {
        dispatch({type: 'SHOW MODAL'})
        navigate('/Homepage')
        
    }
  return (
    <StyledContainer>
      <StyledTypography variant="h3" gutterBottom>
        🚀 Oops! Looks like you're not logged in!
      </StyledTypography>
      <StyledTypography variant="h5">
        To access this content, you need to be logged in. Please log in to enjoy our amazing products and exclusive offers.
      </StyledTypography>
      <StyledButton onClick={handleAuth} variant="contained">
      Go Back
      </StyledButton>
    </StyledContainer>
  );
};

export default FallbackComponent;
