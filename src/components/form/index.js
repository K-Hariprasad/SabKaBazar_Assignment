import React from "react";
import useForm from "../../hooks/useForm";
import "./Form.scss";
function FormComp({ fields, formName }) {
  const { values, errors, handleFieldChange, handleSubmit} = useForm()
  return (
    <form noValidate onSubmit={(e)=>handleSubmit(e, fields, formName)}>
      {errors && errors["submitError"] && <div className="form__errorBlock">
        <span>{errors["submitError"]}</span>
      </div>}
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
            />
            {errors&& errors[item.name] && <span style={{color:'red', fontSize:'12px'}}>{errors[item.name]}</span>}
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
