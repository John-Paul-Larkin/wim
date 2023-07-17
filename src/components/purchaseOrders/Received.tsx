import { SyncLoader } from "react-spinners";
import IndividualOrdered from "./IndividualOrdered";

interface Inputs {
  receivedIds: number[] | null;
  loadingReceivedIds: boolean;
  errorReceivedIds: Error | null;
}

export default function Received(props: Inputs) {
  const { receivedIds, loadingReceivedIds, errorReceivedIds } = props;

  return (
    <div className="order-container">
      {loadingReceivedIds && (
        <div className="error-loading">
          <SyncLoader size={".3rem"}/>
        </div>
      )}
      {errorReceivedIds && (
        <div className="error-loading">
          <span>Error. {errorReceivedIds?.message}</span>
        </div>
      )}
      {!loadingReceivedIds && !errorReceivedIds && receivedIds && receivedIds.length > 0 && (
        <>{receivedIds && [...receivedIds].reverse().map((id) => <IndividualOrdered key={id} id={id} showButton={false} />)}</>
      )}
      {!loadingReceivedIds && !errorReceivedIds && receivedIds && receivedIds.length === 0 && (
        <div className="error-loading">
          <span>No Received orders</span>
        </div>
      )}
    </div>
  );
}
