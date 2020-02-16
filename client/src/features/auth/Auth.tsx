import React, { useState, useEffect, useContext } from "react";
import { Input, Button, Message } from "components";
import { AppContext } from "duck";
import { useHttp } from "hooks";
import styles from "./Auth.module.css";

const Auth: React.FC = () => {
  const { login } = useContext(AppContext);
  const [formError, setFormError] = useState(null);
  const [form, setForm] = useState({ email: "", password: "" });
  const { loading, error, request, clearError } = useHttp();

  const changeHandler = (event: any) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      login(data.token, data.id);
    } catch (e) {}
  };

  const registerHandler = async () => {
    try {
      await request("/api/auth/register", "POST", { ...form });
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
        <Button loading={loading} variant="secondary" onClick={registerHandler}>
          Register
        </Button>
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
