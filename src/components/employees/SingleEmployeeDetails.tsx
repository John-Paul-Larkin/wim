import { FormEvent, useState } from "react";
import Swal from "sweetalert2";
import useDeleteData from "../../hooks/useDeleteData";
import usePostData from "../../hooks/usePostData";
import { FormButtons } from "../FormButtons";

interface Inputs {
  setIdOfCurrentlySelectedRow: React.Dispatch<React.SetStateAction<number | null>>;
  refetchData: () => void;
  employeeDetails: EmployeeData;
  loading: boolean;
}

export const SingleEmployeeDetails = (props: Inputs) => {
  // Destructure props and variables
  const { setIdOfCurrentlySelectedRow, employeeDetails, refetchData, loading } = props;
  const { name, contact_phone, employee_id, address, eircode, email } = employeeDetails;

  // These state assert which buttons will display. edit new save cancel etc
  const [editMode, setEditMode] = useState(false);
  const [newEmployeeMode, setNewEmployeeMode] = useState(false);

  const { postData } = usePostData();
  const { deleteData } = useDeleteData();

  // Posts new employee, or edits existing, depending on whether a employee id has been provided
  const handleClickSaveEdit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      name: { value: string };
      contact_phone: { value: string };
      address: { value: string };
      eircode: { value: string };
      email: { value: string };
      employee_id: { value: number };
    };

    const name = target.name.value;
    const contact_phone = target.contact_phone.value;
    const address = target.address.value;
    const eircode = target.eircode.value;
    const email = target.email.value;

    // If this is an edit the id will already be set
    // if new employee there will be no id
    let employee_id: number | undefined = undefined;
    if (target.employee_id.value) {
      employee_id = target.employee_id.value;
    }

    const editFormInputJson = JSON.stringify({
      name,
      contact_phone,
      address,
      eircode,
      email,
      employee_id,
    });

    const { error } = await postData({ url: "/employee/", jsonData: editFormInputJson });
    if (error === null) {
      setEditMode(false);
      setNewEmployeeMode(false);
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
      text: "Employee will be deleted permanently",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { error } = await deleteData({ url: "/employee/", id: employee_id });
        if (error === null) {
          Swal.fire("Deleted!", "Employee has been deleted.", "success");
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
            <div>Contact number : </div>
            <div>Address : </div>
            <div>Eircode : </div>
            <div>Email : </div>
            <div>Employee id : </div>
          </div>
          {loading && <div className="error-loading">Loading.....</div>}

          {!loading && !editMode && !newEmployeeMode && (
            <div className="details">
              <div>{name}</div>
              <div>{contact_phone}</div>
              <div>{address}</div>
              <div>{eircode}</div>
              <div>{email}</div>

              <div>{employee_id}</div>
            </div>
          )}
          {!loading && editMode && (
            <form className="details" id="employee-form" onSubmit={handleClickSaveEdit}>
              <label>
                <input type="text" name="name" defaultValue={name}></input>
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
                <input type="text" name="employee_id" defaultValue={employee_id} readOnly></input>
              </label>
            </form>
          )}
          {!loading && newEmployeeMode && (
            <form className="details" id="employee-form" onSubmit={handleClickSaveEdit}>
              <label>
                <input type="text" name="name"></input>
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
                <input type="text" name="employee_id" readOnly></input>
              </label>
            </form>
          )}
        </div>
        <FormButtons
          tableType={"employee"}
          handleClickDelete={handleClickDelete}
          editMode={editMode}
          setEditMode={setEditMode}
          newMode={newEmployeeMode}
          setNewMode={setNewEmployeeMode}
        />
      </div>
    </>
  );
};
