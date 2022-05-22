import React from "react";
import FormComp from "../../components/form";
import { signUpFields } from "./signupFields";
import "./Signup.scss";
function SignUp() {
  return (
    <section id="signup" className="signup__container">
      <aside>
        <h1>Signup</h1>
        <p>We do not share your personal details with anyone</p>
      </aside>
      <FormComp fields={signUpFields} formName = {"Signup"}/>
    </section>
  );
}

export default SignUp;
