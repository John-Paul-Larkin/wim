import useFetchData from "../../hooks/useFetchData";

export default function TotalPurchaseValueOfStock() {
  interface TotalCost {
    total_cost: number;
  }

  const { fetchedData, error, loading } = useFetchData<TotalCost[]>("/dashboard/getTotalPurchaseValueOfStock");

  let totalCost: null | string = null;
  if (fetchedData) {
    // adds comma formatting to currency value
    totalCost = fetchedData[0].total_cost.toString().replace(/\d(?=(\d{3})+\.)/g, "$&,");
  }

  return (
    <div className="total-value">
      <div>Total purchase value </div>
      <div>stock on hand :</div>

      <div>
        {loading && <div>loading...</div>}
        {error && <div>Error...{error.message}</div>}
        {totalCost && <div>€{totalCost}</div>}
      </div>
    </div>
  );
}
