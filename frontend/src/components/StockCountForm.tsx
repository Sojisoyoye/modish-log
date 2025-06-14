import React, { useState } from 'react';
import { submitStockCount } from '../api/api';
import { useNavigate } from 'react-router-dom';

interface StockCountFormData {
  productId: string;
  countedQuantity: number;
  countDate: string;
}

const StockCountForm: React.FC = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>('');

  const [stockCount, setStockCount] = useState<StockCountFormData>({
    productId: '',
    countedQuantity: 0,
    countDate: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStockCount({ ...stockCount, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitStockCount({
        productId: stockCount.productId,
        countedQuantity: parseInt(stockCount.countedQuantity.toString()),
        countDate: stockCount.countDate,
      });
      setMessage('Stock count submitted successfully!');
      setStockCount({ productId: '', countedQuantity: 0, countDate: '' });
    } catch (error) {
      setMessage(`Failed to submit stock count. Please check again. ${error} `);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-4">
      <h1 className="text-2xl font-bold mb-6">Add Stock Count</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="productId"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Product ID
          </label>
          <input
            id="productId"
            name="productId"
            type="text"
            value={stockCount.productId}
            onChange={handleChange}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="countedQuantity"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Counted Quantity
          </label>
          <input
            id="countedQuantity"
            name="countedQuantity"
            type="number"
            value={stockCount.countedQuantity}
            onChange={handleChange}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="countDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Count Date
          </label>
          <input
            id="countDate"
            name="countDate"
            type="date"
            value={stockCount.countDate}
            onChange={handleChange}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div className="space-y-3">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit Stock Count
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
          className={`mt-4 p-3 rounded-md ${message.includes('success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default StockCountForm;
