export interface Product {
  id: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
}

export interface Sale {
  quantitySold: number;
  price: number;
}

export interface StockCount {
  productId: string;
  countedQuantity: number;
  countDate: string;
}

export interface StockBalanceReport {
  productId: string;
  productColor: string;
  productSize: string;
  expectedQuantity: number;
  actualQuantity: number;
  difference: number;
  status: string;
}

export interface ReportHistoryItem {
  id: string;
  product: {
    color: string;
    size: string;
  };
  expectedQuantity: number;
  actualQuantity: number;
  difference: number;
  reportDate: string;
}