import { SyncLoader } from "react-spinners";
import useFetchData from "../../hooks/useFetchData";
import SalesBetweenDates from "./SalesBetweenDates";
import "./SalesOrdersDashboard.css";

export default function SalesOrdersDashboard() {
  const {
    fetchedData: OrdersReceivedFetchedData,
    error: receivedError,
    loading: receivedLoading,
  } = useFetchData<number[]>("/saleOrder/getOrderReceivedIds");
  const { fetchedData: OrdersSentFetchedData, error: sentError, loading: sentLoading } = useFetchData<number[]>("/saleOrder/getOrderSentIds");
  const { fetchedData: OrdersPickedFetchedData, error: pickedError, loading: pickedLoading } = useFetchData<number[]>("/saleOrder/getOrderPickedIds");

  // const iconStyle = { color: "white", fontSize: "3rem" };

  return (
    <div className="sales-orders-wrapper">
      <h2>Sales orders</h2>
      <div>
        <div className="left-side">
          {(receivedError || pickedError || sentError) && <div>Error...</div>}
          {!(receivedError || pickedError || sentError) && (
            <div className="info-wrapper">
              <div className="info">
                <div>
                  {receivedLoading && <SyncLoader size={".2rem"} />}
                  {!receivedLoading && OrdersReceivedFetchedData?.length}{" "}
                </div>
                <div>Orders waiting to be picked.</div>
              </div>

              <div className="info">
                <div>
                  {pickedLoading && <SyncLoader size={".2rem"} />}
                  {!pickedLoading && OrdersPickedFetchedData?.length}{" "}
                </div>
                <div>Picked orders waiting to be be shipped.</div>
              </div>

              <div className="info">
                <div>
                  {sentLoading && <SyncLoader size={".2rem"} />}
                  {!sentLoading && OrdersSentFetchedData?.length}{" "}
                </div>
                <div>Closed orders.</div>
              </div>
            </div>
          )}
        </div>
        <SalesBetweenDates />
      </div>
    </div>
  );
}
