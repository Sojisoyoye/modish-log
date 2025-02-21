import React, { useState } from "react";
import { Container, Typography, Button } from "@mui/material";
import { ReportHistoryItem, StockBalanceReport } from "../dto/dto";
import { fetchReportHistory } from "../api/api";
import StockCountForm from "../components/StockCountForm";
import StockBalanceReportForm from "../components/StockBalanceReportForm";
import StockBalanceReportTable from "../components/StockBalanceReportTable";
import ReportHistoryTable from "../components/ReportHistoryTable";
import { useNavigate } from "react-router-dom";


const Stock: React.FC = () => {
  const navigate = useNavigate();
  const [stockBalanceReport, setStockBalanceReport] = useState<StockBalanceReport[]>([]);
  const [reportHistory, setReportHistory] = useState<ReportHistoryItem[]>([]);

  const handleFetchReportHistory = async () => {
    try {
      const response = await fetchReportHistory();
      setReportHistory(response.data);
    } catch (error) {
      console.error("Error fetching report history:", error);
      alert("Failed to fetch report history.");
    }
  };

  // seperate the stock count and generate stock balance report to two different components
  // put stock balance report history in a separate component page, make it render on mount
  // stock count list page
  // stock balance report page
  // stock balance report history page
  // stock count form
  // stock balance report form
  // stock balance report history table
  // stock balance report table


  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Go To Stock Count
      </Typography>
      <Button variant="contained" color="secondary" onClick={() => navigate('/stock-count')}>
        Stock Count
      </Button>

      
      <Typography variant="h5" gutterBottom style={{ marginTop: "2rem" }}>
        Generate Stock Balance Report
      </Typography>
      <StockBalanceReportForm onReportGenerated={setStockBalanceReport} />

      {stockBalanceReport.length > 0 && (
        <>
          <Typography variant="h5" gutterBottom style={{ marginTop: "2rem" }}>
            Stock Balance Report
          </Typography>
          <StockBalanceReportTable report={stockBalanceReport} />
        </>
      )}

      <Typography variant="h5" gutterBottom style={{ marginTop: "2rem" }}>
        Stock Balance Report History
      </Typography>
      <Button variant="contained" color="secondary" onClick={handleFetchReportHistory}>
        Fetch Report History
      </Button>
      {reportHistory.length > 0 && <ReportHistoryTable history={reportHistory} />}
    </Container>
  );
};

export default Stock;