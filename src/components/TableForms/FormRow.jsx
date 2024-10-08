import React from "react";

function FormRow({ row }) {
  return (
    <div className="form-table-wrapper__row">
      <div className="form-table-wrapper__cell form-table-wrapper__cell--number">
        {row[0]}
      </div>
      <div className="form-table-wrapper__cell form-table-wrapper__cell--theme">
        <input
          type="text"
          name={`row-theme`}
          defaultValue={row[1]}
          className="form-table-wrapper__input"
          required
        />
      </div>
      <div className="form-table-wrapper__cell form-table-wrapper__cell--description">
        <input
          type="text"
          name={`row-description`}
          defaultValue={row[2]}
          className="form-table-wrapper__input"
          required
        />
      </div>
    </div>
  );
}

export default FormRow;
