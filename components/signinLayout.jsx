import LeftSide from "./leftSide";
import RightSide from "./rightSide";
import styles from "@/styles/signinLayout.module.css";
const SigninLayout = () => {
  return (
    <div className={styles.container}>
      <LeftSide />
      <RightSide />
    </div>
  );
};

export default SigninLayout;
