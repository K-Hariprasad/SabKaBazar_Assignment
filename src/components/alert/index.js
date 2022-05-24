import React from "react";
import './Alert.scss'
function Alert({ type, message }) {
  return (
    <div className={`alertBlock__main ${type}`}>
      <span>{message}</span>
    </div>
  );
}

export default Alert;
