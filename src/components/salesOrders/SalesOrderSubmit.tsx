import Swal from "sweetalert2";
import usePostData from "../../hooks/usePostData";
// import { Products } from "../products/Products";

interface Inputs {
  selectedProducts: ProductDataQuantity[];
  selectedCustomer: CustomerSelect | null;
  setSelectedCustomer: React.Dispatch<React.SetStateAction<CustomerSelect | null>>;
  setSelectedProducts: React.Dispatch<React.SetStateAction<ProductDataQuantity[]>>;
  refetchReceivedIds: () => void;
  refetchProductData: () => void;
}

export const SalesOrderSubmit = (props: Inputs) => {
  const { selectedCustomer, selectedProducts, setSelectedCustomer, setSelectedProducts, refetchReceivedIds, refetchProductData } = props;

  // remove details from local storage and empty state
  const handleClearOrder = () => {
    setSelectedCustomer(null);
    localStorage.setItem("selectedCustomer", JSON.stringify(null));
    setSelectedProducts([]);
    localStorage.setItem("selectedProducts", JSON.stringify([]));
  };

  const { postData } = usePostData();

  const handlePlaceOrder = async () => {
    // before putting through the order, check if
    // there are any products with no quantity selected
    const productsWithZeroQuantity: string[] = [];
    selectedProducts.forEach((product) => {
      if (product.order_quantity === 0) {
        productsWithZeroQuantity.push(product.name);
      }
    });

     if (productsWithZeroQuantity.length > 0) {
      const message = productsWithZeroQuantity.join(" and ");
      Swal.fire({
        icon: "error",
        title: "Please add a quantity",
        text: message,
      });
    } else {
      const orderDetails = JSON.stringify({
        customerID: selectedCustomer?.value,
        products: selectedProducts,
        employeeID: 2,
      });

      const { error } = await postData({ url: "/saleOrder/", jsonData: orderDetails });
      if (error) {
        Swal.fire({
          icon: "error",
          title: "Something went wrong!",
          text: error?.message,
        });
      } else {
        handleClearOrder();
        refetchReceivedIds();
        refetchProductData();
        Swal.fire("Order has been placed");
      }
    }
  };

  return (
    <div className="order-submit">
      <span>
        <button onClick={handleClearOrder}>Clear order</button>
        <button onClick={handlePlaceOrder} disabled={selectedProducts.length === 0}>
          Place order
        </button>
      </span>
    </div>
  );
};
