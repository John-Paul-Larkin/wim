interface CustomerData {
  customer_id: number;
  name: string;
  rep: string;
  contact_phone: string;
  address: string;
  eircode: string;
  email: string;
}

interface SupplierData {
  supplier_id: number;
  name: string;
  rep: string;
  contact_phone: string;
  address: string;
  eircode: string;
  email: string;
}

interface EmployeeData {
  employee_id: number;
  name: string;
  email: string;
  contact_phone: string;
  address: string;
  eircode: string;
}
interface ProductData {
  product_id: number | undefined;
  name: string;
  description: string;
  quantity_in_stock: number;
  sold_by: "case" | "unit" | "kg";
  case_size: number;
  unit_rrp: number;
  restock_level: number;
  purchase_price: number;
  sale_price: number;
  sku: string;
  quantity_on_hold?: number;
}
interface ProductDataQuantity extends ProductData {
  order_quantity: number;
}

interface CustomerSelect {
  value: number;
  label: string;
}

interface ProductSelect {
  value: number;
  label: string;
}

interface FetchedData {
  fetchedData: number[] | null;
  error: Error | null;
  loading: boolean;
  refetchData: () => void;
}

interface SalesOrderDetails {
  placedDate: string;
  businessName: string;
  employeeName: string;
  productName: string;
  quantity: number;
  caseSize: number;
  soldBy: string;
  productId: number;
  pickedDate: string;
}

// interface  ProductOrderDetails {

// }
