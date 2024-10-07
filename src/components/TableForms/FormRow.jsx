import React from "react";

function FormRow({ row }) {
  return (
    <div className="form-table-wrapper__row">
      {row.map((cell, index) => (
        <div key={index} className="form-table-wrapper__cell">
          <input
            type="text"
            name={`row-${index}`}
            defaultValue={cell}
            className="form-table-wrapper__input"
            required
          />
        </div>
      ))}
    </div>
  );
}

export default FormRow;
