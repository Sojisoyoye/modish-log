import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSale, updateSale } from '../api/api';

const UpdateSale: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [sale, setSale] = useState({
    quantitySold: 0,
    price: 0,
    paid: false,
    comment: '',
    product: {
      color: '',
      size: '',
      price: 0,
    },
  });
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const fetchSale = async () => {
      if (!id) {
        setMessage('Invalid sale ID');
        return;
      }
      try {
        const saleData = await getSale(id);
        if (saleData) {
          setSale(saleData);
        }
      } catch (err) {
        setMessage('Failed to fetch sale');
      }
    };
    fetchSale();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newPrice = sale.product.price * sale.quantitySold;
      const updatedSale = { ...sale, price: newPrice };
      if (!id) {
        setMessage('Invalid sale ID');
        return;
      }
      await updateSale(id, updatedSale);
      setMessage('Sale updated successfully!');
      navigate('/sales');
    } catch (err) {
      setMessage('Failed to update sale');
    }
  };

  const handleCancel = () => {
    navigate('/sales');
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-md">
      <div className="bg-white rounded-lg shadow-md p-6 mt-4">
        <h1 className="text-2xl font-bold mb-6">Edit Sale</h1>
        <form onSubmit={handleSubmit}>
          <div className="text-lg font-medium mb-4">
            {sale.product.color} - {sale.product.size}
          </div>

          <div className="mb-4">
            <label
              htmlFor="quantitySold"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Quantity Sold
            </label>
            <input
              id="quantitySold"
              type="number"
              value={sale.quantitySold}
              onChange={(e) =>
                setSale({ ...sale, quantitySold: Number(e.target.value) })
              }
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={sale.paid}
                onChange={(e) => setSale({ ...sale, paid: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 h-4 w-4"
              />
              <span className="ml-2">Paid</span>
            </label>
          </div>

          <div className="mb-4">
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Comment
            </label>
            <input
              id="comment"
              type="text"
              value={sale.comment}
              onChange={(e) => setSale({ ...sale, comment: e.target.value })}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="text-gray-700 font-medium mb-6">
            Price: ₦{sale.product.price * sale.quantitySold}
          </div>

          <div className="space-y-3">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Update Sale
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

export default UpdateSale;
