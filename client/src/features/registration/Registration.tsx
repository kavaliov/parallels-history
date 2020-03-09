import React, { useEffect, useState } from "react";
import { useHttp } from "hooks";
import { Button, Input, Message } from "components";
import styles from "./Registration.module.css";

const Registration: React.FC = () => {
  const { loading, error, request, clearError } = useHttp();
  const [form, setForm] = useState({ email: "", password: "" });
  const [formError, setFormError] = useState(null);

  const changeHandler = (event: any) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      await request("/api/auth/register", "POST", { ...form });
    } catch (e) {}
  };

  const closeErrorHandler = () => {
    clearError();
  };

  useEffect(() => {
    setFormError(error);
  }, [error]);

  return (
    <div className={styles.wrapper}>
      <h1>Registration</h1>
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
        <Button loading={loading} onClick={registerHandler}>
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

export default Registration;
