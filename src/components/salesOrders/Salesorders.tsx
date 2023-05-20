import { useState } from "react";
import Select from "react-select";
import useFetchData from "../../hooks/useFetchData";
import "./SalesOrders.css";
import { SelectedProducts } from "./SelectedProducts";

export const Salesorders = () => {
  interface CustomerSelect {
    value: number;
    label: string;
  }

  interface ProductSelect {
    value: number;
    label: string;
  }

  const { fetchedData: fetchedCustomerData } = useFetchData("/customer/");
  const { fetchedData: fetchedProductData } = useFetchData("/product/");

  const customerOptions: CustomerSelect[] = [];
  const productOptions: ProductSelect[] = [];

  const [selectedCustomer, setSelectedCustomer] = useState<CustomerSelect | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<ProductDataQuantity[]>([]);

  let customerDetails: CustomerData | null | undefined = null;

  if (fetchedCustomerData && fetchedProductData) {
    // Once the data has been fetched create an array with options for both selects
    const customerData = fetchedCustomerData as CustomerData[];
    const productData = fetchedProductData as ProductData[];

    customerData.forEach((customer) => {
      customerOptions.push({
        value: customer.customer_id,
        label: customer.name,
      });
    });
    productData.forEach((product) => {
      let id = 0; //product id may possibly be undefined
      if (product.product_id) {
        id = product.product_id;
      }
      productOptions.push({
        value: id,
        label: product.name,
      });
    });

    // Once a cutomer has been selected
    if (selectedCustomer) {
      customerDetails = customerData.find((customer) => customer.customer_id == selectedCustomer.value);
    }
  }

  const handleClickProdcutSelect = (selectedOption: ProductSelect | null) => {
    const productData = fetchedProductData as ProductData[];

    const selectedProduct = productData.find((product) => product.product_id === selectedOption?.value);
    if (selectedProduct) {
      setSelectedProducts([...selectedProducts, {...selectedProduct,quantity:0}]);
    }
  };

  return (
    <div className="sales-orders">
      <div className="place-order">
        <Select options={customerOptions} onChange={(selectedOption: CustomerSelect | null) => setSelectedCustomer(selectedOption)}></Select>
        <div>
          <span>Customer:</span>
          <span>{customerDetails?.name}</span>
        </div>
        <div>
          <span>Rep:</span>
          <span>{customerDetails?.rep}</span>
        </div>
        <Select options={productOptions} onChange={handleClickProdcutSelect}></Select>
        <SelectedProducts selectedProducts={selectedProducts}/>
      </div>
      <div className="received">received</div>
      <div className="picked">picked</div>
      <div className="returned">returned</div>
      <div className="sent">sent</div>
    </div>
  );
};
