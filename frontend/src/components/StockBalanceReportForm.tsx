import React, { useState } from 'react';
import { generateStockBalanceReport } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { StockBalanceReport } from '../dto/dto';

interface StockBalanceReportFormProps {
  onReportGenerated: (report: StockBalanceReport[]) => void;
}

const StockBalanceReportForm: React.FC<StockBalanceReportFormProps> = ({
  onReportGenerated,
}) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>('');
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await generateStockBalanceReport(filters);
      onReportGenerated(response);
    } catch (error) {
      console.error('Error generating report:', error);
      setMessage(`Failed to generate stock balance report. Please try again.`);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mt-4">
        <h1 className="text-2xl font-bold mb-6">
          Generate Stock Balance Report
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="start_date"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Start Date
            </label>
            <input
              id="start_date"
              name="startDate"
              type="date"
              value={filters.startDate}
              onChange={handleChange}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="end_date"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              End Date
            </label>
            <input
              id="end_date"
              name="endDate"
              type="date"
              value={filters.endDate}
              onChange={handleChange}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="space-y-3">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Generate Report
            </button>
            <button
              type="button"
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
        {message && (
          <div
            className={`mt-4 p-3 rounded-md ${
              message.includes('success')
                ? 'bg-green-50 text-green-700'
                : 'bg-red-50 text-red-700'
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default StockBalanceReportForm;
