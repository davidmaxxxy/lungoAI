import React from "react";
import FormRow from "./FormRow";
import "../TableForms/FormTableWrapper.scss";
import Button from "../Buttons/Button";

function FormTableWrapper({ headers, rows, handleFormSubmit }) {
  return (
    <form className="form-table-wrapper" onSubmit={handleFormSubmit}>
      <div className="form-table-wrapper__header">
        {headers.map((header, index) => (
          <div key={index} className="form-table-wrapper__header-cell">
            {header.text}
            {header.icon && (
              <img
                src={header.icon}
                alt={`${header.text} icon`}
                className="form-table-wrapper__header-icon"
              />
            )}
          </div>
        ))}
      </div>
      <div className="form-table-wrapper__body">
        {rows.map((row, index) => (
          <FormRow key={index} row={row} />
        ))}
      </div>
      <Button type="submit" text={"Generate Impact Analysis"} />
    </form>
  );
}

export default FormTableWrapper;
