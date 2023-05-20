import { FormEvent, useState } from "react";
import Swal from "sweetalert2";
import useDeleteData from "../../hooks/useDeleteData";
import usePostData from "../../hooks/usePostData";
import { FormButtons } from "../FormButtons";

interface Inputs {
  setIdOfCurrentlySelectedRow: React.Dispatch<React.SetStateAction<number | null>>;
  refetchData: () => void;
  supplierDetails: SupplierData;
  loading: boolean;
}

export const SingleSupplierDetails = (props: Inputs) => {
  // Destructure props and variables
  const { setIdOfCurrentlySelectedRow, supplierDetails, refetchData, loading } = props;
  const { name, rep, contact_phone, supplier_id, address, eircode, email } = supplierDetails;

  // These state assert which buttons will display. edit new save cancel etc
  const [editMode, setEditMode] = useState(false);
  const [newSupplierMode, setNewSupplierMode] = useState(false);

  const { postData } = usePostData();
  const { deleteData } = useDeleteData();

  // Posts new supplier, or edits existing, depending on whether a supplier id has been provided
  const handleClickSaveEdit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      name: { value: string };
      rep: { value: string };
      contact_phone: { value: string };
      address: { value: string };
      eircode: { value: string };
      email: { value: string };
      supplier_id: { value: number };
    };

    const name = target.name.value;
    const rep = target.rep.value;
    const contact_phone = target.contact_phone.value;
    const address = target.address.value;
    const eircode = target.eircode.value;
    const email = target.email.value;

    // If this is an edit the id will already be set
    // if new supplier there will be no id
    let supplier_id: number | undefined = undefined;
    if (target.supplier_id.value) {
      supplier_id = target.supplier_id.value;
    }

    const editFormInputJson = JSON.stringify({
      name,
      rep,
      contact_phone,
      address,
      eircode,
      email,
      supplier_id,
    });

    const { error } = await postData({ url: "/supplier/", jsonData: editFormInputJson });
    if (error === null) {
      setEditMode(false);
      setNewSupplierMode(false);
      setIdOfCurrentlySelectedRow(null);
      refetchData();
    } else {
      console.log(error.name);
      console.log(error.message);
    }
  };

  const handleClickDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Supplier will be deleted permanently",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { error } = await deleteData({ url: "/supplier/", id: supplier_id });
        if (error === null) {
          Swal.fire("Deleted!", "Supplier has been deleted.", "success");
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
            <div>Rep : </div>
            <div>Contact number : </div>
            <div>Address : </div>
            <div>Eircode : </div>
            <div>Email : </div>
            <div>Supplier id : </div>
          </div>
          {loading && <div className="error-loading">Loading.....</div>}

          {!loading && !editMode && !newSupplierMode && (
            <div className="details">
              <div>{name}</div>
              <div>{rep}</div>
              <div>{contact_phone}</div>
              <div>{address}</div>
              <div>{eircode}</div>
              <div>{email}</div>

              <div>{supplier_id}</div>
            </div>
          )}
          {!loading && editMode && (
            <form className="details" id="supplier-form" onSubmit={handleClickSaveEdit}>
              <label>
                <input type="text" name="name" defaultValue={name}></input>
              </label>
              <label>
                <input type="text" name="rep" defaultValue={rep}></input>
              </label>
              <label>
                <input type="text" name="contact_phone" defaultValue={contact_phone}></input>
              </label>
              <label>
                <input type="text" name="address" defaultValue={address}></input>
              </label>
              <label>
                <input type="text" name="eircode" defaultValue={eircode}></input>
              </label>
              <label>
                <input type="text" name="email" defaultValue={email}></input>
              </label>
              <label>
                <input type="text" name="supplier_id" defaultValue={supplier_id} readOnly></input>
              </label>
            </form>
          )}
          {!loading && newSupplierMode && (
            <form className="details" id="supplier-form" onSubmit={handleClickSaveEdit}>
              <label>
                <input type="text" name="name"></input>
              </label>
              <label>
                <input type="text" name="rep"></input>
              </label>
              <label>
                <input type="text" name="contact_phone"></input>
              </label>
              <label>
                <input type="text" name="address"></input>
              </label>
              <label>
                <input type="text" name="eircode"></input>
              </label>
              <label>
                <input type="text" name="email"></input>
              </label>
              <label>
                <input type="text" name="supplier_id" readOnly></input>
              </label>
            </form>
          )}
        </div>
        <FormButtons
          tableType={"supplier"}
          handleClickDelete={handleClickDelete}
          editMode={editMode}
          setEditMode={setEditMode}
          newMode={newSupplierMode}
          setNewMode={setNewSupplierMode}
        />
      </div>
    </>
  );
};
