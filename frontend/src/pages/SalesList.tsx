import React, { useEffect, useState } from 'react';
import { deleteSale, getSales } from '../api/api';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Container,
  Button,
  Stack,
} from '@mui/material';
import { formatNumber } from '../utils';
import { useNavigate } from 'react-router-dom';
import ConfirmationDialog from '../components/ConfirmationDialogue';

interface Sale {
  id: string;
  quantitySold: number;
  saleDate: string;
  price: number;
  paid: boolean;
  comment: string;
  product: {
    id: number;
    color: string;
    size: string;
  };
}

const SalesList: React.FC = () => {
  const navigate = useNavigate();
  const [sales, setSales] = useState<Sale[]>([]);
  const [message, setMessage] = useState<string>('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [saleToDelete, setSaleToDelete] = useState<string | null>(null);

  useEffect(() => {
    const fetchSales = async () => {
      const data = await getSales();
      setSales(data);
    };
    fetchSales();
  }, []);

  const handleDeleteClick = (id: string) => {
    setSaleToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (saleToDelete !== null) {
      try {
        await deleteSale(saleToDelete);
        setMessage('Sale deleted successfully');
        setSales(sales.filter((sale) => sale.id !== saleToDelete)); // Remove the sale from the list
      } catch (err) {
        setMessage('Failed to delete sale - ' + err);
      } finally {
        setDeleteDialogOpen(false);
        setSaleToDelete(null);
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSaleToDelete(null);
  };

  return (
    <Container component="main" maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Sales
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sale Date</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Quantity Sold</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Comment</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell>
                  {new Date(sale.saleDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {sale.product.color} ({sale.product.size})
                </TableCell>
                <TableCell>{formatNumber(sale.quantitySold)}</TableCell>
                <TableCell>₦{sale.price}</TableCell>
                <TableCell>{sale.paid ? 'Yes' : 'No'}</TableCell>
                <TableCell>{sale.comment || '-'}</TableCell>
                <TableCell>
                  <Stack spacing={2} direction="row">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => navigate(`/edit-sale/${sale.id}`)}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDeleteClick(sale.id)}
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
        title="Delete Sale"
        message="Are you sure you want to delete this sale?"
      />
    </Container>
  );
};

export default SalesList;
