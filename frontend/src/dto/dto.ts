export class Product {
  id: string;
  color: string;
  size: string;
  quantity: number;
  price: number;

  constructor(
    id: string,
    color: string,
    size: string,
    quantity: number,
    price: number
  ) {
    this.id = id;
    this.color = color;
    this.size = size;
    this.quantity = quantity;
    this.price = price;
  }
}

// class Product {
//   id!: string;
//   color!: string;
//   size!: string;
//   price!: number;
//   quantity!: number;
// }

export interface Sale {
  id: string;
  quantitySold: number;
  saleDate: string;
  price: number;
  paid: boolean;
  comment: string;
  product: {
    color: string;
    size: string;
    price: number;
  };
}

// class Sale {
//   id: string = '';
//   quantitySold: number = 0;
//   saleDate: string = '';
//   price: number = 0;
//   paid: boolean = false;
//   comment: string = '';
//   product: {
//     id: number;
//     color: string;
//     size: string;
//   } = {
//     id: 0,
//     color: '',
//     size: '',
//   };
// }

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

export interface User {
  id: string;
  username: string;
  password: string;
  role: string;
}

export class CreateUserDto {
  username!: string;
  password!: string;
  role!: string;
}
