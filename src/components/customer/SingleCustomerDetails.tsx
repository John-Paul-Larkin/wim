import { FormEvent, useState } from "react";
import useDeleteData from "../../hooks/useDeleteData";
import usePostData from "../../hooks/usePostData";
import { FormButtons } from "../FormButtons";

export const SingleCustomerDetails = ({ customerDetails, refetchData }: { refetchData: () => void; customerDetails: CustomerTableData }) => {
  const { name, rep, contact_phone, customer_id, address, eircode, email } = customerDetails;

  const [editMode, setEditMode] = useState(false);
  const [newCustomerMode, setNewCustomerMode] = useState(false);

  const { postData } = usePostData();
  const { deleteData } = useDeleteData();

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

    // If this is an edit the id will already be set
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

    console.log(editFormInputJson);

    const { error, responseData } = await postData({ url: "/editcustomer", jsonData: editFormInputJson });
    if (error === null) {
      console.log(responseData);
      setEditMode(false);
      setNewCustomerMode(false);
      refetchData();
    } else {
      console.log(error.name);
      console.log(error.message);
    }
  };

  const handleClickDelete = async () => {
    const { error } = await deleteData({ url: "/deletecustomer", id: customer_id });
    if (error === null) {
      refetchData();
    } else {
      console.log(error.name);
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="customer-edit-wrapper">
        <div className="labels">
          <div>Name : </div>
          <div>Rep : </div>
          <div>Contact number : </div>
          <div>Address : </div>
          <div>Eircode : </div>
          <div>Email : </div>
          <div>Customer id : </div>
        </div>
        {!editMode && !newCustomerMode && (
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
        {editMode && (
          <form className="details" id="customer-form" onSubmit={handleClickSaveEdit}>
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
              <input type="text" name="customer_id" defaultValue={customer_id} readOnly></input>
            </label>
          </form>
        )}
        {newCustomerMode && (
          <form className="details" id="customer-form" onSubmit={handleClickSaveEdit}>
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
              <input type="text" name="customer_id" readOnly></input>
            </label>
          </form>
        )}
      </div>
      <FormButtons
        handleClickDelete={handleClickDelete}
        editMode={editMode}
        setEditMode={setEditMode}
        newCustomerMode={newCustomerMode}
        setNewCustomerMode={setNewCustomerMode}
      />
    </>
  );
};
