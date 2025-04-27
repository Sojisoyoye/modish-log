import React, { useState } from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import { submitStockCount } from '../api/api';
import { useNavigate } from 'react-router-dom';

interface StockCountFormData {
  productId: string;
  countedQuantity: number;
  countDate: string;
}

const StockCountForm: React.FC = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>('');

  const [stockCount, setStockCount] = useState<StockCountFormData>({
    productId: '',
    countedQuantity: 0,
    countDate: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStockCount({ ...stockCount, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await submitStockCount({
        productId: stockCount.productId,
        countedQuantity: parseInt(stockCount.countedQuantity.toString()),
        countDate: stockCount.countDate,
      });
      setMessage('Stock count submitted successfully!');
      setStockCount({ productId: '', countedQuantity: 0, countDate: '' });
    } catch (error) {
      setMessage(`Failed to submit stock count. Please check again. ${error} `);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Add Stock Count
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Product ID"
          name="productId"
          value={stockCount.productId}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Counted Quantity"
          name="countedQuantity"
          value={stockCount.countedQuantity}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="number"
          required
        />
        <TextField
          label="Count Date"
          name="countDate"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={stockCount.countDate}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Button
          type="button"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
          onClick={handleSubmit}
        >
          Submit Stock Count
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
  );
};

export default StockCountForm;
