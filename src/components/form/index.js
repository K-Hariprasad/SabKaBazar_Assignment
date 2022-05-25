import React from "react";
import useForm from "../../hooks/useForm";
import Alert from "../alert";
import "./Form.scss";
function FormComp({ fields, formName }) {
  const { errors, handleFieldChange, handleSubmit} = useForm()
  
  return (
    <form noValidate onSubmit={(e)=>handleSubmit(e, fields, formName)}>
      {errors && errors["submitError"] && <Alert tabIndex={0} message={errors["submitError"]} type={"error"}/> }
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
              aria-required={true}
              onChange={(e)=>handleFieldChange(e,item)}
              onBlur={(e)=>handleFieldChange(e,item)}
              aria-invalid="true" 
              aria-errormessage={item.ariaErrormessage}
            />
            {errors&& errors[item.name] &&<span tabIndex={0} id={item.ariaErrormessage} aria-live="assertive" role="alert" className="field__error" >{errors[item.name]}</span>}
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
