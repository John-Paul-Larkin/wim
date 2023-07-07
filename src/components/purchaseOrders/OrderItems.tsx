import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import useFetchData from "../../hooks/useFetchData";

interface Inputs {
  // productData: ProductData[];
  selectedProducts: ProductDataQuantity[] | null;
  setSelectedProducts: React.Dispatch<React.SetStateAction<ProductDataQuantity[] | null>>;
}

function OrderItems(props: Inputs) {
  const { selectedProducts, setSelectedProducts } = props;

  const handleQuantityChange = (id: number | undefined, e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;

    const tempProducts = selectedProducts?.map((product) => {
      if (product.product_id === id) {
        return { ...product, order_quantity: parseInt(target.value) };
      }
      return product;
    });

    if (tempProducts !== undefined) {
      setSelectedProducts(tempProducts);
    }
  };

  const handleClickRemove = (productID: number | undefined) => {
    if (selectedProducts !== null) {
      setSelectedProducts(selectedProducts.filter((prod) => prod.product_id !== productID));
    }
  };

  const [selectedSupplier,setSelectedSupplier] = useState<SupplierSelect|null>(null)

  const customerOptions: SupplierSelect[] = [];

  const { fetchedData: fetchedCustomerData } = useFetchData<CustomerData[]>("/customer/");

  const handleChangeSupplierSelect = () => {

  }

  return (
    <>
    <div className="purchase-order">
      {selectedProducts &&
        selectedProducts.map((product) => {
          return (
            <div className="individual" key={product.product_id}>
              <div className='name'>{product.name}</div>
              <label htmlFor="quantity"> Qty:</label>
              <input
                type="number"
                className="quantity"
                id="quantity"
                name="quantity"
                min="0"
                value={product.order_quantity}
                onChange={(e) => handleQuantityChange(product.product_id, e)}
              ></input>
              <button className="delete-btn" onClick={() => handleClickRemove(product.product_id)}>
                <FaRegTrashAlt />
              </button>
            </div>
          );
        })}
    </div>
    <Select
          className="customer-select"
          placeholder={selectedSupplier ? "Change supplier" : "Select a supplier"}
          options={supplierOptions}
          onChange={handleChangeSupplierSelect}
          value={null}
        ></Select>

    </>
  );
}
export default OrderItems;
