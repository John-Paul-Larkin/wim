interface FormButton {
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  newCustomerMode: boolean;

  setNewCustomerMode: React.Dispatch<React.SetStateAction<boolean>>;
  handleClickDelete: () => void;
}

export const FormButtons = ({ editMode, setEditMode, newCustomerMode, setNewCustomerMode, handleClickDelete }: FormButton) => {
  return (
    <div className="btn-container">
      {!editMode && !newCustomerMode && (
        <div>
          <div>
            <button onClick={() => setEditMode(true)}>Edit</button>
          </div>
          <div>
            <button onClick={() => setNewCustomerMode(true)}>New</button>
          </div>
          <div>
            <button>Place order</button>
          </div>
          <div>
            <button onClick={handleClickDelete}>Delete</button>
          </div>
        </div>
      )}
      {editMode && (
        <>
          <div>
            <button type="submit" form="customer-form">
              Save
            </button>
          </div>
          <div>
            <button onClick={() => setEditMode(false)}>Cancel</button>
          </div>
        </>
      )}
      {newCustomerMode && (
        <>
          <div>
            <button type="submit" form="customer-form">
              Save
            </button>
          </div>
          <div>
            <button onClick={() => setNewCustomerMode(false)}>Cancel</button>
          </div>
        </>
      )}
    </div>
  );
};
