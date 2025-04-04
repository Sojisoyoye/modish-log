/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { SxProps, Theme } from '@mui/material/styles';
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
  Box,
} from '@mui/material';
import { formatNumber } from '../utils';
import { useNavigate } from 'react-router-dom';
import ConfirmationDialog from '../components/ConfirmationDialogue';

class Sale {
  id: string = '';
  quantitySold: number = 0;
  saleDate: string = '';
  price: number = 0;
  paid: boolean = false;
  comment: string = '';
  product: {
    id: number;
    color: string;
    size: string;
  } = {
    id: 0,
    color: '',
    size: '',
  };
}

interface SalesProps {
  sales: Sale[];
  message: string | null;
  deleteDialogOpen: boolean;
  handleDeleteClick: (id: string) => void;
  handleDeleteCancel: () => void;
  handleDeleteConfirm: () => void;
  navigate: (path: string) => void;
  formatNumber: (num: number) => string;
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
        setSales(sales.filter((sale) => sale.id !== saleToDelete));
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
    <Container component="main" maxWidth="md" sx={containerStyles}>
      <Box sx={headerStyles}>
        <Typography variant="h4" gutterBottom>
          Sales
        </Typography>
      </Box>

      <Box sx={scrollableContentStyles}>
        <TableContainer component={Paper}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={tableHeaderStyles}>Date</TableCell>
                <TableCell sx={tableHeaderStyles}>Product</TableCell>
                <TableCell sx={tableHeaderStyles}>Quantity</TableCell>
                <TableCell sx={tableHeaderStyles}>Price</TableCell>
                <TableCell sx={tableHeaderStyles}>Paid</TableCell>
                <TableCell sx={tableHeaderStyles}>Comment</TableCell>
                <TableCell sx={tableHeaderStyles}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sales.map((sale) => (
                <TableRow key={sale.id} hover>
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
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        onClick={() => navigate(`/edit-sale/${sale.id}`)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        color="error"
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
        </TableContainer>

        {message && (
          <Typography
            variant="body1"
            sx={messageStyles(message.includes('success'))}
          >
            {message}
          </Typography>
        )}
      </Box>

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

const tableHeaderStyles: SxProps<Theme> = {
  fontWeight: 'bold',
  fontSize: '1rem',
};

const containerStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  p: 2,
  overflow: 'hidden',
  // marginBottom: '4rem'
};

const headerStyles: SxProps<Theme> = {
  mb: 2,
};

const scrollableContentStyles: SxProps<Theme> = {
  flex: 1,
  overflow: 'auto',
  '&::-webkit-scrollbar': {
    width: '0.4em',
  },
  '&::-webkit-scrollbar-track': {
    boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(0,0,0,.1)',
    borderRadius: '4px',
  },
};

const messageStyles = (isSuccess: boolean): SxProps<Theme> => ({
  mt: 2,
  color: isSuccess ? 'success.main' : 'error.main',
});
