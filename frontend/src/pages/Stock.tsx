import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import { StockBalanceReport } from "../dto/dto";
import StockBalanceReportForm from "../components/StockBalanceReportForm";
import StockBalanceReportTable from "../components/StockBalanceReportTable";

const GenerateStockBalance: React.FC = () => {
  const [stockBalanceReport, setStockBalanceReport] = useState<StockBalanceReport[]>([]);

  return (
    <Container>
      {/* generate stock balance report is to trigger stock balance for all products within 
      a start date and end date after stock count */}
      <StockBalanceReportForm onReportGenerated={setStockBalanceReport} />
      {stockBalanceReport.length > 0 && (
        <>
          <Typography variant="h5" gutterBottom style={{ marginTop: "2rem" }}>
            Generated Stock Balance
          </Typography>
          <StockBalanceReportTable report={stockBalanceReport} />
        </>
      )}
    </Container>
  );
};

export default GenerateStockBalance;