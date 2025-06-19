"use client";

import styles from "@/styles/signinForm.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SigninForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("userEmailForVerification", email);
        setEmail("");
        setPassword("");
        router.push(`/verify`);
      } else {
        console.error("Registration failed:");
      }
    } catch (err) {
      console.error("Network error or unexpected issue:", err);
      console.log(email, password);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.signinForm}>
      <p className={styles.p}>Sign In</p>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Email / Phone Number"
          value={email}
          className={styles.input}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          className={styles.input}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className={styles.forgetPassword}>
          <a href="#" className={styles.forgetPasswordLink}>
            <span className={styles.forgetPasswordLinkSpan}>
              Forgot your password?
            </span>
          </a>
        </div>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={loading}
        >
          <span className={styles.submitButtonSpan}>
            {loading ? "Logging you in" : "Sign In"}
          </span>
        </button>
      </form>
    </div>
  );
};

export default SigninForm;
