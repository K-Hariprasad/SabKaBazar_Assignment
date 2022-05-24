import React from "react";
import useForm from "../../hooks/useForm";
import Alert from "../alert";
import "./Form.scss";
function FormComp({ fields, formName }) {
  const { errors, handleFieldChange, handleSubmit} = useForm()
  return (
    <form noValidate onSubmit={(e)=>handleSubmit(e, fields, formName)}>
      {errors && errors["submitError"] && <Alert message={errors["submitError"]} type={"error"}/> }
      <div className="field__container">
        {fields.map((item) => (
          <div className="field__block" key={item.id}>
            <input
              id={item.id}
              name={item.name}
              className="field__input"
              autoComplete={item.autocomplete}
              type={item.type}
              placeholder=" "
              onChange={(e)=>handleFieldChange(e,item.pattern, item.errMsg)}
              onBlur={(e)=>handleFieldChange(e,item.pattern, item.errMsg)}
              aria-invalid="true" aria-errormessage="err1"
            />
            {errors&& errors[item.name] && <span id='err1' tabIndex={0} style={{color:'red', fontSize:'12px'}}>{errors[item.name]}</span>}
            <label htmlFor={item.id} className="field__label">
              {item.fieldname}
            </label>
            <div className="field__bar"></div>
          </div>
        ))}
      </div>
      <button type="submit" className="btn">
        {formName}
      </button>
    </form>
  );
}

export default FormComp;
