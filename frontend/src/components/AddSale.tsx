import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Paper, Container, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { addSale, getProducts } from '../api/api';

interface Product {
  id: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
}

const AddSale: React.FC = () => {
  // const [product, setProduct] = useState<Product>({ id: '', color: '', size: '', price: 0, quantity: 0 });
  const [productId, setProductId] = useState<string>('');

  const [quantitySold, setQuantitySold] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [message, setMessage] = useState<string>('');
  const navigate = useNavigate();

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response);
      } catch (err) {
        setMessage('Failed to fetch products');
      }
    };
    fetchProducts();
  }, []);

  // Calculate total price when product or quantity changes
  useEffect(() => {
    const selectedProduct = products.find((p) => p.id === productId);

    // console.log('Selected product:', selectedProduct, productId, products);
    if (selectedProduct) {
      setTotalPrice(selectedProduct.price * quantitySold);    }
  }, [productId, quantitySold, products]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addSale(productId, quantitySold);
      setMessage('Sale recorded successfully!');
      navigate('/sales');
    } catch (error) {
      setMessage('Failed to record sale. Please check again.');
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Add Sale
        </Typography>
        <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
            <InputLabel>Product</InputLabel>
            <Select
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              required
            >
              <MenuItem value={''}>
                Select a product
              </MenuItem>
              {products.map((product) => (
                <MenuItem key={product.id} value={product.id}>
                  {product.color} ({product.size}) - ₦{product.price}
                </MenuItem>
              ))}
            </Select>

          </FormControl>
          <TextField
            label="Quantity Sold"
            fullWidth
            margin="normal"
            value={quantitySold}
            onChange={(e) => setQuantitySold(Number(e.target.value))}
            required
          />
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            Total Price: ₦{totalPrice.toFixed(2)}
          </Typography>
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
            Record Sale
          </Button>
        </form>
        {message && (
          <Typography variant="body1" sx={{ marginTop: 2, color: message.includes('success') ? 'green' : 'red' }}>
            {message}
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default AddSale;