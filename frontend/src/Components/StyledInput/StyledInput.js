import React, { useState } from "react";
import "./StyledInput.css";

const StyledInput = (props) => {
  var {value = "", placeholder = "label" ,type ,
  bottomLineColor="var(--color-primary)",outlineColor="var(--bs-gray-400)",...restInputProps} = props;
  var [focused, setFocus] = useState(false);
//   console.log(value);
  return (
    <div className="styled-input-container flex">
      <div className="input-container">
        <input
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          type={type}
          {...restInputProps}
          
        />
        <span className={`${(focused || value) && "focusedLabel"}`}>{placeholder}</span>
      </div>
      <div style={{backgroundColor:`${outlineColor}`}} className="input-outline-container flex">
        <div style={{backgroundColor:`${bottomLineColor}`}} className={`${(focused || value) && "input-outline-filler-focused"}`}></div>
      </div>
    </div>
  );
};

export default StyledInput;