interface Inputs {
  selectedProducts: ProductDataQuantity[];
}

export const SelectedProducts = ({ selectedProducts }: Inputs) => {
  return (
    <>
      {selectedProducts.map((product) => {
        return (
          <div key={product.product_id}>
            <div>{product.name}</div>
            <div>{product.quantity}</div>
            <div></div>
          </div>
        );
      })}
    </>
  );
};
