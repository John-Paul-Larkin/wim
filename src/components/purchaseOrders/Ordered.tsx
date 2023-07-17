import { SyncLoader } from "react-spinners";
import IndividualOrdered from "./IndividualOrdered";

interface Inputs {
  orderedIds: number[] | null;
  loadingOrderedIds: boolean;
  errorOrderedIds: Error | null;
  refetchOrderedIds: () => void;
  refetchProductData: () => void;
  refetchReceivedIds: () => void;
}

export default function Ordered(props: Inputs) {
  const { orderedIds, loadingOrderedIds, errorOrderedIds, refetchOrderedIds, refetchProductData, refetchReceivedIds } = props;

  return (
    <div className="order-container">
      {loadingOrderedIds && (
        <div className="error-loading">
          <SyncLoader size={".3rem"}/>
        </div>
      )}
      {errorOrderedIds && (
        <div className="error-loading">
          <span>Error. {errorOrderedIds?.message}</span>
        </div>
      )}
      {!loadingOrderedIds && !errorOrderedIds && orderedIds && orderedIds.length > 0 && (
        <>
          {orderedIds &&
            [...orderedIds]
              .reverse()
              .map((id) => (
                <IndividualOrdered
                  key={id}
                  id={id}
                  refetchOrderedIds={refetchOrderedIds}
                  refetchProductData={refetchProductData}
                  refetchReceivedIds={refetchReceivedIds}
                  showButton={true}
                />
              ))}
        </>
      )}
      {!loadingOrderedIds && !errorOrderedIds && orderedIds && orderedIds.length === 0 && (
        <div className="error-loading">
          <span>No current orders</span>
        </div>
      )}
    </div>
  );
}
