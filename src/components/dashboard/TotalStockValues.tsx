import { GiReceiveMoney } from "react-icons/gi";
import useFetchData from "../../hooks/useFetchData";

export default function TotalStockValues() {
  interface TotalCost {
    total_cost: number;
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

  const { fetchedData: salesFetched, error: errorSales, loading: loadingSales } = useFetchData<TotalCost[]>("/dashboard/getTotalSaleValueOfStock");
  let totalSaleCost: null | string = null;
  if (salesFetched) {
    // adds comma formatting to currency value
    totalSaleCost = salesFetched[0].total_sale.toString().replace(/\d(?=(\d{3})+\.)/g, "$&,");
  }


  const iconStyle = { color: "white", fontSize: "3rem" };
  interface TotalCost {
    total_sale: number;
  }

  return (
    <div className="total-value-wrapper">
      <div className="icon-wrapper">
        <h2>Stock on hand</h2>
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
    </div>
  );
}
