import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import Select from "react-select";
import Swal from "sweetalert2";
import useFetchData from "../../hooks/useFetchData";
import usePostData from "../../hooks/usePostData";

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
  const { fetchedData: fetchedSupplierData } = useFetchData<SupplierData[]>("/supplier/");

  const [selectedSupplier, setSelectedSupplier] = useState<SupplierSelect | null>(null);

  const supplierOptions: SupplierSelect[] = [];

  const handleChangeSupplierSelect = (selectedOption: SupplierSelect | null) => {
    setSelectedSupplier(selectedOption);
  };

  if (fetchedSupplierData) {
    fetchedSupplierData.forEach((supplier) => {
      supplierOptions.push({
        value: supplier.supplier_id,
        label: supplier.name,
      });
    });
  }

  const clearOrder = () => {
    setSelectedSupplier(null);
    setSelectedProducts([]);
  };

  const { postData } = usePostData();

  const handlePlaceOrder = async () => {
    // before putting through the order, check if
    // there are any products with no quantity selected
    const productsWithZeroQuantity: string[] = [];
    if (selectedProducts) {
      selectedProducts.forEach((product) => {
        if (product.order_quantity === 0) {
          productsWithZeroQuantity.push(product.name);
        }
      });
      if (productsWithZeroQuantity.length > 0) {
        const message = productsWithZeroQuantity.join(" and ");
        Swal.fire({
          icon: "error",
          title: "Please add a quantity",
          text: message,
        });
      } else {
        const orderDetails = JSON.stringify({
          supplierID: selectedSupplier?.value,
          products: selectedProducts,
          employeeID: 2,
        });

        const { error } = await postData({ url: "/purchaseOrder/", jsonData: orderDetails });
        if (error) {
          Swal.fire({
            icon: "error",
            title: "Something went wrong!",
            text: error?.message,
          });
        } else {
          clearOrder();
          Swal.fire("Order has been placed");
        }
      }
    }
  };

  return (
    <>
      <div className="purchase-order">
        {selectedProducts &&
          selectedProducts.map((product) => {
            return (
              <div className="individual" key={product.product_id}>
                <div className="name">{product.name}</div>
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
      {selectedSupplier && (
        <div className="supplier-name">
          Supplier : {selectedSupplier.label}
          <button onClick={handlePlaceOrder}>Place order</button>
        </div>
      )}
      {selectedProducts && (
        <Select
          className="customer-select"
          placeholder={selectedSupplier ? "Change supplier" : "Select a supplier"}
          options={supplierOptions}
          onChange={handleChangeSupplierSelect}
          value={null}
        ></Select>
      )}
    </>
  );
}
export default OrderItems;
