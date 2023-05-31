import Swal from "sweetalert2";
import usePostData from "../../hooks/usePostData";

interface Inputs {
  selectedProducts: ProductDataQuantity[];
  selectedCustomer: CustomerSelect | null;
  setSelectedCustomer: React.Dispatch<React.SetStateAction<CustomerSelect | null>>;
  setSelectedProducts: React.Dispatch<React.SetStateAction<ProductDataQuantity[]>>;
  refetchReceivedIds: () => void;
}

export const OrderSubmit = (props: Inputs) => {
  const { selectedCustomer, selectedProducts, setSelectedCustomer, setSelectedProducts, refetchReceivedIds } = props;

  // remove details from local storage and empty state
  const handleClearOrder = () => {
    setSelectedCustomer(null);
    localStorage.setItem("selectedCustomer", JSON.stringify(null));
    setSelectedProducts([]);
    localStorage.setItem("selectedProducts", JSON.stringify([]));
  };

  const { postData } = usePostData();

  const handlePlaceOrder = async () => {
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
      Swal.fire("Order has been placed");
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
