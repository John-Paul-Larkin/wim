import { FormEvent, useState } from "react";
import Swal from "sweetalert2";
import useDeleteData from "../../hooks/useDeleteData";
import usePostData from "../../hooks/usePostData";
import { FormButtons } from "../FormButtons";

interface Inputs {
  setIdOfCurrentlySelectedRow: React.Dispatch<React.SetStateAction<number | null>>;
  refetchData: () => void;
  productDetails: ProductData;
  loading: boolean;
}

export const SingleProductDetails = (props: Inputs) => {
  // Destructure props and variables
  const { setIdOfCurrentlySelectedRow, productDetails, refetchData, loading } = props;
  const { product_id, name, description, quantity_in_stock, sold_by, case_size, rrp, restock_level } = productDetails;

  // These state assert which buttons will display. edit new save cancel etc
  const [editMode, setEditMode] = useState(false);
  const [newProductMode, setNewProductMode] = useState(false);

  const { postData } = usePostData();
  const { deleteData } = useDeleteData();

  const parseValuesFromInputs = (event: FormEvent<HTMLFormElement>) => {
    const target = event.target as typeof event.target & {
      product_id: { value: number };
      name: { value: string };
      description: { value: string };
      quantity_in_stock: { value: number };
      sold_by: { value: "case" | "unit" | "kg" };
      case_size: { value: number };
      rrp: { value: number };
      restock_level: { value: number };
    };

    // If this is an edit the id will already be set
    // if new product id will be undefined and a new product will be created in db
    let product_id: number | undefined = undefined;
    if (target.product_id.value) {
      product_id = target.product_id.value;
    }

    const userInputs: ProductData = {
      name: target.name.value,
      description: target.description.value,
      quantity_in_stock: Number(target.quantity_in_stock.value),
      sold_by: target.sold_by.value,
      case_size: Number(target.case_size.value),
      rrp: target.rrp.value,
      restock_level: Number(target.restock_level.value),
      product_id: product_id,
    };

    return userInputs;
  };

  const checkUserInputsAreValid = (userInputs: ProductData) => {
    let errors = "";

    if (Number.isNaN(userInputs.quantity_in_stock)) {
      errors += `Quantity must be a valid number\n`;
    }
    if (Number.isNaN(userInputs.case_size)) {
      errors += "Case size must be a valid number\n";
    }
    if (Number.isNaN(userInputs.restock_level)) {
      errors += "Restock level size must be a valid number\n";
    }

    if (errors === "") return true;
    else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        // text: errors,
        html: "<pre>" + errors + "</pre>",
      });
      return false;
    }
  };

  // Posts new product, or edits existing, depending on whether a product id has been provided
  const handleClickSaveEdit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userInputs = parseValuesFromInputs(event);

    if (checkUserInputsAreValid(userInputs)) {
      const editFormInputJson = JSON.stringify(userInputs);
      const { error } = await postData({ url: "/product/", jsonData: editFormInputJson });
      if (error === null) {
        setEditMode(false);
        setNewProductMode(false);
        setIdOfCurrentlySelectedRow(null);
        refetchData();
      } else {
        console.log(error.name);
        console.log(error.message);
      }
    }
  };

  const handleClickDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Product will be permanently deleted",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let error: Error | null = null;
        if (product_id) {
          const response = await deleteData({ url: "/product/", id: product_id });
          error = response.error;
        }
        if (error === null) {
          Swal.fire("Deleted!", "Product has been deleted.", "success");
          setIdOfCurrentlySelectedRow(null);
          refetchData();
        } else {
          console.log(error.name);
          console.log(error.message);
          Swal.fire("Something went wrong - Error message :", error.message);
        }
      }
    });
  };

  return (
    <>
      <div className="edit-wrapper">
        <div>
          <div className="labels">
            <div>Name : </div>
            <div>Description : </div>
            <div>Quantity in stock : </div>
            <div>Sold by : </div>
            <div>Case size : </div>
            <div>RRP : </div>
            <div>Restock level : </div>
            <div>Product id : </div>
          </div>
          {loading && <div className="error-loading">Loading.....</div>}

          {!loading && !editMode && !newProductMode && (
            <div className="details">
              <div>{name}</div>
              <div>{description}</div>
              <div>{quantity_in_stock}</div>
              <div>{sold_by}</div>
              <div>{case_size}</div>
              <div>{rrp}</div>
              <div>{restock_level}</div>
              <div>{product_id}</div>
            </div>
          )}
          {!loading && editMode && (
            <form className="details" id="product-form" onSubmit={handleClickSaveEdit}>
              <label>
                <input type="text" name="name" defaultValue={name}></input>
              </label>
              <label>
                <input type="text" name="description" defaultValue={description}></input>
              </label>
              <label>
                <input type="text" name="quantity_in_stock" defaultValue={quantity_in_stock}></input>
              </label>
              <label>
                <input type="text" name="sold_by" defaultValue={sold_by}></input>
              </label>
              <label>
                <input type="text" name="case_size" defaultValue={case_size}></input>
              </label>
              <label>
                <label>
                  <input type="text" name="rrp" defaultValue={rrp}></input>
                </label>

                <label>
                  <input type="text" name="restock_level" defaultValue={restock_level}></input>
                </label>

                <input type="text" name="product_id" defaultValue={product_id} readOnly></input>
              </label>
            </form>
          )}
          {!loading && newProductMode && (
            <form className="details" id="product-form" onSubmit={handleClickSaveEdit}>
              <label>
                <input type="text" name="name"></input>
              </label>
              <label>
                <input type="text" name="description"></input>
              </label>
              <label>
                <input type="text" name="quantity_in_stock"></input>
              </label>
              <label>
                {/* <input type="text" name="sold_by"></input> */}
                <select name="sold_by">
                  <option value="case" selected>
                    case
                  </option>
                  <option value="unit">unit</option>
                  <option value="kg">kg</option>
                </select>
              </label>
              <label>
                <input type="text" name="case_size"></input>
              </label>
              <label>
                <input type="text" name="rrp"></input>
              </label>
              <label>
                <input type="text" name="restock_level"></input>
              </label>

              <label>
                <input type="text" name="product_id" readOnly></input>
              </label>
            </form>
          )}
        </div>
        <FormButtons
          tableType={"product"}
          handleClickDelete={handleClickDelete}
          editMode={editMode}
          setEditMode={setEditMode}
          newMode={newProductMode}
          setNewMode={setNewProductMode}
        />
      </div>
    </>
  );
};
