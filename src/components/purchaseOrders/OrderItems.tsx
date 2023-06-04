interface Inputs {
  productData: ProductData[];
  selectedProductIds: number[] | null;
}

function OrderItems(props: Inputs) {
  const { productData, selectedProductIds } = props;

  const selectedProducts = productData.filter((product) => {
    if (product.product_id) {
      return selectedProductIds?.includes(product.product_id);
    }
  });

  return (
    <>
      {selectedProducts &&
        selectedProducts.map((product) => {
          return <div>{product.name}</div>;
        })}
    </>
  );
}
export default OrderItems;
