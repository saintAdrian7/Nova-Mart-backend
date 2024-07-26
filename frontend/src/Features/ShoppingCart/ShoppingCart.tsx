import React, { useState} from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia, IconButton, TextField, Button } from '@mui/material';
import { Add, Remove, Delete, ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import { Product } from '../../Models/Models';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext/AuthContextConsts';
import axios from 'axios';

const ShoppingCart: React.FC = () => {
  const { state, dispatch } = useAuth()
  const [cart, setCart] = useState<Product[]>(state.loggedInUser?.cart || []);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>(() => 
    cart.reduce((acc, item) => ({ ...acc, [item._id as string]: 1 }), {})
  );
  const navigate = useNavigate();

  const   handleRemoveItem = async (productId: string) => {
    setCart(cart.filter(item => item._id !== productId));
    dispatch({ type: 'REMOVE FROM CART', payload: productId });
    await axios.delete(`http://localhost:5000/api/users/product/${productId}/${state.loggedInUser?._id}`)
  };

  const handleQuantityChange = (productId: string , newQuantity: number) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: newQuantity
    }));
  };

  const handleProceedToCheckout = () => {
    const cartWithQuantities = cart.map(product => ({
      _id: product._id,
      quantity: quantities[product._id as string] || 1
    }));

    navigate('/checkout', { state: { cart: cartWithQuantities } });
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      {cart.length === 0 ? (
        <Typography variant="h6">Your cart is empty.</Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {cart.map(product => (
              <Grid item xs={12} md={4} key={product._id}>
                <Card  >
                  <CardMedia
                    component="img"
                    height="100"
                    image={product.Image[0]}
                    alt={product.Name}
                  />
                  <CardContent sx={{height:'260px'}}>
                    <Typography variant="h6" gutterBottom>
                      {product.Name}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      ${product.DiscountedPrice}
                    </Typography>
                    <Box sx={{   mt: 2 }}>
                      <TextField
                        value={quantities[product._id as string] || 1}
                        onChange={(e) => handleQuantityChange(product._id as string, Math.max(1, parseInt(e.target.value)))}
                        type="number"
                        inputProps={{ min: 1 }}
                       
                      />
                       <IconButton onClick={() => handleQuantityChange(product._id as string, Math.max(1, (quantities[product._id as string] || 1) - 1))}>
                        <Remove />
                      </IconButton>
                      <IconButton onClick={() => handleQuantityChange(product._id as string, (quantities[product._id as string] || 1) + 1)}>
                        <Add sx={{ml:'20px'}} />
                      </IconButton>
                      <IconButton onClick={() => handleRemoveItem(product._id as string)} sx={{ ml: 4}}>
                        <Delete color="error" />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<ShoppingCartIcon />}
              onClick={handleProceedToCheckout}
            >
              Proceed to Checkout
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default ShoppingCart;
