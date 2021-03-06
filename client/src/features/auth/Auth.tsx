import React, { useState, useEffect, useContext } from "react";
import { Input, Button, Message } from "components";
import { AppContext } from "duck";
import { useHttp } from "hooks";
import styles from "./Auth.module.css";
import { Link } from "react-router-dom";

const Auth: React.FC = () => {
  const { loading, error, request, clearError } = useHttp();
  const { login } = useContext(AppContext);
  const [formError, setFormError] = useState(null);
  const [form, setForm] = useState({ email: "", password: "" });

  const changeHandler = (event: any) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      login(data.token, data.id);
    } catch (e) {}
  };

  useEffect(() => {
    setFormError(error);
  }, [error]);

  const closeErrorHandler = () => {
    clearError();
  };

  return (
    <div className={styles.wrapper}>
      <h1>Sign In</h1>
      <Input
        label="Email"
        id="email"
        name="email"
        placeholder="Enter email"
        value={form.email}
        onChange={changeHandler}
        disabled={loading}
      />
      <Input
        label="Password"
        id="password"
        name="password"
        placeholder="Enter password"
        value={form.password}
        onChange={changeHandler}
        disabled={loading}
        type="password"
      />
      <div className={styles.authButtons}>
        <Button loading={loading} onClick={loginHandler}>
          Login
        </Button>
        <Link to="registration">
          <Button variant="secondary">Registration</Button>
        </Link>
      </div>

      {formError && (
        <Message variant="error" className={styles.message}>
          {formError}
          <button className={styles.close} onClick={closeErrorHandler}>
            Close
          </button>
        </Message>
      )}
    </div>
  );
};

export default Auth;
