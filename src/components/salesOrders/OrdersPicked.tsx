import { IndividualPickedOrder } from "./IndividualPickedOrder";

interface Inputs {
  pickedFetchedData: FetchedData;
  refetchSentIds: () => void;
}

export const OrdersPicked = (props: Inputs) => {
  const { pickedFetchedData, refetchSentIds } = props;

  return (
    <>
      <div className="order-container">
        <div></div>
        {pickedFetchedData.loading && (
          <div className="error-loading">
            <span>Loading.....</span>
          </div>
        )}
        {pickedFetchedData.error && (
          <div className="error-loading">
            <span>Error. {pickedFetchedData.error?.message}</span>
          </div>
        )}
        {!pickedFetchedData.error &&
          !pickedFetchedData.loading &&
          pickedFetchedData.fetchedData &&
          [...pickedFetchedData.fetchedData]
            .reverse()
            .map((id) => <IndividualPickedOrder key={id} id={id} refetchPickedIds={pickedFetchedData.refetchData} refetchSentIds={refetchSentIds} />)}
      </div>
    </>
  );
};
