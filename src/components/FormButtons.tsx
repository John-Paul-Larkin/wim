interface Inputs {
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  newMode: boolean;
  setNewMode: React.Dispatch<React.SetStateAction<boolean>>;
  handleClickDelete: () => void;
  tableType: "customer" | "product" | "supplier";
}

export const FormButtons = (props: Inputs) => {
  const { editMode, setEditMode, newMode, setNewMode, handleClickDelete, tableType } = props;

  return (
    <div className="btn-container">
      {!editMode && !newMode && (
        <div>
          <div>
            <button onClick={() => setEditMode(true)}>Edit</button>
          </div>
          <div>
            <button onClick={() => setNewMode(true)}>New</button>
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
            <button type="submit" form={`${tableType}-form`}>
              Save
            </button>
          </div>
          <div>
            <button onClick={() => setEditMode(false)}>Cancel</button>
          </div>
        </>
      )}
      {newMode && (
        <>
          <div>
            <button type="submit" form={`${tableType}-form`}>
              Save
            </button>
          </div>
          <div>
            <button onClick={() => setNewMode(false)}>Cancel</button>
          </div>
        </>
      )}
    </div>
  );
};
