import { motion } from "framer-motion";
import { FaRegTrashAlt } from "react-icons/fa";
import NumericInput from "react-numeric-input";
import Select from "react-select";
import { OrderSubmit } from "./OrderSubmit";
import { Totals } from "./Totals";
interface ProductSelect {
  value: number;
  label: string;
}
interface Inputs {
  setSelectedProducts: React.Dispatch<React.SetStateAction<ProductDataQuantity[]>>;
  productOptions: ProductSelect[];
  handleClickProductSelect: (selectedOption: ProductSelect | null) => void;
  selectedProducts: ProductDataQuantity[];
  selectedCustomer: CustomerSelect | null;
  setSelectedCustomer: React.Dispatch<React.SetStateAction<CustomerSelect | null>>;
}

export const SelectedProducts = ({
  setSelectedCustomer,
  selectedProducts,
  selectedCustomer,
  setSelectedProducts,
  productOptions,
  handleClickProductSelect,
}: Inputs) => {
  const handleClickRemoveProduct = (id: number | undefined) => {
    const productsWithClickedRemoved = selectedProducts.filter((product) => product.product_id !== id);
    setSelectedProducts(productsWithClickedRemoved);
    localStorage.setItem("selectedProducts", JSON.stringify(productsWithClickedRemoved));
  };

  const handleChangeQuantity = ({ valueAsNumber, id }: { valueAsNumber: number | null; id: number | undefined }) => {
    if (id) {
      const selectedProductsUpdatedWithNewQuantity = selectedProducts.map((product) => {
        if (product.product_id === id && valueAsNumber) {
          return { ...product, order_quantity: valueAsNumber };
        } else {
          return product;
        }
      });
      setSelectedProducts(selectedProductsUpdatedWithNewQuantity);
      localStorage.setItem("selectedProducts", JSON.stringify(selectedProductsUpdatedWithNewQuantity));
    }
  };
  return (
    <>
      {selectedProducts.map((product) => {
        return (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            transition={{ duration: 0.25 }}
            exit={{ opacity: 0 }}
            key={product.product_id}
            className="product-unit-details"
          >
            <div>{product.name}</div>
            {product.sold_by !== "case" && (
              <div>
                <div>{product.sold_by}</div>{" "}
              </div>
            )}
            {product.sold_by === "case" && (
              <div>
                case size <div>{product.case_size}</div>
              </div>
            )}
            <div>
              stock <div>{product.quantity_in_stock}</div>
            </div>
            <div>
              price<div>€ {product.sale_price}</div>{" "}
            </div>

            <div>
              QTY:
              <NumericInput
                className="quantity-input"
                strict={true}
                min={0}
                max={product.quantity_in_stock}
                value={product.order_quantity}
                onChange={(valueAsNumber) => {
                  const id = product.product_id;
                  handleChangeQuantity({ id, valueAsNumber });
                }}
              />
              {/* {product.order_quantity} */}
            </div>
            <div>
              Total : <div>{Math.round(product.sale_price * product.order_quantity * 100) / 100}</div>
              {/* Total : <div>{product.sale_price }</div>   */}
              {/* Total : <div>{ product.order_quantity}</div>   */}
            </div>
            <div className="delete-icon" onClick={() => handleClickRemoveProduct(product.product_id)}>
              <FaRegTrashAlt />
            </div>
          </motion.div>
        );
      })}
      <Totals selectedProducts={selectedProducts} />
      <Select
        options={productOptions}
        onChange={handleClickProductSelect}
        placeholder={selectedProducts.length > 0 ? "Add another product" : "Add a product"}
        closeMenuOnSelect={true}
        value={null}
        openMenuOnFocus={true}
      ></Select>
      <OrderSubmit
        setSelectedProducts={setSelectedProducts}
        selectedProducts={selectedProducts}
        selectedCustomer={selectedCustomer}
        setSelectedCustomer={setSelectedCustomer}
      />
    </>
  );
};
