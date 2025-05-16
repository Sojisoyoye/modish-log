import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Typography, Paper, Container } from '@mui/material';
import { getProduct, updateProduct } from '../api/api';
import { formatNumber } from '../utils';

const UpdateProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    color: '',
    size: '',
    price: 0,
    quantity: 0,
  });
  const [message, setMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({
      ...product,
      price: parseFloat(parseFloat(e.target.value).toFixed(2)),
    });
  };

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setMessage('Invalid product ID');
        return;
      }
      try {
        const product = await getProduct(id);
        product && setProduct(product);
      } catch (err) {
        setMessage('Failed to fetch product');
      }
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!id) {
        setMessage('Invalid product ID');
        return;
      }
      await updateProduct(id, product);
      setMessage('Product updated successfully!');
      navigate('/products');
    } catch (err) {
      setMessage('Failed to update product');
    }
  };

  const handleCancel = () => {
    navigate('/products');
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Update Product
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Color"
            type="text"
            fullWidth
            margin="normal"
            value={product.color}
            name="color"
            onChange={handleChange}
            required
          />
          <TextField
            label="Size"
            type="text"
            fullWidth
            margin="normal"
            value={product.size}
            name="size"
            onChange={handleChange}
            required
          />

          <TextField
            label="Quantity"
            type="number"
            fullWidth
            margin="normal"
            name="quantity"
            value={formatNumber(product.quantity)}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            type="number"
            label="Price"
            name="price"
            inputProps={{ step: '0.01' }}
            value={product.price}
            onChange={handlePriceChange}
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Update Product
          </Button>
          <Button
            type="button"
            variant="outlined"
            color="secondary"
            fullWidth
            sx={{ marginTop: 2 }}
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </form>
        {message && (
          <Typography
            variant="body1"
            sx={{
              marginTop: 2,
              color: message.includes('success') ? 'green' : 'red',
            }}
          >
            {message}
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default UpdateProduct;
