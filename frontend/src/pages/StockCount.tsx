import {
  Container,
  Typography,
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
import { getStockCount, deleteStockCount } from '../api/api';
import { StockCountItem } from '../dto/dto';
import { formatNumber } from '../utils';
import ConfirmationDialog from '../components/ConfirmationDialogue';

const StockCount: React.FC = () => {
  const [stockCounts, setStockCounts] = useState<StockCountItem[]>([]);
  const [message, setMessage] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedStockCountId, setSelectedStockCountId] = useState<string>('');
  const navigate = useNavigate();

  const fetchStockCounts = async () => {
    try {
      const response = await getStockCount();
      setStockCounts(response.data);
      setMessage('');
    } catch (error) {
      setMessage('Failed to fetch stock counts');
    }
  };

  useEffect(() => {
    fetchStockCounts();
  }, []);

  const handleDeleteClick = (id: string) => {
    setSelectedStockCountId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSelectedStockCountId('');
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteStockCount(selectedStockCountId);
      await fetchStockCounts();
      setMessage('Stock count deleted successfully');
    } catch (error) {
      setMessage('Failed to delete stock count');
    }
    setDeleteDialogOpen(false);
    setSelectedStockCountId('');
  };

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
                      onClick={() =>
                        navigate(`/edit-stock-count/${stockCount.id}`)
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDeleteClick(stockCount.id)}
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

      <ConfirmationDialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Stock Count"
        message="Are you sure you want to delete this stock count?"
      />
    </Container>
  );
};

export default StockCount;
