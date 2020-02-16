import React from "react";
import classNames from "classnames";
import styles from "./Button.module.css";

interface ButtonProps {
  className?: string;
  type?: "button" | "submit";
  variant?: "primary" | "secondary";
  loading?: boolean;
  size?: "small" | "medium";
  onClick?(
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLAnchorElement>
  ): void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  type = "button",
  variant = "primary",
  loading = false,
  size = "medium",
  onClick
}) => (
  <button
    type={type}
    className={classNames(
      styles.wrapper,
      styles[variant],
      styles[size],
      className
    )}
    onClick={onClick}
  >
    {loading && <div className={styles.circle} />}
    <span>{children}</span>
  </button>
);

export default Button;
