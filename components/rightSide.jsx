import styles from "@/styles/rightSide.module.css";
import SigninForm from "./signinForm";
import LoginForm from "./loginForm";
import Image from "next/image";

const RightSide = () => {
  return (
    <div className={styles.rightSide}>
      <SigninForm />
      <LoginForm />
    </div>
  );
};

export default RightSide;
