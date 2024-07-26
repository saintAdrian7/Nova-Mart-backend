// LandingPage.tsx
import React from 'react';
import { Container, Typography, Grid, Button, Box, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router';

const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #6D83F2 30%, #9B59B6 90%)',
  color: '#fff',
  padding: theme.spacing(6, 0),
  textAlign: 'center',
}));

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  boxShadow: theme.shadows[4],
  backgroundColor: '#f5f5f5', 
  borderRadius: '12px',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[6],
  },
}));

const TestimonialCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  backgroundColor: '#e0f7fa', 
  borderRadius: '12px',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[6],
  },
}));

const CTASection = styled(Box)(() => ({
  bgcolor: '#333',
  color: '#fff',
  py: 6,
  textAlign: 'center',
}));

const LandingPage:React.FC = () => {
    const navigate = useNavigate()
    const Navigate = () =>{
        navigate('/homepage')
    }
  return (
    <div>
  
      <HeroSection>
        <Container>
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to Nova Mart
          </Typography>
          <Typography variant="h5" component="p" gutterBottom>
            Your one-stop shop for the latest and greatest products
          </Typography>
          <Button onClick={Navigate} variant="contained" color="primary" size="large">
            Shop Now
          </Button>
        </Container>
      </HeroSection>

     
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <FeatureCard>
              <Typography variant="h6" gutterBottom>
                Wide Range of Products
              </Typography>
              <Typography>
                From electronics to fashion, we have everything you need.
              </Typography>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FeatureCard>
              <Typography variant="h6" gutterBottom>
                Quality Assurance
              </Typography>
              <Typography>
                We ensure the highest quality standards for all our products.
              </Typography>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FeatureCard>
              <Typography variant="h6" gutterBottom>
                Fast Shipping
              </Typography>
              <Typography>
                Get your orders delivered quickly and reliably.
              </Typography>
            </FeatureCard>
          </Grid>
        </Grid>
      </Container>

     
      <Box sx={{ bgcolor: '#e0f7fa', py: 6 }}>
        <Container>
          <Typography variant="h4" component="h2" gutterBottom align="center">
            What Our Customers Say
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <TestimonialCard>
                <Typography variant="h6" gutterBottom>
                  "Fantastic shopping experience!"
                </Typography>
                <Typography>
                  - Jane Doe
                </Typography>
              </TestimonialCard>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TestimonialCard>
                <Typography variant="h6" gutterBottom>
                  "Great products and fast delivery."
                </Typography>
                <Typography>
                  - John Smith
                </Typography>
              </TestimonialCard>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TestimonialCard>
                <Typography variant="h6" gutterBottom>
                  "Highly recommended for online shopping."
                </Typography>
                <Typography>
                  - Alice Johnson
                </Typography>
              </TestimonialCard>
            </Grid>
          </Grid>
        </Container>
      </Box>

   
      <CTASection>
        <Container>
          <Typography variant="h4" component="h2" gutterBottom>
            Ready to Shop?
          </Typography>
          <Typography variant="h6" component="p" gutterBottom>
            Discover our exclusive offers and latest collections.
          </Typography>
          <Button onClick={Navigate} variant="contained" color="primary" size="large">
            Start Shopping
          </Button>
        </Container>
      </CTASection>
    </div>
  );
};

export default LandingPage;
