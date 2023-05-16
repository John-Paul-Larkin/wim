import { FormEvent, useState } from "react";
import usePostData from "../hooks/usePostData";

export const SingleCustomerDetails = ({ customerDetails }: { customerDetails: CustomerTableData }) => {
  const { name, rep, contact_phone, customer_id, address } = customerDetails;

  const [editMode, setEditMode] = useState(false);

  const { postData } = usePostData();

  const handleClickSaveEdit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      name: { value: string };
      rep: { value: string };
      contact_phone: { value: string };
      address: { value: string };
      customer_id: { value: number };
    };

    const name = target.name.value;
    const rep = target.rep.value;
    const contact_phone = target.contact_phone.value;
    const address = target.address.value;

    const editFormInputJson = JSON.stringify({
      name,
      rep,
      contact_phone,
      address,
    });

    const { error, responseData } = await postData({ url: "/editcustomer", jsonData: editFormInputJson });

    console.log(error, "post error message");
    console.log(responseData);

    setEditMode(false);
  };

  return (
    <>
      <div className="customer-edit-wrapper">
        <div className="labels">
          <div>Name : </div>
          <div>Rep : </div>
          <div>Contact number : </div>
          <div>Address : </div>
          <div>Customer id : </div>
        </div>
        {!editMode && (
          <div className="details">
            <div>{name}</div>
            <div>{rep}</div>
            <div>{contact_phone}</div>
            <div>{address}</div>
            <div>{customer_id}</div>
          </div>
        )}
        {editMode && (
          <form className="details" id="edit-form" onSubmit={handleClickSaveEdit}>
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
              <input type="text" name="customer_id" defaultValue={customer_id} readOnly></input>
            </label>
          </form>
        )}
      </div>
      {!editMode && <button onClick={() => setEditMode(true)}>Edit</button>}
      {editMode && (
        <button type="submit" form="edit-form">
          Save
        </button>
      )}
      {!editMode && (
        <>
          <button>New customer</button>
          <button>Place order</button>
        </>
      )}
    </>
  );
};
