import { MdPointOfSale } from "react-icons/md";
import useFetchData from "../../hooks/useFetchData";

interface Inputs {
  timeInterval: string;
}
interface Count {
  count: number;
}

export default function NumberOfSales(props: Inputs) {
  const { timeInterval } = props;

  const { fetchedData, loading, error } = useFetchData<Count[]>("/dashboard/getNumberOfSalesBetweenDates/" + timeInterval);
  const style = { color: "white", fontSize: "3rem" };

  return (
    <>
      Count of sales
      {loading && <div>loading...</div>}
      {error && <div>Error...{error.message}</div>}
      {fetchedData && <div> {fetchedData[0].count}</div>}
      <MdPointOfSale style={style} />
    </>
  );
}
