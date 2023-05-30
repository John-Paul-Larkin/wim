import useFetchData from "../../hooks/useFetchData";
import usePostData from "../../hooks/usePostData";
import { IndividualOrderDetails } from "./IndividualOrderDetails";

interface Inputs {
  refetchReceivedIds: () => void;
  refetchPickedIds: () => void;
  id: number;
}

export const IndividualReceivedOrder = ({ id, refetchReceivedIds, refetchPickedIds }: Inputs) => {
  const url = "/saleOrder/" + id.toString();
  const { fetchedData: orderDetails, error, loading } = useFetchData<OrderDetails[]>(url);
  const { postData } = usePostData();

  // console.log(orderDetails);/

  const parseDate = (date: string) => {
    return date.substring(0, 10);
  };

  const handleClickPicked = async () => {
    const url = "/saleOrder/setPicked/" + id.toString();
    console.log(url);
    const editFormInputJson = JSON.stringify({ id: id });

    const { error } = await postData({ url: url, jsonData: editFormInputJson });
    refetchReceivedIds();
    refetchPickedIds();

    console.log(error);
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
          </div>

          <div>
            <div className="order-details-wrapper">
              {orderDetails.map((order) => {
                return <IndividualOrderDetails key={order.productId} order={order} />;
              })}
            </div>
            <span className="btn-wrapper">
              <button onClick={handleClickPicked}>picked</button>
            </span>
          </div>
        </>
      )}
    </div>
  );
};
