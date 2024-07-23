import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  Grid,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import { useAuth } from '../../context/AuthContext/AuthContextConsts';

const categories = [
  'Electronics', 'Fashion', 'Home', 'Books', 'Sports', 'Beauty', 'Toys', 'Groceries', 'Automotive', 'Health'
];

const CreateProduct: React.FC = () => {
  const { state } = useAuth();
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [discountedPrice, setDiscountedPrice] = useState('');
  const [cashPrice, setCashPrice] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages(files);
      const previews = files.map(file => URL.createObjectURL(file));
      setImagePreviews(previews);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const imageUrls: string[] = [];
      for (const image of images) {
        const formData = new FormData();
        formData.append('file', image);
        const response = await axios.post('http://localhost:5000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        imageUrls.push(response.data.url);
      }

      const productData = {
        Name: productName,
        Description: description,
        DiscountedPrice: discountedPrice,
        CashPrice: cashPrice,
        Category: category,
        Image: imageUrls,
        Seller: state.loggedInUser?._id,
      };

      const response = await axios.post('http://localhost:5000/api/products', productData);
      const productId = response.data.productId
      await axios.patch(`http://localhost:5000/api/users/${state.loggedInUser?._id}`, {
        products:[productId]
      })

      alert('Product created successfully');
      setProductName('');
      setDescription('');
      setDiscountedPrice('');
      setCashPrice('');
      setCategory('');
      setImages([]);
      setImagePreviews([]);
    } catch (error) {
      setError('Error creating product');
      console.error('Error creating product:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create Product
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            multiline
            rows={4}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Discounted Price"
            type="number"
            value={discountedPrice}
            onChange={(e) => setDiscountedPrice(e.target.value)}
            required
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Cash Price"
            type="number"
            value={cashPrice}
            onChange={(e) => setCashPrice(e.target.value)}
          />
          <TextField
            select
            variant="outlined"
            margin="normal"
            fullWidth
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            {categories.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="contained"
            component="label"
            sx={{ mt: 2, mb: 2 }}
          >
            Upload Images
            <input
              type="file"
              hidden
              multiple
              onChange={handleImageChange}
            />
          </Button>
          <Grid container spacing={2}>
            {imagePreviews.map((preview, index) => (
              <Grid item key={index} xs={4}>
                <Card>
                  <CardContent>
                    <img
                      src={preview}
                      alt={`product ${index}`}
                      style={{ width: '100%' }}
                    />
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => {
                      setImages(images.filter((_, i) => i !== index));
                      setImagePreviews(imagePreviews.filter((_, i) => i !== index));
                    }}>Remove</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          {error && <Typography color="error">{error}</Typography>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Create Product
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CreateProduct;
