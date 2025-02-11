import React, { useEffect, useState } from 'react';
import { getProducts } from '../api/api';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Container } from '@mui/material';

interface Product {
  id: number;
  color: string;
  size: string;
  quantity: number;
  price: number;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <Container component="main" maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {/* <TableCell>ID</TableCell> */}
              <TableCell>Color</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                {/* <TableCell>{product.id}</TableCell> */}
                <TableCell>{product.color}</TableCell>
                <TableCell>{product.size}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>₦{product.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Container>
  );
};

export default ProductList;