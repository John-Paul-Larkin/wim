import { GiReceiveMoney } from "react-icons/gi";
import useFetchData from "../../hooks/useFetchData";
import PieChartStock from "./PieChartStock";
import './StockOnHand.css'

export default function StockOnHand() {
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

  // const iconStyle = { color: "white", fontSize: "3rem" };

  return (
    <div className="stock-on-hand-wrapper">
      <h2>Stock on hand</h2>
      <div className="bubble-container-wrapper">
        <div className="bubble-container">
          <div className="bubble-sale">
            <h3>Sale value </h3>
            <div>
              {loadingSales && (
                <div className="currency" style={{ fontSize: "1rem" }}>
                  loading...
                </div>
              )}
              {errorSales && <div>Error...{errorSales.message}</div>}
              {totalSaleCost && <div className="currency">€{totalSaleCost}</div>}
            </div>
          </div>
          {/* <div>
            <GiReceiveMoney style={iconStyle} />
          </div> */}
          <div className="bubble-purchase">
            <h3>Purchase value </h3>

            <div>
              {loadingPurchase && (
                <div className="currency" style={{ fontSize: "1rem" }}>
                  loading...
                </div>
              )}

              {errorPurchase && <div>Error...{errorPurchase.message}</div>}
              {totalPurchaseCost && <div className="currency">€{totalPurchaseCost}</div>}
            </div>
          </div>
        </div>
        {(!salesFetched || !purchaseFetched) && <div className="pie-chart"></div>}
        {salesFetched && purchaseFetched && <PieChartStock sales={salesFetched[0].total_sale} purchases={purchaseFetched[0].total_cost} />}
      </div>
    </div>
  );
}
