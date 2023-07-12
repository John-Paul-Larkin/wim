import useFetchData from "../../hooks/useFetchData";

export default function PurchaseOrdersDashboard() {
  const { fetchedData: orderedFetchedData, error: orderedError, loading: orderedLoading } = useFetchData<number[]>("/purchaseOrder/getOrderedIds");
  const {
    fetchedData: receivedFetchedData,
    error: receivedError,
    loading: receivedLoading,
  } = useFetchData<number[]>("/purchaseOrder/getReceivedIds");

  return (
    <div className="purchase-orders-wrapper">
      <h2>Purchase orders</h2>
      {(receivedError || orderedError) && <div>Error...</div>}
      {(receivedLoading || orderedLoading) && <div>Loading...</div>}

      {!(receivedError || orderedError || receivedLoading || orderedLoading) && (
        <>
          <div className="bubble">Placed orders waiting to be delivered<div className="number">{orderedFetchedData?.length}</div></div>
          <div className="bubble">Orders delivered<div className="number">{receivedFetchedData?.length}</div></div>
        </>
      )}
    </div>
  );
}
