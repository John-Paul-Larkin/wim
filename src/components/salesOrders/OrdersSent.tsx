import { SyncLoader } from "react-spinners";
import { IndividualSentOrder } from "./IndividualSentOrder";

interface Inputs {
  sentFetchedData: FetchedData;
}

export const OrdersSent = ({ sentFetchedData }: Inputs) => {

  
  return (
    <>
      <div className="order-container">
        <div></div>
        {sentFetchedData.loading && (
          <div className="error-loading">
            <SyncLoader size={".3rem"}/>
          </div>
        )}
        {sentFetchedData.error && (
          <div className="error-loading">
            <span>Error. {sentFetchedData.error?.message}</span>
          </div>
        )}
        {!sentFetchedData.error &&
          !sentFetchedData.loading &&
          sentFetchedData.fetchedData &&
          [...sentFetchedData.fetchedData]
            .reverse()
            .map((id) => <IndividualSentOrder key={id} id={id} refetchSentIds={sentFetchedData.refetchData} />)}
      </div>
    </>
  );
};
