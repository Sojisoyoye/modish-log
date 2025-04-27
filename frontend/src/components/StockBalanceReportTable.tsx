import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { StockBalanceReport } from '../dto/dto';

interface StockBalanceReportTableProps {
  report: StockBalanceReport[];
}

const StockBalanceReportTable: React.FC<StockBalanceReportTableProps> = ({
  report,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product Color</TableCell>
            <TableCell>Product Size</TableCell>
            <TableCell>Expected Quantity</TableCell>
            <TableCell>Actual Quantity</TableCell>
            <TableCell>Difference</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {report.map((item: StockBalanceReport) => (
            <TableRow key={item.productId}>
              <TableCell>{item.productColor}</TableCell>
              <TableCell>{item.productSize}</TableCell>
              <TableCell>{item.expectedQuantity}</TableCell>
              <TableCell>{item.actualQuantity}</TableCell>
              <TableCell>{item.difference}</TableCell>
              <TableCell>{item.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StockBalanceReportTable;
