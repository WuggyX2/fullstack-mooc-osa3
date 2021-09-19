import React from "react";

const Filter = ({ filterTerm, onChange }) => {
  return (
    <div>
      filter shown with <input value={filterTerm} onChange={onChange} />
    </div>
  );
};

export default Filter;
