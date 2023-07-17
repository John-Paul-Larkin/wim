import { SyncLoader } from "react-spinners";
import useFetchData from "../../hooks/useFetchData";
// import usePostData from "../../hooks/usePostData";

interface Inputs {
  refetchSentIds: () => void;
  id: number;
}

export const IndividualSentOrder = ({ id }: Inputs) => {
  const url = "/saleOrder/" + id.toString();
  const { fetchedData: orderDetails, error, loading } = useFetchData<SalesOrderDetails[]>(url);
  // const { postData } = usePostData();

  const parseDate = (date: string) => {
    return date.substring(0, 10);
  };

  return (
    <div className="individual-order">
      {loading && (
        <div className="error-loading">
          <SyncLoader size={".3rem"}/>
        </div>
      )}
      {error && (
        <div className="error-loading">
          <span>Error. {error?.message}</span>
        </div>
      )}
      {!loading && !error && orderDetails && (
        <>
          <span>{orderDetails[0].businessName}</span>
          <span>Rep: {orderDetails[0].employeeName}</span>
          <span>{parseDate(orderDetails[0].placedDate)}</span>

          {orderDetails.map((order) => {
            return (
              <div key={order.productId}>
                {order.productName}
                {order.quantity}
                {order.soldBy}
                {order.caseSize}
                

              </div>
            );
          })}
          {/* <button onClick={handleClickSent}>sent</button> */}
        </>
      )}
    </div>
  );
};
