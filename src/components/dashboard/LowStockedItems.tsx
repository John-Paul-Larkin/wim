import useFetchData from "../../hooks/useFetchData";

export default function LowStockedItems() {
  interface LowStocked {
    name: string;
    product_id: number;
  }
  const { fetchedData, loading, error } = useFetchData<LowStocked[]>("/dashboard/getProductsBelowRestock");

  if (fetchedData) {
    // console.log(typeof fetchedData[0].product_id);
  }

  return (
    <div className="total-value">
      {loading && <div>loading...</div>}
      {error && <div>Something went wrong...{error.message}</div>}
      {fetchedData && (
        <>
          <div>Items below restock : {fetchedData?.length}</div>
          {fetchedData?.map((product) => (
            <div key={product.product_id}>{product.name}</div>
          ))}
        </>
      )}
    </div>
  );
}
