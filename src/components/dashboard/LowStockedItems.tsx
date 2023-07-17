import { FaExclamationTriangle, FaRegCheckCircle } from "react-icons/fa";

import { SyncLoader } from "react-spinners";
import useFetchData from "../../hooks/useFetchData";
import "./LowStockedItems.css";

export default function LowStockedItems() {
  interface LowStocked {
    name: string;
    product_id: number;
    shortage: number;
  }
  const { fetchedData, loading, error } = useFetchData<LowStocked[]>("/dashboard/getProductsBelowRestock");

  const exclamationIconStyle = { color: "red", fontSize: "5rem" };
  const tickIconStyle = { color: "white", fontSize: "5rem" };

  return (
    <div className="low-stocked-wrapper">
      {error && <div>Error...{error.message}</div>}
      <h2>Items below restock</h2>
      <div>
        <div className="left-side">
          {loading && <SyncLoader size={".3rem"} />}
          <div className="number">{fetchedData?.length}</div>
          {loading && <SyncLoader size={".3rem"} />}
          {!loading && fetchedData && fetchedData?.length > 0 && <FaExclamationTriangle style={exclamationIconStyle} />}
          {!loading && fetchedData && fetchedData?.length === 0 && <FaRegCheckCircle style={tickIconStyle} />}
        </div>
        <div className={fetchedData ? (fetchedData.length > 5 ? "show-scroll right-side" : "right-side") : "right-side"}>
          <div>
            {loading && <SyncLoader size={".3rem"} />}

            {fetchedData?.map((product) => (
              <div key={product.product_id}>
                {product.name} (-
                {product.shortage})
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// {loading && <SyncLoader/>}
// {error && <div>Error...{error.message}</div>}
// {fetchedData && (
//   <>
//     <div>Items below restock : {fetchedData?.length}</div>
//     <FaExclamationTriangle style={iconStyle}/>
//     {fetchedData?.map((product) => (
//       <div key={product.product_id}>{product.name}</div>
//     ))}
//   </>
// )}
