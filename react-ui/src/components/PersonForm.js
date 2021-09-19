import React from "react";

const PersonForm = ({
  newName,
  newNumber,
  onChangeName,
  onChangeNumber,
  onClickAdd,
}) => {
  return (
    <div>
      <h1>add a new </h1>
      <form>
        <div>
          name: <input value={newName} onChange={onChangeName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={onChangeNumber} />
        </div>
        <div>
          <button type="submit" onClick={onClickAdd}>
            add
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
