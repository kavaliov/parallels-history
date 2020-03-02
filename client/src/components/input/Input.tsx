import React from "react";
import classNames from "classnames";
import styles from "./Input.module.css";

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  label?: string;
  type?: "text" | "password";
  value?: string;
  defaultValue?: string | number;
  className?: string;
  name?: string;
  id?: string;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({
  name,
  className,
  value,
  type = "text",
  placeholder = "",
  label = "",
  id = "",
  onChange,
  defaultValue
}) => (
  <>
    {label && (
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
    )}
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      defaultValue={defaultValue}
      placeholder={placeholder}
      className={classNames(styles.wrapper, className)}
      onChange={onChange}
    />
  </>
);

export default Input;
