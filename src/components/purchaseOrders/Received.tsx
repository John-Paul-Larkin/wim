import IndividualOrdered from "./IndividualOrdered";

interface Inputs {
  receivedIds: number[] | null;
  loadingReceivedIds: boolean;
  errorReceivedIds: Error | null;
  refetchReceivedIds: () => void;
}

export default function Ordered(props: Inputs) {
  const { receivedIds, loadingReceivedIds, errorReceivedIds, refetchReceivedIds } = props;

  return (
    <div className="order-container">
      {loadingReceivedIds && (
        <div className="error-loading">
          <span>Loading.....</span>
        </div>
      )}
      {errorReceivedIds && (
        <div className="error-loading">
          <span>Error. {errorReceivedIds?.message}</span>
        </div>
      )}
      {!loadingReceivedIds && !errorReceivedIds && receivedIds && receivedIds.length > 0 && (
        <>
          {receivedIds &&
            [...receivedIds].reverse().map((id) => <IndividualOrdered key={id} id={id} refetchReceivedIds={refetchReceivedIds} showButton={false} />)}
        </>
      )}
      {!loadingReceivedIds && !errorReceivedIds && receivedIds && receivedIds.length === 0 && (
        <div className="error-loading">
          <span>No current orders</span>
        </div>
      )}
    </div>
  );
}
