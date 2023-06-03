import { IndividualPickedOrder } from "./IndividualPickedOrder";

interface Inputs {
  pickedFetchedData: FetchedData;
  refetchSentIds: () => void;
}

export const OrdersPicked = (props: Inputs) => {
  const { pickedFetchedData, refetchSentIds } = props;

  const error = pickedFetchedData.error;
  const loading = pickedFetchedData.loading;
  const data = pickedFetchedData.fetchedData;

  return (
    <>
      <div className="order-container">
        <div></div>
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
        {!error &&
          !loading &&
          data &&
          data?.length > 0 &&
          [...data]
            .reverse()
            .map((id) => <IndividualPickedOrder key={id} id={id} refetchPickedIds={pickedFetchedData.refetchData} refetchSentIds={refetchSentIds} />)}

        {!error && !loading && data && data?.length === 0 && (
          <div className="error-loading">
            <span>No current picked orders</span>
          </div>
        )}
      </div>
    </>
  );
};
