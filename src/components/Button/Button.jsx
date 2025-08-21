import React from "react";
import styles from "./Button.module.css";
import { Link } from "react-router-dom";


const Button = ({ children, to, onClick, ...props }) => {
  // EĞER 'to' prop'u verilmişse, bu bir LİNK'tir.
  if (to) {
    return (
      <Link to={to} className={styles.button} {...props}>
        {children}
      </Link>
    );
  }

  // EĞER 'to' prop'u verilmemişse, bu standart bir BUTON'dur.
  return (
    <button onClick={onClick} className={styles.button} {...props}>
      {children}
    </button>
  );
};

export default Button;
