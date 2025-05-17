import axios from 'axios';
import {
  ReportHistoryItem,
  StockBalanceReport,
  StockCountItem,
  Product,
  Sale,
  User,
} from '../dto/dto';

const API_BASE_URL = process.env.REACT_APP_API_URL;

const ENDPOINTS = {
  products: '/products',
  sales: '/sales',
  stockCounts: '/stock/counts',
  stockBalanceReports: '/stock/balance-reports',
  users: '/users',
};

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Product APIs
export const addProduct = async (
  product: Omit<Product, 'id'>
): Promise<Product> => {
  const { data } = await api.post(ENDPOINTS.products, product);
  return data;
};

export const getProducts = async (): Promise<Product[]> => {
  const { data } = await api.get(ENDPOINTS.products);
  return data;
};

export const getProduct = async (id: string): Promise<Product> => {
  const { data } = await api.get(`${ENDPOINTS.products}/${id}`);
  return data;
};

export const updateProduct = async (
  id: string,
  productData: Partial<Product>
): Promise<Product> => {
  const { data } = await api.put(`${ENDPOINTS.products}/${id}`, productData);
  return data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await api.delete(`${ENDPOINTS.products}/${id}`);
};

// Sale APIs
export class CreateSaleDto {
  productId!: string;
  quantitySold!: number;
  paid!: boolean;
  comment!: string;
}

export const addSale = async (sale: CreateSaleDto): Promise<Sale> => {
  const { data } = await api.post(ENDPOINTS.sales, sale);
  return data;
};

export const getSales = async (): Promise<Sale[]> => {
  const { data } = await api.get(ENDPOINTS.sales);
  return data;
};

export const getSale = async (id: string): Promise<Sale> => {
  const { data } = await api.get(`${ENDPOINTS.sales}/${id}`);
  return data;
};

export const updateSale = async (
  id: string,
  saleData: Partial<Sale>
): Promise<Sale> => {
  const { data } = await api.put(`${ENDPOINTS.sales}/${id}`, saleData);
  return data;
};

export const deleteSale = async (id: string): Promise<void> => {
  await api.delete(`${ENDPOINTS.sales}/${id}`);
};

// Stock Count APIs
export const submitStockCount = async (data: {
  productId: string;
  countedQuantity: number;
  countDate: string;
}): Promise<StockCountItem> => {
  const { data: result } = await api.post(ENDPOINTS.stockCounts, data);
  return result;
};

export const getStockCount = async (): Promise<StockCountItem[]> => {
  const { data } = await api.get(ENDPOINTS.stockCounts);
  return data;
};

export const deleteStockCount = async (id: string): Promise<void> => {
  await api.delete(`${ENDPOINTS.stockCounts}/${id}`);
};

// Stock Balance Report APIs
export const generateStockBalanceReport = async (data: {
  startDate: string;
  endDate: string;
}): Promise<StockBalanceReport[]> => {
  const { data: result } = await api.post(ENDPOINTS.stockBalanceReports, data);
  return result;
};

export const fetchReportHistory = async (): Promise<ReportHistoryItem[]> => {
  const { data } = await api.get(ENDPOINTS.stockBalanceReports);
  return data;
};

// User APIs

export const getUsers = async (): Promise<User[]> => {
  const { data } = await api.get(ENDPOINTS.users);
  return data;
};

export const createUser = async (user: Omit<User, 'id'>): Promise<User> => {
  const { data } = await api.post(ENDPOINTS.users, user);
  return data;
};

export const updateUser = async (
  id: string,
  userData: Partial<User>
): Promise<User> => {
  const { data } = await api.put(`${ENDPOINTS.users}/${id}`, userData);
  return data;
};

export const deleteUser = async (id: string): Promise<void> => {
  return await api.delete(`${ENDPOINTS.users}/${id}`);
};

export default api;
