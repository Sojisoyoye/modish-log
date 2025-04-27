import axios from 'axios';
import {
  ReportHistoryItem,
  StockBalanceReport,
  StockCountItem,
  Product,
  Sale,
} from '../dto/dto';

const API_BASE_URL = process.env.REACT_APP_API_URL;
const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

export const addProduct = async (product: Omit<Product, 'id'>) => {
  const response = await axios.post(`${API_BASE_URL}/products`, { ...product });
  return response.data;
};

export const getProducts = async () => {
  const response = await axios.get(`${API_BASE_URL}/products`);
  return response.data;
};

export class CreateSaleDto {
  productId!: string;
  quantitySold!: number;
  paid!: boolean;
  comment!: string;
}

export const addSale = async (sale: CreateSaleDto) => {
  const response = await axios.post(`${API_BASE_URL}/sales`, { ...sale });
  return response.data;
};

export const getSales = async () => {
  const response = await axios.get(`${API_BASE_URL}/sales`);
  return response.data;
};

export const getSale = async (id?: string) => {
  const response = await api.get(`${API_BASE_URL}/sales/${id}`);
  return response.data;
};

export const updateSale = async (
  id: string | undefined,
  saleData: Partial<Sale>
) => {
  const response = await api.put(`/sales/${id}`, saleData);
  return response.data;
};

export const deleteSale = async (id: string) => {
  const response = await api.delete(`/sales/${id}`);
  return response.data;
};

export const getProduct = async (id?: string) => {
  const response = await api.get(`${API_BASE_URL}/products/${id}`);
  return response.data;
};

export const updateProduct = async (
  id: string | undefined,
  productData: Partial<Product>
) => {
  const response = await api.put(`/products/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id: string) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};

// Stock Count and Stock Balance Report APIs

export const submitStockCount = async (data: {
  productId: string;
  countedQuantity: number;
  countDate: string;
}) => {
  return axios.post(`${API_BASE_URL}/stock/counts`, data);
};

export const getStockCount = async () => {
  return axios.get<StockCountItem[]>(`${API_BASE_URL}/stock/counts`);
};

export const generateStockBalanceReport = async (data: {
  startDate: string;
  endDate: string;
}) => {
  return axios.post<StockBalanceReport[]>(
    `${API_BASE_URL}/stock/balance-reports`,
    data
  );
};

export const fetchReportHistory = async () => {
  return axios.get<ReportHistoryItem[]>(
    `${API_BASE_URL}/stock/balance-reports`
  );
};

export const deleteStockCount = async (id: string) => {
  return axios.delete(`${API_BASE_URL}/stock/counts/${id}`);
};
