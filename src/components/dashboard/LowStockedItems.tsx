import { FaExclamationTriangle } from "react-icons/fa";
import useFetchData from "../../hooks/useFetchData";
import './LowStockedItems.css'

export default function LowStockedItems() {
  interface LowStocked {
    name: string;
    product_id: number;
  }
  const { fetchedData, loading, error } = useFetchData<LowStocked[]>("/dashboard/getProductsBelowRestock");

  const iconStyle = { color: "red", fontSize: "3rem" }

  return (
    <div className="low-stocked-wrapper">
      {loading && <div>loading...</div>}
      {error && <div>Error...{error.message}</div>}
      {fetchedData && (
        <>
          <div>Items below restock : {fetchedData?.length}</div>
          <FaExclamationTriangle style={iconStyle}/>
          {fetchedData?.map((product) => (
            <div key={product.product_id}>{product.name}</div>
          ))}
        </>
      )}
    </div>
  );
}
