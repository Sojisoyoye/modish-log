import React, { useState } from 'react';
import ReportHistoryTable from '../components/ReportHistoryTable';
import { ReportHistoryItem } from '../dto/dto';
import { fetchReportHistory } from '../api/api';

const StockBalance: React.FC = () => {
  const [reportHistory, setReportHistory] = useState<ReportHistoryItem[]>([]);

  // To view the stock balance based on date recorded or
  // to view based on stock balance generated on a particular date

  const handleFetchReportHistory = async () => {
    try {
      const response = await fetchReportHistory();
      setReportHistory(response);
    } catch (error) {
      console.error('Error fetching report history:', error);
      alert('Failed to fetch report history.');
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
    <div className="container mx-auto px-4 py-6">
      {/* this is to fetch the stock balance report history */}
      <h2 className="text-xl font-semibold mt-8 mb-4">
        Stock Balance Report History
      </h2>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={handleFetchReportHistory}
      >
        Fetch Report History
      </button>
      {reportHistory.length > 0 && (
        <div className="mt-6">
          <ReportHistoryTable history={reportHistory} />
        </div>
      )}
    </div>
  );
};

export default StockBalance;
