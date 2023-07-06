import { useState } from "react";

interface Inputs {
  productData: ProductData[];
  selectedProductIds: number[] | null;
  setSelectedProductsIds: React.Dispatch<React.SetStateAction<number[] | null>>;
}

function OrderItems(props: Inputs) {
  const { productData, selectedProductIds, setSelectedProductsIds } = props;

  const selectedProducts = productData.filter((product) => {
    if (product.product_id) {
      return selectedProductIds?.includes(product.product_id);
    }
  });

  return (
    <div className="purchase-order">
      {selectedProducts &&
        selectedProducts.map((product) => {
          return <IndividualItem product={product} selectedProductIds={selectedProductIds} setSelectedProductsIds={setSelectedProductsIds} />;
        })}
    </div>
  );
}
export default OrderItems;

interface IndividulaInputs {
  product: ProductData;
  selectedProductIds: number[] | null;
  setSelectedProductsIds: React.Dispatch<React.SetStateAction<number[] | null>>;
}

function IndividualItem(props: IndividulaInputs) {
  const { selectedProductIds, setSelectedProductsIds, product } = props;

  const handleClickRemove = (productID: number | undefined) => {
    if (selectedProductIds !== null) {
      setSelectedProductsIds(selectedProductIds.filter((id) => id !== productID));
    }
  };

  const [quantity, setQuantity] = useState(0);

  const handleQuantityChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setQuantity(parseInt(target.value));
  };

  return (
    <div key={product.product_id} className="individual">
      <span>{product.name}</span>
      {product.purchase_price}
      <button onClick={() => handleClickRemove(product.product_id)}>Remove</button>
      <label htmlFor="quantity">Qty:</label>
      <input type="number" id="quantity" name="quantity" min="0" value={quantity} onChange={handleQuantityChange}></input>
    </div>
  );
}
