export const Totals = ({ selectedProducts }: { selectedProducts: ProductDataQuantity[] }) => {
 
  let subTotal = selectedProducts.reduce((total, product) => {
    return total + product.order_quantity * product.sale_price;
  }, 0);

  subTotal = Math.round(subTotal*100)/100

  const tax = Math.round((subTotal / 100) * 23 * 100) / 100;

  const total = Math.round((subTotal + tax) * 100) / 100;

  return (
    <div className="totals-wrapper">
      <div className="totals">
        <div>
          <div>SUBTOTAL</div>
          <div>{subTotal}</div>
        </div>
        <div>
          <div>VAT</div>
          <div>{tax}</div>
        </div>
        <div>
          <div>TOTAL</div>
          <div>{total}</div>
        </div>
      </div>
    </div>
  );
};
