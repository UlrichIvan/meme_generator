import React from "react";
import { v4 } from "uuid";

function InputSize({ input = {}, select = {} }) {
  return (
    <>
      <div className="size-content d-flex">
        <div className="form-group flex-grow-1">
          <input {...input} />
        </div>
        <div className="form-group flex-shrink-0">
          <select {...select}>
            {select.options.map((option) => (
              <option value={option} key={v4()}>
                {option}
              </option>
            ))}
          </select>
          {select.label ? (
            <label {...select.label.attr}>{select.label.text}</label>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default InputSize;
