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
          ) : isInput && index === 1 ? (
            <textarea
              name={`row-${index}`}
              defaultValue={cell}
              className="form-table-wrapper__textarea"
              required
              rows={4}
              style={{ backgroundColor: "transparent" }}
            />
          ) : (
            <span>{cell}</span>
          )}
        </div>
      ))}
    </div>
  );
}

export default FormRow;
