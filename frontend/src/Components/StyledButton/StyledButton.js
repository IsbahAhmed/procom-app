import React from "react";
import { Spinner } from "react-bootstrap";
import "./StyledButton.css";

const StyledButton = (props) => {
  const { varient = "primary", value, className,loading, ...restProps } = props;
  return (
    <button
      className={`styled-button btn btn-${varient} ${className}`}
      {...restProps}
    >
    { loading ? <Spinner size="sm" animation="border" color="light"/> : value } 
    </button>
  );
};

export default React.memo(StyledButton);
