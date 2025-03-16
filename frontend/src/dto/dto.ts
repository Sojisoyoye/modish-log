export class Product {
  id: string;
  color: string;
  size: string;
  quantity: number;
  price: number;

  constructor(id: string, color: string, size: string, quantity: number, price: number) {
    this.id = id;
    this.color = color;
    this.size = size;
    this.quantity = quantity;
    this.price = price;
  }
}

export interface Sale {
  quantitySold: number;
  price: number;
}

export class StockCount {
  productId: string;
  countedQuantity: number;
  countDate: string;

  constructor(productId: string, countedQuantity: number, countDate: string) {
    this.productId = productId;
    this.countedQuantity = countedQuantity;
    this.countDate = countDate;
  }
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

export interface StockCountItem {
  id: string;
  product: {
    color: string;
    size: string;
  };
  countedQuantity: number;
  countDate: string;
}
