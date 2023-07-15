import useFetchData from "../../hooks/useFetchData";
import './PurchaseOrdersDashboard.css'

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
          <div >Placed orders waiting to be delivered<div >{orderedFetchedData?.length}</div></div>
          <div >Orders delivered<div>{receivedFetchedData?.length}</div></div>
        </>
      )}
    </div>
  );
}
