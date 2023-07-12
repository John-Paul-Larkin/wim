import { MdPointOfSale } from "react-icons/md";
import useFetchData from "../../hooks/useFetchData";
import SalesBetweenDates from "./SalesBetweenDates";
import SalesChart from "./SalesChart";


export default function SalesOrdersDashboard() {
  const {
    fetchedData: OrdersReceivedFetchedData,
    error: receivedError,
    loading: receivedLoading,
  } = useFetchData<number[]>("/saleOrder/getOrderReceivedIds");
  const { fetchedData: OrdersSentFetchedData, error: sentError, loading: sentLoading } = useFetchData<number[]>("/saleOrder/getOrderSentIds");
  const { fetchedData: OrdersPickedFetchedData, error: pickedError, loading: pickedLoading } = useFetchData<number[]>("/saleOrder/getOrderPickedIds");

  const iconStyle = { color: "white", fontSize: "3rem" };

  return (
    <div className="sales-orders-wrapper">
      <h2>Sales orders</h2>
      <MdPointOfSale style={iconStyle} />

      <SalesBetweenDates />
      {(receivedError || pickedError || sentError) && <div>Error...</div>}
      {(receivedLoading || pickedLoading || sentLoading) && <div>Loading...</div>}
      {!(receivedError || pickedError || sentError || receivedLoading || pickedLoading || sentLoading) && (
        <>
          <div className="bubble">
            Orders waiting to be picked <div className="number">{OrdersReceivedFetchedData?.length}</div>
          </div>
          <div className="bubble">
            Picked orders waiting to be be shipped<div className="number"> {OrdersPickedFetchedData?.length}</div>
          </div>
          <div className="bubble">
            Closed orders <div className="number">{OrdersSentFetchedData?.length}</div>
          </div>
        </>
      )}
      <SalesChart />

    </div>
  );
}
