import React, { useState } from 'react';
import { TextField, Button, Container, Paper, Typography } from '@mui/material';
import { generateStockBalanceReport } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { StockBalanceReport } from '../dto/dto';

interface StockBalanceReportFormProps {
  onReportGenerated: (report: StockBalanceReport[]) => void;
}

const StockBalanceReportForm: React.FC<StockBalanceReportFormProps> = ({
  onReportGenerated,
}) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>('');
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await generateStockBalanceReport(filters);
      onReportGenerated(response);
    } catch (error) {
      console.error('Error generating report:', error);
      setMessage(`Failed to submit stock count. Please check again.`);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Generate Stock Balance Report
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Start Date"
            name="start_date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={filters.startDate}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="End Date"
            name="end_date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={filters.endDate}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Button
            type="button"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Generate Report
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

export default StockBalanceReportForm;
