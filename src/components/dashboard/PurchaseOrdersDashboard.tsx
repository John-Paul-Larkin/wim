import useFetchData from "../../hooks/useFetchData";

export default function PurchaseOrdersDashboard() {
  const { fetchedData: orderedFetchedData, error: orderedError, loading: orderedLoading } = useFetchData<number[]>("/purchaseOrder/getOrderedIds");
  const {
    fetchedData: receivedFetchedData,
    error: receivedError,
    loading: receivedLoading,
  } = useFetchData<number[]>("/purchaseOrder/getReceivedIds");

  return (
    <div className="total-value">
      <h3>Purchase orders</h3>
      {(receivedError || orderedError) && <div>Error...</div>}
      {(receivedLoading || orderedLoading) && <div>Loading...</div>}

      {!(receivedError || orderedError || receivedLoading || orderedLoading) && (
        <>
          <div>Placed orders waiting to be delivered {orderedFetchedData?.length}</div>
          <div>Orders delivered {receivedFetchedData?.length}</div>
        </>
      )}
    </div>
  );
}
