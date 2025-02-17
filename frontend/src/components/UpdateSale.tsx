import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Typography, Paper, Container, FormControlLabel, Checkbox } from '@mui/material';
import { getSale, updateSale } from '../api/api';

const UpdateSale: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [sale, setSale] = useState({
    quantitySold: 0,
    price: 0,
    paid: false,
    comment: '',
    product: {
      color: '',
      size: '',
      price: 0,
    }
  });
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const fetchSale = async () => {
      try {
        const sale = await getSale(id);
        sale && setSale(sale);
      } catch (err) {
        setMessage('Failed to fetch sale');
      }
    };
    fetchSale();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newPrice = sale.product.price * sale.quantitySold;
      const updatedSale = { ...sale, price: newPrice };
      await updateSale(id, updatedSale);
      setMessage('Sale updated successfully!');
      navigate('/sales'); // Redirect to sales list after successful update
    } catch (err) {
      setMessage('Failed to update sale');
    }
  };

  const handleCancel = () => {
    navigate('/sales'); // Redirect to sales list on cancel
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h4" mb={4} gutterBottom>
          Edit Sale
        </Typography>
        <form onSubmit={handleSubmit}>
          <Typography variant='button' fontSize={20}>{sale.product.color} - {sale.product.size} </Typography>
          <TextField
            label="Quantity Sold"
            type="number"
            fullWidth
            margin="normal"
            value={sale.quantitySold}
            onChange={(e) => setSale({ ...sale, quantitySold: Number(e.target.value) })}
            required
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
          <Typography variant="body1" sx={{ marginTop: 2 }}>Price: ₦{sale.product.price * sale.quantitySold}</Typography>

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
            Update Sale
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
         {message && 
            <Typography variant="body1" sx={{ marginTop: 2, color: message.includes('success') ? 'green' : 'red' }}>
              {message}
            </Typography>
          }
      </Paper>
    </Container>
  );
};

export default UpdateSale;