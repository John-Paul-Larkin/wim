import { FormEvent, useState } from "react";
import Swal from "sweetalert2";
import useDeleteData from "../../hooks/useDeleteData";
import usePostData from "../../hooks/usePostData";
import { FormButtons } from "../FormButtons";

interface Inputs {
  setIdOfCurrentlySelectedRow: React.Dispatch<React.SetStateAction<number | null>>;
  refetchData: () => void;
  customerDetails: CustomerData;
  loading: boolean;
}

export const SingleCustomerDetails = (props: Inputs) => {
  // Destructure props and customer details
  const { setIdOfCurrentlySelectedRow, customerDetails, refetchData, loading } = props;
  const { name, rep, contact_phone, customer_id, address, eircode, email } = customerDetails;

  // These state assert which buttons will display. edit new save cancel etc
  const [editMode, setEditMode] = useState(false);
  const [newCustomerMode, setNewCustomerMode] = useState(false);

  const { postData } = usePostData();
  const { deleteData } = useDeleteData();

  // Posts new customer, or edits existing, depending on whether a customer id has been provided
  const handleClickSaveEdit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      name: { value: string };
      rep: { value: string };
      contact_phone: { value: string };
      address: { value: string };
      eircode: { value: string };
      email: { value: string };
      customer_id: { value: number };
    };

    const name = target.name.value;
    const rep = target.rep.value;
    const contact_phone = target.contact_phone.value;
    const address = target.address.value;
    const eircode = target.eircode.value;
    const email = target.email.value;

    // If the user clicked edit the id will already be set
    // if new customer there will be no id
    let customer_id: number | undefined = undefined;
    if (target.customer_id.value) {
      customer_id = target.customer_id.value;
    }

    const editFormInputJson = JSON.stringify({
      name,
      rep,
      contact_phone,
      address,
      eircode,
      email,
      customer_id,
    });

    const { error } = await postData({ url: "/customer/", jsonData: editFormInputJson });
    if (error === null) {
      setEditMode(false);
      setNewCustomerMode(false);
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
      text: "Customer" + name + "will be deleted permanently",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { error } = await deleteData({ url: "/customer/", id: customer_id });
        if (error === null) {
          Swal.fire("Deleted!", "Customer has been deleted.", "success");
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
            <div id="cust-name">Name : </div>
            <div id="cust-rep">Rep : </div>
            <div id="cust-contact">Contact number : </div>
            <div id="cust-address">Address : </div>
            <div id="cust-eircode">Eircode : </div>
            <div id="cust-email">Email : </div>
            <div id="cust-id">Customer id : </div>
          </div>
          {loading && <div className="error-loading"><span>Loading.....</span></div>}

          {!loading && !editMode && !newCustomerMode && (
            <div className="details">
              <div>{name}</div>
              <div>{rep}</div>
              <div>{contact_phone}</div>
              <div>{address}</div>
              <div>{eircode}</div>
              <div>{email}</div>
              <div>{customer_id}</div>
            </div>
          )}
          {!loading && editMode && (
            <form className="details" id="customer-form" onSubmit={handleClickSaveEdit}>
              <input type="text" name="name" defaultValue={name} aria-labelledby="cust-name"></input>
              <input type="text" name="rep" defaultValue={rep} aria-labelledby="cust-rep"></input>
              <input type="text" name="contact_phone" defaultValue={contact_phone} aria-labelledby="cust-contact"></input>
              <input type="text" name="address" defaultValue={address} aria-labelledby="cust-address"></input>
              <input type="text" name="eircode" defaultValue={eircode} aria-labelledby="cust-eircode"></input>
              <input type="text" name="email" defaultValue={email} aria-labelledby="cust-email"></input>
              <input type="text" name="customer_id" defaultValue={customer_id} aria-labelledby="cust-id" readOnly></input>
            </form>
          )}
          {!loading && newCustomerMode && (
            <form className="details" id="customer-form" onSubmit={handleClickSaveEdit}>
              <input type="text" name="name" aria-labelledby="cust-name"></input>
              <input type="text" name="rep" aria-labelledby="cust-rep"></input>
              <input type="text" name="contact_phone" aria-labelledby="cust-contact"></input>
              <input type="text" name="address" aria-labelledby="cust-address"></input>
              <input type="text" name="eircode" aria-labelledby="cust-eircode"></input>
              <input type="text" name="email" aria-labelledby="cust-email"></input>
              <input type="text" name="customer_id" readOnly aria-labelledby="cust-id"></input>
            </form>
          )}
        </div>
        <FormButtons
          tableType={"customer"}
          handleClickDelete={handleClickDelete}
          editMode={editMode}
          setEditMode={setEditMode}
          newMode={newCustomerMode}
          setNewMode={setNewCustomerMode}
        />
      </div>
    </>
  );
};
