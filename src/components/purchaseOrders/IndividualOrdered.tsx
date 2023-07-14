import Swal from "sweetalert2";
import useFetchData from "../../hooks/useFetchData";
import usePostData from "../../hooks/usePostData";
import { IndividualOrderedDetails } from "./IndividualOrderedDetails";

interface Inputs {
  id: number;
  refetchOrderedIds?: () => void;
  refetchReceivedIds?: () => void;
  refetchProductData?: () => void;
  showButton: boolean;
}

export default function IndividualOrdered(props: Inputs) {
  const { id, refetchOrderedIds, refetchReceivedIds, showButton, refetchProductData } = props;

  const url = "/purchaseOrder/" + id.toString();

  const { fetchedData: orderDetails, error, loading } = useFetchData<PurchaseOrderDetails[]>(url);
  const { postData } = usePostData();

  // Seperates time and date from the UTC datetime
  const parseDate = (date: string) => {
    return date.substring(11, 16) + " on " + date.substring(0, 10);
  };

  const handleClickReceived = async () => {
    let url = "/purchaseOrder/setReceived/" + id.toString();
    let editFormInputJson = JSON.stringify({ id: id });

    const { error: postError } = await postData({ url: url, jsonData: editFormInputJson });
    if (postError) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: postError?.message,
      });
    } else {
      // then subtract the order quantities from both 'stock level' and 'on hold'
      url = "/purchaseOrder/updateQuantityOnReceived/";
      editFormInputJson = JSON.stringify({ orderDetails });
      const { error } = await postData({ url: url, jsonData: editFormInputJson });
      if (error) {
        Swal.fire({
          icon: "error",
          title: "Something went wrong!",
          text: error.message,
        });
      } else {
        console.log(refetchProductData, "refetchProductData");

        if (refetchOrderedIds) refetchOrderedIds();
        if (refetchReceivedIds) refetchReceivedIds();
        if (refetchProductData) refetchProductData();
      }
    }
  };

  return (
    <div className="individual-order-container">
      {loading && (
        <div className="error-loading">
          <span>Loading.....</span>
        </div>
      )}
      {error && (
        <div className="error-loading">
          <span>Error. {error?.message}</span>
        </div>
      )}
      {!loading && !error && orderDetails && (
        <>
          <div className="individual-order-heading">
            <div>Order placed at : {parseDate(orderDetails[0].orderedDate)}</div>
            <div>{orderDetails[0].supplierName}</div>
            <div>Rep : {orderDetails[0].employeeName}</div>
            <div>Order ID : {id}</div>
          </div>

          <div className="order-details-wrapper">
            <div>
              {orderDetails.map((order) => {
                return <IndividualOrderedDetails key={order.productId} order={order} />;
              })}
            </div>
            {showButton && (
              <div className="btn-wrapper">
                <button onClick={handleClickReceived}>Received</button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
