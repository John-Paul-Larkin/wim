import { SyncLoader } from "react-spinners";
import useFetchData from "../../hooks/useFetchData";
import "./PurchaseOrdersDashboard.css";
import PurchasesBetweenDates from "./PurchasesBetweeenDates";

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

      <div className="left-side">
        {/* {(receivedError || pickedError || sentError) && <div>Error...</div>} */}
        {!(receivedError || orderedError) && (
          <div className="info-wrapper">
            <div className="info">
              <div>
                {orderedLoading && <SyncLoader size={".2rem"} />}
                {!orderedLoading && orderedFetchedData?.length}{" "}
              </div>
              <div>Ordered.</div>
            </div>

            <div className="info">
              <div>
                {receivedLoading && <SyncLoader size={".2rem"} />}
                {!receivedLoading && receivedFetchedData?.length}{" "}
              </div>
              <div>received.</div>
            </div>
          </div>
        )}
      </div>

      <PurchasesBetweenDates />
    </div>
  );
}

{
  /* 
  {(receivedError || orderedError) && <div>Error...</div>}
  {(receivedLoading || orderedLoading) && <div>Loading...</div>}

  {!(receivedError || orderedError || receivedLoading || orderedLoading) && (
    <>
      <div >Placed orders waiting to be delivered<div >{orderedFetchedData?.length}</div></div>
      <div >Orders delivered<div>{receivedFetchedData?.length}</div></div>
    </>
  )} */
}
