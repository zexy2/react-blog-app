import styles from "./Button.module.css";
import { Link } from "react-router-dom";

const Button = ({ children, to, onClick, ...props }) => {
  if (to) {
    return (
      <Link to={to} className={styles.button} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={styles.button} {...props}>
      {children}
    </button>
  );
};

export default Button;
