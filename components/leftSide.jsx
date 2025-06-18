import styles from "@/styles/leftSide.module.css";
import Image from "next/image";
import logo from "@/assets/logo.webp";

const LeftSide = () => {
  return (
    <div className={styles.leftSide}>
      <Image
        src={logo}
        alt="logo"
        width={0}
        height={0}
        sizes="100vw"
        className={styles.logo}
      />

      <div className={styles.descreption}>
        <p className={styles.title}>Stay Untamed</p>
        <p className={styles.bref}>Sign Up & Get Welcome Bonus</p>
      </div>
    </div>
  );
};

export default LeftSide;
