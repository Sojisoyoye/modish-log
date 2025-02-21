import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { ReportHistoryItem } from "../dto/dto";

interface ReportHistoryTableProps {
  history: ReportHistoryItem[];
}

const ReportHistoryTable: React.FC<ReportHistoryTableProps> = ({ history }) => {
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
            <TableCell>Report Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {history.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.product.color}</TableCell>
              <TableCell>{item.product.size}</TableCell>
              <TableCell>{item.expectedQuantity}</TableCell>
              <TableCell>{item.actualQuantity}</TableCell>
              <TableCell>{item.difference}</TableCell>
              <TableCell>{new Date(item.reportDate).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReportHistoryTable;