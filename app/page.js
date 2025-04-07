"use client";
import React from "react";
import styles from "../styles/page.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const router = useRouter();

  const handleSignIn = () => {
    router.push("/Homepage");
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.loginContent}>
        <div className={styles.logoWrapper}>
          <Image
            src="/b_logo.svg"
            alt="XGaming"
            width={120}
            height={100}
            priority
            className={styles.logoImage}
          />
        </div>
        <h1 className={styles.loginHeading}>
          Welcome to XGaming
        </h1>
        <p className={styles.loginSubtitle}>
          Your personal insights assistant for games and analysis
        </p>
        <button
          className={styles.googleButton}
          onClick={handleSignIn}
        >
          <FcGoogle size={18} className={styles.googleIcon} />
          Continue with Google
        </button>
        <div className={styles.termsText}>
          By continuing, you agree to our <a href="#" className={styles.link}>Terms of Service</a> and <a href="#" className={styles.link}>Privacy Policy</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;