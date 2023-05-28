import { OrdersPicked } from "./OrdersPicked";
import { OrdersReceived } from "./OrdersReceived";

interface Inputs {
  fetchedPickedIds: number[] | null;
  pickedIdError: Error | null;
  pickedIdLoading: boolean;
  refetchPickedIds: () => void;

  fetchedReceivedIds: number[] | null;
  receivedIdError: Error | null;
  receivedIdLoading: boolean;
  refetchReceivedIds: () => void;
}

export const OrdersCategories = ({
  fetchedPickedIds,
  pickedIdError,
  pickedIdLoading,
  refetchPickedIds,
  fetchedReceivedIds,
  receivedIdError,
  receivedIdLoading,
  refetchReceivedIds,
}: Inputs) => {
  return (
    <>
      <h2>Orders received</h2>
      <OrdersReceived
        fetchedReceivedIds={fetchedReceivedIds}
        receivedIdError={receivedIdError}
        receivedIdLoading={receivedIdLoading}
        refetchReceivedIds={refetchReceivedIds}
        refetchPickedIds={refetchPickedIds}
      />
      <h2>Orders picked</h2>
      <div className="picked">picked</div>
      <OrdersPicked
        fetchedPickedIds={fetchedPickedIds}
        pickedIdError={pickedIdError}
        pickedIdLoading={pickedIdLoading}
        refetchPickedIds={refetchPickedIds}
      />
      <h2>Orders sent</h2>
    </>
  );
};
