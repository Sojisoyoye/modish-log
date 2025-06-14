import React, { useState } from 'react';
import { StockBalanceReport } from '../dto/dto';
import StockBalanceReportForm from '../components/StockBalanceReportForm';
import StockBalanceReportTable from '../components/StockBalanceReportTable';

const GenerateStockBalance: React.FC = () => {
  const [stockBalanceReport, setStockBalanceReport] = useState<
    StockBalanceReport[]
  >([]);

  return (
    <div className="container mx-auto px-4 py-6">
      {/* generate stock balance report is to trigger stock balance for all products within 
      a start date and end date after stock count */}
      <StockBalanceReportForm onReportGenerated={setStockBalanceReport} />
      {stockBalanceReport.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mt-8 mb-4">
            Generated Stock Balance
          </h2>
          <StockBalanceReportTable report={stockBalanceReport} />
        </>
      )}
    </div>
  );
};

export default GenerateStockBalance;
