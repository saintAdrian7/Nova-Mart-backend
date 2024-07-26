import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Rating } from '@mui/material';
import Slider from 'react-slick';
import { styled } from '@mui/system';
import { Product } from '../../Models/Models';
import { useNavigate } from 'react-router';

const StyledCard = styled(Card)({
  height: '400px',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
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

const ImageContainer = styled('div')({
  height: '200px',
  overflow: 'hidden',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const truncateDescription = (description: string | undefined, maxLength: number) => {
    if (!description) return '';
    return description.length > maxLength
      ? description.substring(0, maxLength) + '...'
      : description;
  };

  const handleProductClick = (id: string | undefined) => {
    navigate(`/product/${id}`);
  };

  return (
    <StyledCard onClick={() => handleProductClick(product._id)}>
      <ImageContainer>
        {product.Image && product.Image.length > 1 ? (
          <ImageCarousel {...carouselSettings}>
            {product.Image.map((img, index) => (
              <div key={index}>
                <img src={img} alt={product.Name} />
              </div>
            ))}
          </ImageCarousel>
        ) : (
          <CardMedia
            component="img"
            image={product.Image && product.Image[0]}
            alt={product.Name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
      </ImageContainer>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {product.Name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {truncateDescription(product.Description, 100)}
        </Typography>
        <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
          {product.CashPrice && (
            <Typography variant="body1" color="textSecondary" sx={{ textDecoration: 'line-through', mr: 1 }}>
              ${product.CashPrice}
            </Typography>
          )}
          <Typography variant="h6" color="primary">
            ${product.DiscountedPrice}
          </Typography>
        </Box>
        {product.Rating && (
          <Box sx={{ mt: 1 }}>
            <Rating value={product.Rating} readOnly />
          </Box>
        )}
      </CardContent>
    </StyledCard>
  );
};

export default ProductCard;
