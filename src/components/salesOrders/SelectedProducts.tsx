interface Inputs {
  selectedProducts: ProductDataQuantity[];
}

export const SelectedProducts = ({ selectedProducts }: Inputs) => {
  return (
    <>
      {selectedProducts.map((product) => {
        return (
          <div key={product.product_id} className="product-unit-details">
            <div>{product.name}</div>
            <span>sold by <span>{product.sold_by}</span> </span>
            <span>in stock <span>{product.quantity_in_stock}</span></span>
            <div>{product.order_quantity}</div>
            <div></div>
          </div>
        );
      })}
    </>
  );
};
