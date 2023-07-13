import { GiReceiveMoney } from "react-icons/gi";
import useFetchData from "../../hooks/useFetchData";
import PieChartStock from "./PieChartStock";

export default function TotalStockValues() {
  interface TotalCost {
    total_cost: number;
  }

  interface TotalSale {
    total_sale: number;
  }

  const {
    fetchedData: purchaseFetched,
    error: errorPurchase,
    loading: loadingPurchase,
  } = useFetchData<TotalCost[]>("/dashboard/getTotalPurchaseValueOfStock");
  let totalPurchaseCost: null | string = null;
  if (purchaseFetched) {
    // adds comma formatting to currency value
    totalPurchaseCost = purchaseFetched[0].total_cost.toString().replace(/\d(?=(\d{3})+\.)/g, "$&,");
  }

  const { fetchedData: salesFetched, error: errorSales, loading: loadingSales } = useFetchData<TotalSale[]>("/dashboard/getTotalSaleValueOfStock");
  let totalSaleCost: null | string = null;
  if (salesFetched) {
    // adds comma formatting to currency value
    totalSaleCost = salesFetched[0].total_sale.toString().replace(/\d(?=(\d{3})+\.)/g, "$&,");
  }

  const iconStyle = { color: "white", fontSize: "3rem" };

  return (
    <div className="total-value-wrapper">
        <h2>Stock on hand</h2>
      <div className="icon-wrapper">
        <GiReceiveMoney style={iconStyle} />
      </div>
      <div className="bubble">
        <div>
          {loadingPurchase && <div>loading...</div>}
          {errorPurchase && <div>Error...{errorPurchase.message}</div>}
          {totalPurchaseCost && <div className="currency">€{totalPurchaseCost}</div>}
        </div>
        <div>Total purchase value </div>
      </div>
      <div className="bubble">
        <div>
          {loadingSales && <div>loading...</div>}
          {errorSales && <div>Error...{errorSales.message}</div>}
          {totalSaleCost && <div className="currency">€{totalSaleCost}</div>}
        </div>
        <div>Total sale value </div>
      </div>
      {salesFetched && purchaseFetched && <PieChartStock sales={salesFetched[0].total_sale} purchases={purchaseFetched[0].total_cost} />}
    </div>
  );
}
