import React from "react";
import FormComp from "../../components/form";
import { loginFields } from "./loginFields";
import "./Login.scss";
function Login() {
  return (
    <section id="login" className="login__container">
      <aside>
        <h1>Login</h1>
        <p>Get access to your Orders, Wishlists and Recommendations</p>
      </aside>
      <FormComp fields={loginFields} formName = {"Login"}/>
    </section>
  );
}

export default Login;
