import { IndividualReceivedOrder } from "./IndividualReceivedOrder";

interface Inputs {
  receivedFetchedData: FetchedData;
  refetchPickedIds: () => void;
}

export const OrdersReceived = (props: Inputs) => {
  const { receivedFetchedData, refetchPickedIds } = props;

  return (
    <>
      <div className="order-container">
        <div></div>
        {receivedFetchedData.loading && (
          <div className="error-loading">
            <span>Loading.....</span>
          </div>
        )}
        {receivedFetchedData.error && (
          <div className="error-loading">
            <span>Error. {receivedFetchedData.error?.message}</span>
          </div>
        )}
        {!receivedFetchedData.error &&
          !receivedFetchedData.loading &&
          receivedFetchedData.fetchedData &&
          [...receivedFetchedData.fetchedData]
            .reverse()
            .map((id) => (
              <IndividualReceivedOrder key={id} id={id} refetchReceivedIds={receivedFetchedData.refetchData} refetchPickedIds={refetchPickedIds} />
            ))}
      </div>
    </>
  );
};
