import { motion } from "framer-motion";
import { FaRegTrashAlt } from "react-icons/fa";
import NumericInput from "react-numeric-input";
import Select from "react-select";
import { SalesOrderSubmit } from "./SalesOrderSubmit";
import { Totals } from "./Totals";

interface Inputs {
  setSelectedProducts: React.Dispatch<React.SetStateAction<ProductDataQuantity[]>>;
  productOptions: ProductSelect[];
  handleClickProductSelect: (selectedOption: ProductSelect | null) => void;
  selectedProducts: ProductDataQuantity[];
  selectedCustomer: CustomerSelect | null;
  setSelectedCustomer: React.Dispatch<React.SetStateAction<CustomerSelect | null>>;
  refetchReceivedIds: () => void;
  refetchProductData: () => void;
}

export const SelectedProducts = (props: Inputs) => {
  const {
    setSelectedCustomer,
    selectedProducts,
    selectedCustomer,
    setSelectedProducts,
    productOptions,
    handleClickProductSelect,
    refetchReceivedIds,
    refetchProductData,
  } = props;

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
              price<div>€ {product.sale_price}</div>{" "}
            </div>
            <div>
              available <div>{product.quantity_in_stock - (product.quantity_on_hold ?? 0)}</div>
            </div>

            <div>
              QTY:
              <NumericInput
                className="quantity-input"
                strict={true}
                min={0}
                max={product.quantity_in_stock - (product.quantity_on_hold ?? 0)}
                value={product.order_quantity}
                onChange={(valueAsNumber) => {
                  const id = product.product_id;
                  handleChangeQuantity({ id, valueAsNumber });
                }}
              />
            </div>
            <div>
              Total : <div>{Math.round(product.sale_price * product.order_quantity * 100) / 100}</div>
            </div>
            <button className="delete-icon" onClick={() => handleClickRemoveProduct(product.product_id)}>
              <FaRegTrashAlt />
            </button>
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
      <SalesOrderSubmit
        setSelectedProducts={setSelectedProducts}
        selectedProducts={selectedProducts}
        selectedCustomer={selectedCustomer}
        setSelectedCustomer={setSelectedCustomer}
        refetchReceivedIds={refetchReceivedIds}
        refetchProductData={refetchProductData}
      />
    </>
  );
};
