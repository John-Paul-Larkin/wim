import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Select from "react-select";
import useFetchData from "../../hooks/useFetchData";
import { CustomerDetails } from "./CustomerDetails";
import { OrdersCategories } from "./OrdersCategories";

import "./SalesOrders.css";
import { SelectedProducts } from "./SelectedProducts";

export const Salesorders = () => {
  const { fetchedData: fetchedCustomerData } = useFetchData<CustomerData[]>("/customer/");
  const { fetchedData: fetchedProductData, refetchData: refetchProductData } = useFetchData<ProductData[]>("/product/");

  const customerOptions: CustomerSelect[] = [];
  const productOptions: ProductSelect[] = [];

  const [selectedCustomer, setSelectedCustomer] = useState<CustomerSelect | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<ProductDataQuantity[]>([]);

  useEffect(() => {
    const localStorageSelectedProducts = localStorage.getItem("selectedProducts");
    const localStorageSelectedCustomer = localStorage.getItem("selectedCustomer");

    if (localStorageSelectedProducts && JSON.parse(localStorageSelectedProducts).length > 0) {
      setSelectedProducts([...JSON.parse(localStorageSelectedProducts)]);
      if (localStorageSelectedCustomer) {
        setSelectedCustomer(JSON.parse(localStorageSelectedCustomer));
      }
    }
  }, []);

  let customerDetails: CustomerData | null | undefined = null;

  if (fetchedCustomerData && fetchedProductData) {
    // Once the data has been fetched create an array with options for both selects

    fetchedCustomerData.forEach((customer) => {
      customerOptions.push({
        value: customer.customer_id,
        label: customer.name,
      });
    });
    fetchedProductData.forEach((product) => {
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
      customerDetails = fetchedCustomerData.find((customer) => customer.customer_id === selectedCustomer.value);
    }
  }

  const handleClickProductSelect = (selectedOption: ProductSelect | null) => {
    // const productData = fetchedProductData as ProductData[];
    if (fetchedProductData) {
      const selectedProduct = fetchedProductData.find((product) => product.product_id === selectedOption?.value);
      if (selectedProduct) {
        if (!selectedProducts.find((product) => product.product_id === selectedProduct.product_id)) {
          // IF the item has not preveiously been added to the array/cart
          setSelectedProducts([...selectedProducts, { ...selectedProduct, order_quantity: 0 }]);
          localStorage.setItem("selectedProducts", JSON.stringify([...selectedProducts, { ...selectedProduct, order_quantity: 0 }]));
        }
      }
    }
  };

  const handleChangeCustomerSelect = (selectedOption: CustomerSelect | null) => {
    setSelectedCustomer(selectedOption);
    localStorage.setItem("selectedCustomer", JSON.stringify(selectedOption));
  };

  const pickedFetchedData = useFetchData<number[]>("/saleOrder/getOrderPickedIds");
  const receivedFetchedData = useFetchData<number[]>("/saleOrder/getOrderReceivedIds");
  const sentFetchedData = useFetchData<number[]>("/saleOrder/getOrderSentIds");

  return (
    <div className="sales-order">
      <h1>
        {" "}
        <span>Sales orders</span>
      </h1>
      <div className="place-order">
        {!selectedCustomer && <div>Choose a customer to place an order</div>}
        <Select
          className="customer-select"
          placeholder={selectedCustomer ? "Change customer" : "Select a customer"}
          options={customerOptions}
          onChange={handleChangeCustomerSelect}
          value={null}
        ></Select>
        <AnimatePresence>
          {selectedCustomer && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              transition={{ duration: 0.25 }}
              exit={{ opacity: 0 }}
            >
              <CustomerDetails customerDetails={customerDetails} />
              <SelectedProducts
                productOptions={productOptions}
                handleClickProductSelect={handleClickProductSelect}
                selectedProducts={selectedProducts}
                setSelectedProducts={setSelectedProducts}
                selectedCustomer={selectedCustomer}
                setSelectedCustomer={setSelectedCustomer}
                refetchReceivedIds={receivedFetchedData.refetchData}
                refetchProductData={refetchProductData}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <OrdersCategories pickedFetchedData={pickedFetchedData} receivedFetchedData={receivedFetchedData} sentFetchedData={sentFetchedData} />
    </div>
  );
};
