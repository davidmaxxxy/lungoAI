import React from "react";

function FormRow({ row }) {
  return (
    <div className="form-table-wrapper__row">
      {row.map((cell, index) => (
        <div
          key={index}
          className={`form-table-wrapper__cell form-table-wrapper__cell--${
            index === 0 ? "number" : "description"
          }`}
        >
          {index === 0 ? (
            <span>{cell}</span>
          ) : (
            <textarea
              type="text"
              name={`row-${index}`}
              defaultValue={cell}
              className="form-table-wrapper__input"
              required
              style={{ backgroundColor: "transparent" }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default FormRow;
