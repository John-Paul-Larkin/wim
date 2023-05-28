import useFetchData from "../../hooks/useFetchData";
import usePostData from "../../hooks/usePostData";

interface OrderDetails {
  placedDate: string;
  businessName: string;
  employeeName: string;
  productName: string;
  quantity: number;
  caseSize: number;
  soldBy: string;
  productId: number;
}

interface InputsPicked {
  refetchPickedIds: () => void;
  id: number;
}

export const IndividualPickedOrder = ({ id, refetchPickedIds }: InputsPicked) => {
  const url = "/saleOrder/" + id.toString();
  const { fetchedData: orderDetails, error, loading } = useFetchData<OrderDetails[]>(url);
  const { postData } = usePostData();

  const parseDate = (date: string) => {
    return date.substring(0, 10);
  };

  const handleClickSent = async () => {
    const url = "/saleOrder/setSent/" + id.toString();
    console.log(url);
    const editFormInputJson = JSON.stringify({ id: id });

    const { error } = await postData({ url: url, jsonData: editFormInputJson });
    refetchPickedIds();
    console.log(error);
  };

  return (
    <div className="individual-order">
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
      {!loading && !error && orderDetails && (
        <>
          <span>{orderDetails[0].businessName}</span>
          <span>Rep: {orderDetails[0].employeeName}</span>
          <span>{parseDate(orderDetails[0].placedDate)}</span>

          {orderDetails.map((order) => {
            return (
              <div key={order.productId}>
                {order.productName}
                {order.quantity}
                {order.soldBy}
                {order.caseSize}
              </div>
            );
          })}
          <button onClick={handleClickSent}>sent</button>
        </>
      )}
    </div>
  );
};
