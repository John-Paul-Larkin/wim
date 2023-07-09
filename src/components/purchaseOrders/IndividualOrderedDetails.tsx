export const IndividualOrderedDetails = ({ order }: { order: PurchaseOrderDetails }) => {
  return (
    <div className="order-details">
      <div>{order.productName}</div>
      <div>{order.soldBy}</div>
      <div>{order.caseSize}</div>
      <div>QTY :{order.quantity}</div>
    </div>
  );
};
