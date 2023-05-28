import { OrdersPicked } from "./OrdersPicked";
import { OrdersReceived } from "./OrdersReceived";
import { OrdersSent } from "./OrdersSent";

interface Inputs {
  receivedFetchedData: FetchedData;
  pickedFetchedData: FetchedData;
  sentFetchedData: FetchedData;
}

export const OrdersCategories = ({ receivedFetchedData, pickedFetchedData, sentFetchedData }: Inputs) => {
  const countReceivedOrders = receivedFetchedData.fetchedData?.length;
  const countPickedOrders = pickedFetchedData.fetchedData?.length;
  const countSentOrders = sentFetchedData.fetchedData?.length;

  return (
    <>
      <h2>
        Orders received
        <span> - {countReceivedOrders}</span>
      </h2>
      <OrdersReceived refetchPickedIds={pickedFetchedData.refetchData} receivedFetchedData={receivedFetchedData} />
      <h2>
        Orders picked
        <span> - {countPickedOrders}</span>
      </h2>
      <OrdersPicked pickedFetchedData={pickedFetchedData} refetchSentIds={sentFetchedData.refetchData}/>
      <h2>
        Orders sent
        <span> - {countSentOrders}</span>
      </h2>
      <OrdersSent sentFetchedData={sentFetchedData} />
    </>
  );
};
