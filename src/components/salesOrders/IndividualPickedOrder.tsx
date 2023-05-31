import useFetchData from "../../hooks/useFetchData";
import usePostData from "../../hooks/usePostData";
import { IndividualOrderDetails } from "./IndividualOrderDetails";

interface InputsPicked {
  refetchPickedIds: () => void;
  refetchSentIds: () => void;
  id: number;
}

export const IndividualPickedOrder = ({ id, refetchPickedIds, refetchSentIds }: InputsPicked) => {
  const url = "/saleOrder/" + id.toString();
  const { fetchedData: orderDetails, error, loading } = useFetchData<OrderDetails[]>(url);
  const { postData } = usePostData();

  const parseDate = (date: string) => {
    return date.substring(11, 16) + " on " + date.substring(0, 10);
  };

  const handleClickSent = async () => {
    let url = "/saleOrder/setSent/";
    console.log(url);
    let editFormInputJson = JSON.stringify({ id: id });

    const { error } = await postData({ url: url, jsonData: editFormInputJson });

    url = "/saleOrder/updateQuantityOnSent/";
    editFormInputJson = JSON.stringify({ orderDetails });
    const { error: updateQuantityError } = await postData({ url: url, jsonData: editFormInputJson });

    refetchPickedIds();
    refetchSentIds();
    console.log(error);
    console.log(updateQuantityError);
  };

  return (
    <div className="individual-order-container">
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
          <div className="individual-order-heading">
            <div>{orderDetails[0].businessName}</div>
            <div>Rep : {orderDetails[0].employeeName}</div>
            <div>Picked at : {parseDate(orderDetails[0].pickedDate)}</div>
          </div>

          <div className="order-details-wrapper">
            <div>
              {orderDetails.map((order) => {
                return <IndividualOrderDetails key={order.productId} order={order} />;
              })}
            </div>
            <div className="btn-wrapper">
              <div>
                <button onClick={handleClickSent}>Sent</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// style={{backgroundColor:'brown'}}
