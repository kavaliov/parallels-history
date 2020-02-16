import React from "react";
import classNames from "classnames";
import styles from "./Message.module.css";

interface MessageProps {
  className?: string;
  variant?: "error" | "warning" | "success";
}

const Message: React.FC<MessageProps> = ({
  children,
  className = "",
  variant = "success"
}) => (
  <div className={classNames(styles.wrapper, className, styles[variant])}>
    {children}
  </div>
);

export default Message;
