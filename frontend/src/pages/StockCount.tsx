import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StockCountForm from '../components/StockCountForm';
import { getStockCount, deleteStockCount } from '../api/api';
import { StockCountItem } from '../dto/dto';
import { formatNumber } from '../utils';
import ConfirmationDialog from '../components/ConfirmationDialogue';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

const StockCount: React.FC = () => {
  const [stockCounts, setStockCounts] = useState<StockCountItem[]>([]);
  const [message, setMessage] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedStockCountId, setSelectedStockCountId] = useState<string>('');
  const navigate = useNavigate();

  const fetchStockCounts = async () => {
    try {
      const response = await getStockCount();
      setStockCounts(response);
      setMessage('');
    } catch (error) {
      setMessage('Failed to fetch stock counts');
    }
  };

  useEffect(() => {
    fetchStockCounts();
  }, []);

  const handleDeleteClick = (id: string) => {
    setSelectedStockCountId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSelectedStockCountId('');
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteStockCount(selectedStockCountId);
      await fetchStockCounts();
      setMessage('Stock count deleted successfully');
    } catch (error) {
      setMessage('Failed to delete stock count');
    }
    setDeleteDialogOpen(false);
    setSelectedStockCountId('');
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <StockCountForm />

      <h2 className="text-2xl font-bold mt-8 mb-4">Stock Count List</h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Count Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Product
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Counted Quantity
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stockCounts.map((stockCount: StockCountItem) => (
                <tr key={stockCount.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(stockCount.countDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {stockCount.product.color} ({stockCount.product.size})
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatNumber(stockCount.countedQuantity)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button
                        className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        onClick={() =>
                          navigate(`/edit-stock-count/${stockCount.id}`)
                        }
                      >
                        <PencilIcon className="h-4 w-4 mr-1" /> Edit
                      </button>
                      <button
                        className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        onClick={() => handleDeleteClick(stockCount.id)}
                      >
                        <TrashIcon className="h-4 w-4 mr-1" /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {message && (
          <div
            className={`m-4 p-3 rounded-md ${
              message.includes('success')
                ? 'bg-green-50 text-green-700'
                : 'bg-red-50 text-red-700'
            }`}
          >
            {message}
          </div>
        )}
      </div>

      <ConfirmationDialog
        open={deleteDialogOpen}
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Stock Count"
        content="Are you sure you want to delete this stock count?"
      />
    </div>
  );
};

export default StockCount;
