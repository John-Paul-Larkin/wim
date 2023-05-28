import { IndividualReceivedOrder } from "./IndividualReceivedOrder";


interface Inputs {
  fetchedReceivedIds: number[] | null;
  receivedIdError: Error | null;
  receivedIdLoading: boolean;
  refetchReceivedIds: () => void;
  refetchPickedIds: () => void;
}

export const OrdersReceived = ( { fetchedReceivedIds,
  receivedIdError,
  receivedIdLoading,
  refetchReceivedIds,
  refetchPickedIds
}:Inputs) => {
  return (
    <>
      <div className="order-container">
        <div></div>
        {receivedIdLoading && (
          <div className="error-loading">
            <span>Loading.....</span>
          </div>
        )}
        {receivedIdError && (
          <div className="error-loading">
            <span>Error. {receivedIdError?.message}</span>
          </div>
        )}
        {!receivedIdError &&
          !receivedIdLoading &&
          fetchedReceivedIds &&
          [...fetchedReceivedIds].reverse().map((id) => <IndividualReceivedOrder key={id} id={id}
           refetchReceivedIds={refetchReceivedIds}
           refetchPickedIds={ refetchPickedIds}
           
           />)}
      </div>
    </>
  );
};
