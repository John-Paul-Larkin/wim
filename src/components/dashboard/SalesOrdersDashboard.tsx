import useFetchData from "../../hooks/useFetchData";

export default function SalesOrdersDashboard() {
  const {
    fetchedData: OrdersReceivedFetchedData,
    error: receivedError,
    loading: receivedLoading,
  } = useFetchData<number[]>("/saleOrder/getOrderReceivedIds");
  const { fetchedData: OrdersSentFetchedData, error: sentError, loading: sentLoading } = useFetchData<number[]>("/saleOrder/getOrderSentIds");
  const { fetchedData: OrdersPickedFetchedData, error: pickedError, loading: pickedLoading } = useFetchData<number[]>("/saleOrder/getOrderPickedIds");

  return (
    <div className="total-value">
      <h3>Sales orders</h3>
      {(receivedError || pickedError || sentError) && <div>Error...</div>}
      {(receivedLoading || pickedLoading || sentLoading) && <div>Loading...</div>}
      {!(receivedError || pickedError || sentError || receivedLoading || pickedLoading || sentLoading) && (
        <>
          <div>Orders waiting to be picked {OrdersReceivedFetchedData?.length}</div>
          <div>Picked orders waiting to be be shipped {OrdersPickedFetchedData?.length}</div>
          <div>Closed orders {OrdersSentFetchedData?.length}</div>
        </>
      )}
    </div>
  );
}
