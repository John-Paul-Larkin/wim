import Swal from "sweetalert2";
import useFetchData from "../../hooks/useFetchData";
import usePostData from "../../hooks/usePostData";
import { IndividualOrderDetails } from "./IndividualOrderDetails";

interface Inputs {
  refetchPickedIds: () => void;
  refetchSentIds: () => void;
  id: number;
}

export const IndividualPickedOrder = (props: Inputs) => {
  const { id, refetchPickedIds, refetchSentIds } = props;

  const url = "/saleOrder/" + id.toString();
  const { fetchedData: orderDetails, error, loading } = useFetchData<SalesOrderDetails[]>(url);
  const { postData } = usePostData();

  // Seperates time and date from the UTC datetime
  const parseDate = (date: string) => {
    return date.substring(11, 16) + " on " + date.substring(0, 10);
  };

  const handleClickSent = async () => {
    //First mark the order as sent
    let url = "/saleOrder/setSent/";
    let editFormInputJson = JSON.stringify({ id: id });
    const { error } = await postData({ url: url, jsonData: editFormInputJson });

    if (error) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: error.message,
      });
    } else {
      // then subtract the order quantities from both 'stock level' and 'on hold'
      url = "/saleOrder/updateQuantityOnSent/";
      editFormInputJson = JSON.stringify({ orderDetails });
      const { error } = await postData({ url: url, jsonData: editFormInputJson });
      if (error) {
        Swal.fire({
          icon: "error",
          title: "Something went wrong!",
          text: error.message,
        });
      }
      refetchPickedIds();
      refetchSentIds();
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
            <div>{orderDetails[0].businessName}</div>
            <div>Rep : {orderDetails[0].employeeName}</div>
            <div>Picked at : {parseDate(orderDetails[0].pickedDate)}</div>
            <div>Order ID : {id}</div>

          </div>

          <div className="order-details-wrapper">
            <div>
              {orderDetails.map((order) => {
                return <IndividualOrderDetails key={order.productId} order={order} />;
              })}
            </div>
            <div className="btn-wrapper">
              <div>
                <button onClick={handleClickSent}>Sent</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// style={{backgroundColor:'brown'}}
