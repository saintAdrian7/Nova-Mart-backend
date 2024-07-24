import React from 'react';
import { Button, Snackbar, Alert } from '@mui/material';
import { useAuth } from '../../context/AuthContext/AuthContextConsts';
import axios from 'axios';

interface AddToCartProps {
  productId: string | undefined;
}

const AddToCart: React.FC<AddToCartProps> = ({ productId }) => {
  const { state, dispatch } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleAddToCart = async () => {
    if (!state.loggedInUser) {
      setError('You must be logged in to add items to the cart.');
      return;
    }

    try {
      
      dispatch({ type: 'ADD TO CART', payload: productId as string });
      await axios.patch(`http://localhost:5000/api/users/${state.loggedInUser._id}`, {
        cart: [...state.loggedInUser.cart, productId],
      });

      setOpen(true);
    } catch (err) {
      setError('Error adding product to cart.');
      console.error(err);
    }
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleAddToCart}>
        Add to Cart
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity="success">
          Product added to cart!
        </Alert>
      </Snackbar>
      {error && (
        <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={() => setError(null)}>
          <Alert onClose={() => setError(null)} severity="error">
            {error}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default AddToCart;
