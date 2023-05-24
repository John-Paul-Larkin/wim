import Swal from "sweetalert2";
import usePostData from "../../hooks/usePostData";

interface Inputs {
  selectedProducts: ProductDataQuantity[];
  selectedCustomer: CustomerSelect | null;
  setSelectedCustomer: React.Dispatch<React.SetStateAction<CustomerSelect | null>>;
  setSelectedProducts: React.Dispatch<React.SetStateAction<ProductDataQuantity[]>>;
}

export const OrderSubmit = ({ selectedCustomer, selectedProducts, setSelectedCustomer, setSelectedProducts }: Inputs) => {
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
    console.log(error);
    // Need
    // to
    // add
    // error
    // handling

    handleClearOrder();
    Swal.fire("Order has been placed");
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
