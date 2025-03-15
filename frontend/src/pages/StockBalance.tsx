import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import ReportHistoryTable from "../components/ReportHistoryTable";
import { ReportHistoryItem } from "../dto/dto";
import { fetchReportHistory } from "../api/api";


const StockBalance: React.FC = () => {
      const [reportHistory, setReportHistory] = useState<ReportHistoryItem[]>([]);

      // To view the stock balance based on date recorded or 
      // to view based on stock balance generated on a particular date
    
      const handleFetchReportHistory = async () => {
        try {
          const response = await fetchReportHistory();
          setReportHistory(response.data);
        } catch (error) {
          console.error("Error fetching report history:", error);
          alert("Failed to fetch report history.");
        }
      };

    //    useEffect(() => {
    //       const fetchStockBalanceReport = async () => {
    //         const response = await fetchReportHistory();
    //         setReportHistory(response.data);
    //       };
    //       fetchStockBalanceReport();
    //     }, []);

    return (
        <>
    {/* this is to fetch the stock balance report history */}
      <Typography variant="h5" gutterBottom style={{ marginTop: "2rem" }}>
        Stock Balance Report History
      </Typography>
      <Button variant="contained" color="secondary" onClick={handleFetchReportHistory}>
        Fetch Report History
      </Button>
      {reportHistory.length > 0 && <ReportHistoryTable history={reportHistory} />}
        </>
    );

};

export default StockBalance;