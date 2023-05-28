import { IndividualPickedOrder } from "./IndividualPickedOrder";

interface InputsPicked {
  fetchedPickedIds: number[] | null;
  pickedIdError: Error | null;
  pickedIdLoading: boolean;
  refetchPickedIds: () => void;
}

export const OrdersPicked = ({ fetchedPickedIds, pickedIdError, pickedIdLoading, refetchPickedIds }: InputsPicked) => {
  return (
    <>
      <div className="order-container">
        <div></div>
        {pickedIdLoading && (
          <div className="error-loading">
            <span>Loading.....</span>
          </div>
        )}
        {pickedIdError && (
          <div className="error-loading">
            <span>Error. {pickedIdError?.message}</span>
          </div>
        )}
        {!pickedIdError &&
          !pickedIdLoading &&
          fetchedPickedIds &&
          [...fetchedPickedIds]
            .reverse()
            .map((id) => (
              <IndividualPickedOrder
                key={id}
                id={id}
                refetchPickedIds={refetchPickedIds}
              />
            ))}
      </div>
    </>
  );
};
