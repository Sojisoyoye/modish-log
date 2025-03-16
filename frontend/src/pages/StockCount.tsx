import {
  Container,
  Typography,
  Alert,
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
  Button,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StockCountForm from '../components/StockCountForm';
import ConfirmationDialog from '../components/ConfirmationDialogue';
import { getStockCount } from '../api/api';
import { StockCountItem } from '../dto/dto';
import { formatNumber } from '../utils';

const StockCount: React.FC = () => {
  const [stockCounts, setStockCounts] = useState<StockCountItem[]>([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const fetchStockCount = async () => {
      const response = await getStockCount();
      const data = response.data;
      setStockCounts(data);
    };
    fetchStockCount();
  }, []);

  return (
    <Container component="main" maxWidth="sm">
      <StockCountForm />

      <Typography variant="h4" gutterBottom mt={4}>
        Stock Count List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Count Date</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Counted Quantity</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stockCounts.map((stockCount: StockCountItem) => (
              <TableRow key={stockCount.id}>
                <TableCell>
                  {new Date(stockCount.countDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {stockCount.product.color} ({stockCount.product.size})
                </TableCell>
                <TableCell>
                  {formatNumber(stockCount.countedQuantity)}
                </TableCell>
                <TableCell>
                  <Stack spacing={2} direction="row">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => navigate(`/edit-sale/${stockCount.id}`)}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => {}}
                    >
                      Delete
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
      </TableContainer>

      {/* <ConfirmationDialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Sale"
        message="Are you sure you want to delete this sale?"
      /> */}
    </Container>
  );
};

export default StockCount;
