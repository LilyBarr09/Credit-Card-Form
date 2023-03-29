import React from "react";
import "./InputBase.css";

const InputBase = (props) => (
  <label>
    <input className="input-root" {...props} />
  </label>
);

export default InputBase;
