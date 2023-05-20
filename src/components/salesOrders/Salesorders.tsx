import "./SalesOrders.css";

export const Salesorders = () => {

  const handleClickPlaceOrder = () => {
console.log('f')
  }

  return (
    <div className="sales-orders">
      <div className="order-form">

<form id='order-form' onSubmit={handleClickPlaceOrder}>


</form>



      </div>
      <div className="received">received</div>
      <div className="picked">picked</div>
      <div className="returned">returned</div>
      <div className="sent">sent</div>
    </div>
  );
};
