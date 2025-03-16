import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper } from '@mui/material';
import { addProduct } from '../api/api';
import { useNavigate } from 'react-router-dom';

interface Product {
  color: string;
  size: string;
  quantity: number;
  price?: number;
}

const AddProduct: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  // const [price, setPrice] = useState<number>(0.00);
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product>({
    color: '',
    size: '',
    quantity: 0,
    price: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({
      ...product,
      price: parseFloat(parseFloat(e.target.value).toFixed(2)),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addProduct(product);
      setMessage('Product added successfully!');
      setProduct({ color: '', size: '', quantity: 0, price: 0 });
    } catch (error) {
      setMessage('Failed to record product. Please check the details.');
    }
  };

  const handleCancel = () => {
    navigate('/products'); // Redirect to products list on cancel
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Add new Product
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Color"
            name="color"
            value={product.color}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Size"
            name="size"
            value={product.size}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            type="number"
            label="Quantity"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            margin="normal"
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
            sx={{ mt: 2 }}
          >
            Add Product
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

export default AddProduct;
