import React from "react";
import FormRow from "./FormRow";
import "../TableForms/FormTableWrapper.scss";
import Button from "../Buttons/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function FormTableWrapper({ headers, rows, handleFormSubmit, isInput }) {
  return (
    <form className="form-table-wrapper" onSubmit={handleFormSubmit}>
      <div className="form-table-wrapper__header">
        {headers.map((header, index) => (
          <div
            key={index}
            className={`form-table-wrapper__header-cell form-table-wrapper__header-cell--${
              index === 0 ? "number" : index === 1 ? "description" : "impact"
            }`}
          >
            {header.icon && (
              <span className="form-table-wrapper__header-icon">
                {header.icon}
              </span>
            )}
            {header.text}
          </div>
        ))}
      </div>
      <div className="form-table-wrapper__body">
        {rows.map((row, index) => (
          <FormRow key={index} row={row} isInput={isInput} />
        ))}
      </div>
      {isInput && <Button text="Generate impact analysis" type={"submit"} />}
    </form>
  );
}

export default FormTableWrapper;
