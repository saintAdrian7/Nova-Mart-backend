import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, CardContent, CardMedia, Grid, Divider, Rating, CircularProgress, Alert, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Carousel from 'react-material-ui-carousel'; 

import { Product } from '../../Models/Models';
import AddToCart from './AddToCart';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/product/${id}`);
        setProduct(response.data.product);
      } catch (err) {
        setError('Failed to fetch product details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <CircularProgress sx={{ position: 'absolute', left: '50%', top: '50%' }} />;

  if (error) return <Alert severity="error">{error}</Alert>;

  if (!product) return <Typography>No product found.</Typography>;

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          {product.Name}
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 3 }}>
              <CardMedia
                component="div"
                sx={{
                  height: 400,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#f5f5f5',
                  borderBottom: '1px solid #ddd',
                }}
              >
                <Carousel
                  interval={5000}
                  indicators={false}
                  animation="slide"
                  sx={{ width: '100%', height: '100%' }}
                >
                  {product.Image.map((img, index) => (
                    <CardMedia
                      component="img"
                      key={index}
                      image={img}
                      alt={`Product image ${index}`}
                      sx={{ height: '100%', objectFit: 'contain' }}
                    />
                  ))}
                </Carousel>
              </CardMedia>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Product Images
                </Typography>
                <Grid container spacing={2}>
                  {product.Image.map((img, index) => (
                    <Grid item xs={4} key={index}>
                      <CardMedia
                        component="img"
                        image={img}
                        alt={`product ${index}`}
                        sx={{
                          width: '100%',
                          height: 100,
                          objectFit: 'cover',
                          borderRadius: 1,
                          boxShadow: 1,
                          cursor: 'pointer',
                          '&:hover': {
                            boxShadow: 3,
                          },
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 2 }}>
              <Typography variant="h5" gutterBottom>
                Price
              </Typography>
              <Box sx={{ mb: 2 }}>
                {product.CashPrice && (
                  <Typography variant="body2" color="textSecondary" sx={{ textDecoration: 'line-through', mr: 1 }}>
                    ${product.CashPrice}
                  </Typography>
                )}
                <Typography variant="h6" color="primary">
                  ${product.DiscountedPrice}
                </Typography>
              </Box>
              {product.Rating && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="textSecondary">
                    Ratings:
                  </Typography>
                  <Rating value={product.Rating} readOnly />
                </Box>
              )}
              <Typography variant="body1" paragraph>
                {product.Description}
              </Typography>
              <AddToCart productId={product._id} />
              <Box sx={{ mt: 2 }}>
                <Button variant="contained" color="primary" size="large">
                  Add to Wishlist
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4 }} />
        <Typography variant="h6" gutterBottom>
          Reviews
        </Typography>
        <Typography variant="body1">
         
        </Typography>
      </Box>
    </Container>
  );
};

export default ProductDetails;
