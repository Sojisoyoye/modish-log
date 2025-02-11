import React, { useEffect, useState } from 'react';
import { getSales } from '../api/api';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Container } from '@mui/material';

interface Sale {
  id: number;
  quantitySold: number;
  saleDate: string;
  price: number;
  product: {
    id: number;
    color: string;
    size: string;
  };
}

const SalesList: React.FC = () => {
  const [sales, setSales] = useState<Sale[]>([]);

  useEffect(() => {
    const fetchSales = async () => {
      const data = await getSales();
      setSales(data);
    };
    fetchSales();
  }, []);

  return (
    <Container component="main" maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Sales
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {/* <TableCell>ID</TableCell> */}
              <TableCell>Product</TableCell>
              <TableCell>Quantity Sold</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Sale Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sales.map((sale) => (
              <TableRow key={sale.id}>
                {/* <TableCell>{sale.id}</TableCell> */}
                <TableCell>
                  {sale.product.color} ({sale.product.size})
                </TableCell>
                <TableCell>{sale.quantitySold}</TableCell>
                <TableCell>₦{sale.price}</TableCell>
                <TableCell>{new Date(sale.saleDate).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default SalesList;