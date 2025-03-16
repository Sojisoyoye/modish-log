import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Paper,
  Container,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { addSale, getProducts } from '../api/api';

class Product {
  id!: string;
  color!: string;
  size!: string;
  price!: number;
  quantity!: number;
}

const AddSale: React.FC = () => {
  // const [productId, setProductId] = useState<string>('');
  // const [quantitySold, setQuantitySold] = useState<number>(0);
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [message, setMessage] = useState<string>('');

  const [sale, setSale] = useState({
    productId: '',
    quantitySold: 0,
    paid: false,
    comment: '',
  });

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
    const selectedProduct = products.find((p) => p.id === sale.productId);
    if (selectedProduct) {
      setTotalPrice(selectedProduct.price * sale.quantitySold);
    }
  }, [sale.productId, sale.quantitySold, products]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addSale(sale);
      setMessage('Sale recorded successfully!');
      navigate('/sales');
    } catch (error) {
      setMessage('Failed to record sale. Please check again.');
    }
  };

  const handleCancel = () => {
    navigate('/sales'); // Redirect to sales list on cancel
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
              value={sale.productId}
              onChange={(e) => setSale({ ...sale, productId: e.target.value })}
              required
            >
              <MenuItem value={''}>Select a product</MenuItem>
              {products.map((product) => (
                <MenuItem key={product.id} value={product.id}>
                  {product.color} {product.size}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            type="number"
            label="Quantity Sold"
            name="quantitySold"
            inputProps={{ step: '0.01' }}
            value={sale.quantitySold}
            onChange={(e) =>
              setSale({ ...sale, quantitySold: Number(e.target.value) })
            }
            margin="normal"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={sale.paid}
                onChange={(e) => setSale({ ...sale, paid: e.target.checked })}
              />
            }
            label="Paid"
          />
          <TextField
            label="Comment"
            type="text"
            fullWidth
            margin="normal"
            value={sale.comment}
            onChange={(e) => setSale({ ...sale, comment: e.target.value })}
          />
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            Total Price: ₦{totalPrice.toFixed(2)}
          </Typography>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Record Sale
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

export default AddSale;
