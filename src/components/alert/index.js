import React from "react";
import './Alert.scss'
const Alert = (props) => {
  let {type, message} = props
  return (
    <div className={`alertBlock__main ${type}`}>
      <span tabIndex={0}>{message}</span>
    </div>
  );
}

export default Alert;
