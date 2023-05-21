import { motion } from "framer-motion";
import { FaRegTrashAlt } from "react-icons/fa";
import NumericInput from "react-numeric-input";
import Select from "react-select";
interface ProductSelect {
  value: number;
  label: string;
}
interface Inputs {
  selectedProducts: ProductDataQuantity[];
  setSelectedProducts: React.Dispatch<React.SetStateAction<ProductDataQuantity[]>>;
  productOptions: ProductSelect[];

  handleClickProductSelect: (selectedOption: ProductSelect | null) => void;
}

export const SelectedProducts = ({ selectedProducts, setSelectedProducts, productOptions, handleClickProductSelect }: Inputs) => {
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
            <span>
              price €<span>{product.sale_price}</span>{" "}
            </span>
            {product.sold_by !== "case" && (
              <span>
                <span>{product.sold_by}</span>{" "}
              </span>
            )}
            {product.sold_by === "case" && (
              <span>
                case size <span>{product.case_size}</span>
              </span>
            )}
            <span>
              stock <span>{product.quantity_in_stock}</span>
            </span>

            <div>
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
            <span onClick={() => handleClickRemoveProduct(product.product_id)}>
              <FaRegTrashAlt />
            </span>
          </motion.div>
        );
      })}
      <Select
        options={productOptions}
        onChange={handleClickProductSelect}
        placeholder={selectedProducts.length > 0 ? "Add another product" : "Add a product"}
        closeMenuOnSelect={true}
        value={null}
        openMenuOnFocus={true}
      ></Select>
    </>
  );
};
