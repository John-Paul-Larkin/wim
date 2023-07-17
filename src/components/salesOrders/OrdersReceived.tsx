import { SyncLoader } from "react-spinners";
import { IndividualReceivedOrder } from "./IndividualReceivedOrder";

interface Inputs {
  receivedFetchedData: FetchedData;
  refetchPickedIds: () => void;
}

export const OrdersReceived = (props: Inputs) => {
  const { receivedFetchedData, refetchPickedIds } = props;

  const error = receivedFetchedData.error;
  const loading = receivedFetchedData.loading;
  const data = receivedFetchedData.fetchedData;

  return (
    <>
      <div className="order-container">
        <div></div>
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
        {!error &&
          !loading &&
          data &&
          data?.length > 0 &&
          [...data]
            .reverse()
            .map((id) => (
              <IndividualReceivedOrder key={id} id={id} refetchReceivedIds={receivedFetchedData.refetchData} refetchPickedIds={refetchPickedIds} />
            ))}
        {!error && !loading && data && data?.length === 0 && (
          <div className="error-loading">
            <span>No current received orders</span>
          </div>
        )}
      </div>
    </>
  );
};

