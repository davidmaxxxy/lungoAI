import React from "react";

function FormRow({ row, isInput }) {
  return (
    <div className="form-table-wrapper__row">
      {row.map((cell, index) => (
        <div
          key={index}
          className={`form-table-wrapper__cell form-table-wrapper__cell--${
            index === 0 ? "number" : index === 1 ? "description" : "impact"
          }`}
        >
          {index === 0 ? (
            <span>{cell}</span> // Always display the row number as a span
          ) : isInput ? (
            <input
              type="text"
              name={`row-${index}`}
              defaultValue={cell}
              className="form-table-wrapper__input"
              required
              style={{ backgroundColor: "transparent" }}
            />
          ) : (
            <span>{cell}</span> // Display the provided data as text for non-input cases
          )}
        </div>
      ))}
    </div>
  );
}

export default FormRow;
