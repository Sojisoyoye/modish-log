import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addSale, getProducts } from '../api/api';
import { Product } from '../dto/dto';

const AddSale: React.FC = () => {
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [message, setMessage] = useState<string>('');

  const [sale, setSale] = useState({
    productId: '',
    quantitySold: 0,
    paid: false,
    comment: '',
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response);
      } catch (err) {
        setMessage('Failed to fetch products');
      }
    };
    fetchProducts();
  }, []);

  // Calculate total price when product or quantity changes
  useEffect(() => {
    const selectedProduct = products.find((p) => p.id === sale.productId);
    if (selectedProduct) {
      setTotalPrice(selectedProduct.price * sale.quantitySold);
    }
  }, [sale.productId, sale.quantitySold, products]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addSale(sale);
      setMessage('Sale recorded successfully!');
      navigate('/sales');
    } catch (error) {
      setMessage('Failed to record sale. Please check again.');
    }
  };

  const handleCancel = () => {
    navigate('/sales');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg p-6 mt-4">
        <h2 className="text-2xl font-bold mb-6">Add Sale</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="product"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Product
            </label>
            <select
              id="product"
              value={sale.productId}
              onChange={(e) => setSale({ ...sale, productId: e.target.value })}
              required
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="">Select a product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.color} {product.size}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="quantitySold"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Quantity Sold
            </label>
            <input
              id="quantitySold"
              type="number"
              name="quantitySold"
              step="0.01"
              value={sale.quantitySold}
              onChange={(e) =>
                setSale({ ...sale, quantitySold: Number(e.target.value) })
              }
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="flex items-center">
            <input
              id="paid"
              type="checkbox"
              checked={sale.paid}
              onChange={(e) => setSale({ ...sale, paid: e.target.checked })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="paid" className="ml-2 block text-sm text-gray-900">
              Paid
            </label>
          </div>

          <div>
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Comment
            </label>
            <input
              id="comment"
              type="text"
              name="comment"
              value={sale.comment}
              onChange={(e) => setSale({ ...sale, comment: e.target.value })}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="text-lg font-medium mt-4 text-gray-900">
            Total Price: ₦{totalPrice.toFixed(2)}
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-4"
          >
            Record Sale
          </button>

          <button
            type="button"
            onClick={handleCancel}
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-2"
          >
            Cancel
          </button>
        </form>

        {message && (
          <div
            className={`mt-4 p-3 text-sm rounded-md ${message.includes('success') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddSale;
