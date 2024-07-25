import React, { useState } from 'react';
import { Typography,  Grid, TextField, Button, Paper, CircularProgress, Snackbar } from '@mui/material';

import ProductCard from './ProductCard'; 
import { Product } from '../../Models/Models';
import axios from 'axios';

const SearchComponent: React.FC = () => {
const [query, setQuery] = useState<string>('')
const [minPrice, setMinPrice] = useState<string>()
const [maxPrice, setMaxPrice] = useState<string>()
const [minRating, setMinRating] = useState<number | ''>('');
const [maxRating, setMaxRating] = useState<number | ''>('');
const [sortBy, setSortBy] = useState<'price' | 'createdAt' | 'rating'>('price');
const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
const [searchedProducts, setSearchedProducts] = useState<Product[]>([])
const [error, setError] = useState<string>('')
const [loading, setLoading] = useState<boolean>(false)
const [noProductsFound, setNoProductsFound] = useState(false);

const handleSearch = async () =>{
  setLoading(true)
  setError('')
  setNoProductsFound(false)
  try{
    const response = await axios.get('http://localhost:5000/api/products/search',{
      params: {
        query: query || undefined,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
        minRating: minRating || undefined,
        maxRating: maxRating || undefined,
        sortBy: sortBy || undefined,
        sortOrder: sortOrder || undefined
      },
    })
    const fetchedProducts = response.data.products
    if(fetchedProducts.length === 0){
      setNoProductsFound(true)
      setTimeout(() => setNoProductsFound(false), 5000)
    }
    setSearchedProducts(fetchedProducts)

  }catch(error){
    console.log(error);
    setError('Something went wrong')   
  }finally{
    setLoading(false)
  }
}

return (
    <div style={{ padding: '2rem', backgroundColor: '#fafafa', minHeight: '100vh' }}>
      <Paper elevation={3} style={{ padding: '2rem', borderRadius: '8px' }}>
        <Typography variant="h4" gutterBottom>
          Search Products
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Search product by name or description.."
              variant="outlined"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Min Price"
              variant="outlined"
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value )}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Max Price"
              variant="outlined"
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value )}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Min Rating"
              variant="outlined"
              type="number"
              inputProps={{ min: 0, max: 5 }}
              value={minRating}
              onChange={(e) => setMinRating(e.target.value ? Number(e.target.value) : '')}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Max Rating"
              variant="outlined"
              type="number"
              inputProps={{ min: 0, max: 5 }}
              value={maxRating}
              onChange={(e) => setMaxRating(e.target.value ? Number(e.target.value) : '')}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Sort By"
              variant="outlined"
              select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'price' | 'createdAt' | 'rating')}
              SelectProps={{ native: true }}
            >
              <option value="price">Price</option>
              <option value="createdAt">Date Created</option>
              <option value="rating">Rating</option>
            </TextField>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Sort Order"
              variant="outlined"
              select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
              SelectProps={{ native: true }}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              style={{ width: '100%' }}
            >
              Search
            </Button>
          </Grid>
        </Grid>

        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <CircularProgress />
          </div>
        )}

        {error && (
          <Typography color="error" style={{ marginTop: '1rem' }}>
            {error}
          </Typography>
        )}

        {noProductsFound && (
          <Snackbar
            open={true}
            autoHideDuration={3000}
            onClose={() => setNoProductsFound(false)}
            message="No products found"
          />
        )}

        <Grid container spacing={3} style={{ marginTop: '2rem' }}>
          {searchedProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <ProductCard product={product}/>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </div>
  );


}

export default SearchComponent