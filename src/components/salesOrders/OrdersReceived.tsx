import useFetchData from "../../hooks/useFetchData";
import { IndividualOrder } from "./IndividualOrder";

export const OrdersReceived = () => {
  const { fetchedData: fetchedOrderIds, error: IdError, loading: IdLoading } = useFetchData<number[]>("/saleOrder/getOrderIds");

  return (
    <>
      <div className="received">
        <div></div>
        {IdLoading && (
          <div className="error-loading">
            <span>Loading.....</span>
          </div>
        )}
        {IdError && (
          <div className="error-loading">
            <span>Error. {IdError?.message}</span>
          </div>
        )}
        {!IdError && !IdLoading && fetchedOrderIds && fetchedOrderIds.map((id) => <IndividualOrder key={id} id={id} />)}
      </div>
    </>
  );
};
