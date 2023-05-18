interface CustomerData {
  customer_id: number;
  name: string;
  rep: string;
  contact_phone: string;
  address: string;
  eircode: string;
  email: string;
}

interface ProductData {
  product_id: number | undefined;
  name: string;
  description: string;
  quantity_in_stock: number;
  sold_by: "case" | "unit" | "kg";
  case_size: number;
  rrp: number;
  restock_level: number;
}

