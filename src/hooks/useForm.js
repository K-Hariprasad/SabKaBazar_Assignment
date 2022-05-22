import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useDispatch } from 'react-redux'
import { userLogin } from '../redux/actions/userActions'
import { useNavigate } from "react-router-dom";

const useForm = () => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const validate = (name, value, pattern, errMsg) => {
    if (!value.trim()) {
      setErrors({ ...errors, [name]: "Field should not be empty!" });
    } else if (name === "confirmPassword") {
      if (value !== values.password) {
        setErrors({
          ...errors,
          confirmPassword: "Should be match with the password!",
        });
      } else {
        setErrors({ ...errors, confirmPassword: "" });
      }
    } else if (pattern.test(value)) {
      setErrors({ ...errors, [name]: "" });
    } else {
      setErrors({ ...errors, [name]: errMsg });
    }
  };

  const handleFieldChange = (e, pattern, errMsg) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    validate(fieldName, fieldValue, pattern, errMsg);
    setValues({ ...values, [fieldName]: fieldValue });
  };

  const handleSubmit = (e, fields, formName) => {
    e.preventDefault();
    let valuesCopy = { ...values };
    let errCopy = { ...errors };
    Object.keys(errCopy).forEach((e) => {
      (!errCopy[e] || e === "submitError") && delete errCopy[e];
    });
    Object.keys(valuesCopy).forEach((e) => {
      !valuesCopy[e] && delete valuesCopy[e];
    });
    if (Object.keys(valuesCopy).length !== fields.length) {
      setErrors({ ...errors, submitError: "All fields are mandatory!" });
    } else if (Object.keys(errCopy).length > 0) {
      setErrors({ ...errors, submitError: "Please provide valid data!" });
    } else {
      setErrors({ ...errors, submitError: "" });
      submitForm(formName);
    }
  };
  const submitForm = async (formName) => {
    try {
      let res;
      if (formName === "Login") {
        res = await axiosInstance.post("login", values);
      } else if (formName === "Signup") {
        const { confirmPassword, ...rest } = values;
        res = await axiosInstance.post("register", rest);
      }
      dispatch(userLogin(res.user))
      navigate('/')
    } catch (error) {
      setErrors({ ...errors, submitError: error.message });
    }
  };
  return {
    values,
    errors,
    handleFieldChange,
    handleSubmit,
  };
};

export default useForm;
