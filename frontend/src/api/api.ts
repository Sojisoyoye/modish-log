import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

export const addProduct = async (product: any) => {
  const response = await axios.post(`${API_BASE_URL}/products`, {...product});
  return response.data;
};

export const getProducts = async () => {
  const response = await axios.get(`${API_BASE_URL}/products`);
  return response.data;
};

export const addSale = async (productId: string, quantitySold: number) => {
  const response = await axios.post(`${API_BASE_URL}/sales`, {
    productId,
    quantitySold,
  });
  return response.data;
};

export const getSales = async () => {
  const response = await axios.get(`${API_BASE_URL}/sales`);
  return response.data;
};