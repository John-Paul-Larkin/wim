import Swal from "sweetalert2";
import useFetchData from "../../hooks/useFetchData";
import usePostData from "../../hooks/usePostData";
import { IndividualOrderDetails } from "./IndividualOrderDetails";

interface Inputs {
  refetchReceivedIds: () => void;
  refetchPickedIds: () => void;
  id: number;
}

export const IndividualReceivedOrder = (props: Inputs) => {
  const { id, refetchReceivedIds, refetchPickedIds } = props;
  const url = "/saleOrder/" + id.toString();
  const { fetchedData: orderDetails, error, loading } = useFetchData<SalesOrderDetails[]>(url);
  const { postData } = usePostData();

  const parseDate = (date: string) => {
    return date.substring(0, 10);
  };

  const handleClickPicked = async () => {
    const url = "/saleOrder/setPicked/" + id.toString();
    const editFormInputJson = JSON.stringify({ id: id });

    const { error } = await postData({ url: url, jsonData: editFormInputJson });
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: error?.message,
      });
    }
    refetchReceivedIds();
    refetchPickedIds();
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
            <div>Placed on :{parseDate(orderDetails[0].placedDate)}</div>
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
                <button onClick={handleClickPicked}>picked</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
