import useFetchData from "../../hooks/useFetchData";

interface OrderDetails {
  productName: string;
  quantity: number;
  placedDate: string;
  businessName: string;
  employeeName: string;
}

export const IndividualOrder = ({ id }: { id: number }) => {
  const url = "/saleOrder/" + id.toString();
  const { fetchedData: orderDetails, error, loading } = useFetchData<OrderDetails[]>(url);

  //   console.log(fetchedData);
  return (
    <>
      {loading && (
        <div className="error-loading">
          <span>Loading.....</span>
        </div>
      )}
      {error && (
        <div className="error-loading">
          <span>Error. {error?.message}</span>
        </div>
      )}
      {!loading &&
        !error &&
        orderDetails &&
        orderDetails.map((order) => {
          return;
          <div>{order.businessName}</div>;
        })}
    </>
  );
};

// useEffect(() => {
//   const fetchAll = async () => {
//     const ids = fetchedOrderIds as number[];
//     // const data: any[] = [];
//     const test = ids.map(async (id) => {
//       const individualOrder = await fetchIndividualData({ url: "/saleOrder/" + id.toString() });
//       // console.log(individualOrder)
//       return individualOrder;
//     });
//     const dataPromise = await Promise.all(test);
//     // const data = dataPromise.map((promise) => promise.PromiseResult);
//     console.log(dataPromise);
//     setSaleOrders(dataPromise);
//   };
//   fetchAll();
// }, [fetchedOrderIds]);

// console.log(saleOrders);

// // if (fetchedOrderIds && saleOrders === null) {
// // }

// // jhnasdf***********************************************************sdf

// {saleOrders &&
//     saleOrders.map((order: any, index) => {
//       return (
//         <div key={index}>
//           <span>{order[0]["Business name"]}</span>
//           {order && order.map((prod: any) => <div key={prod.product}>{prod.product}</div>)}
//         </div>
//       );
//     })}
