import React, { useState } from "react";
import { TextField, Button, Typography, Container, Paper } from "@mui/material";
import { StockCount } from "../dto/dto";
import { submitStockCount } from "../api/api";
import { useNavigate } from "react-router-dom";


const StockCountForm: React.FC = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>('');
    
  const [stockCount, setStockCount] = useState<StockCount>({
    productId: "",
    countedQuantity: 0,
    countDate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStockCount({ ...stockCount, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await submitStockCount({
        ...stockCount,
        productId: stockCount.productId,
        countedQuantity: parseInt(stockCount.countedQuantity.toString()),
      });
      setMessage("Stock count submitted successfully!");
      setStockCount({ productId: "", countedQuantity: 0, countDate: "" });
    } catch (error) {
        setMessage(`Failed to submit stock count. Please check again. ${error} `);
    }
  };

  const handleCancel = () => {
    navigate('/'); 
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Add Stock Count
        </Typography>
        <form onSubmit={handleSubmit}>
      <TextField
        label="Product ID"
        name="product_id"
        value={stockCount.productId}
        onChange={handleChange}
        fullWidth
        margin="normal"
        type="number"
      />
      <TextField
        label="Counted Quantity"
        name="counted_quantity"
        value={stockCount.countedQuantity}
        onChange={handleChange}
        fullWidth
        margin="normal"
        type="number"
      />
      <TextField
        label="Count Date"
        name="count_date"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={stockCount.countDate}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button type="button" variant="contained" color="primary" fullWidth  sx={{ marginTop: 2 }}>
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
          <Typography variant="body1" sx={{ marginTop: 2, color: message.includes('success') ? 'green' : 'red' }}>
            {message}
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default StockCountForm;