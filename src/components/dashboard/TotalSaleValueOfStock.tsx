import { GiReceiveMoney } from "react-icons/gi";

import useFetchData from "../../hooks/useFetchData";

export default function TotalSaleValueOfStock() {
  interface TotalCost {
    total_sale: number;
  }

  const { fetchedData, error, loading } = useFetchData<TotalCost[]>("/dashboard/getTotalSaleValueOfStock");

  let totalCost: null | string = null;
  if (fetchedData) {
    // adds comma formatting to currency value
    totalCost = fetchedData[0].total_sale.toString().replace(/\d(?=(\d{3})+\.)/g, "$&,");
  }

  const style = { color: "white", fontSize: "3rem" }


  return (
    <div className="total-value">
      <div>Total sale value </div>
      <div>stock on hand :</div>
      <GiReceiveMoney style={style} />
      <div>
        {loading && <div>loading...</div>}
        {error && <div>Error...{error.message}</div>}
        {totalCost && <div>€{totalCost}</div>}
      </div>
    </div>
  );
}
