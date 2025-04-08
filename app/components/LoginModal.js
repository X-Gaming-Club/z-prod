"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import styles from "../../styles/LoginModal.module.css";

// New component for the login modal
const LoginModal = ({ isOpen, onClose, onGoogleSignIn }) => {
  const router = useRouter();

  // Handle sign in click
// Handle sign in click
const handleSignIn = () => {
  // Check if onGoogleSignIn prop exists and call it, otherwise fallback to onClose
  if (typeof onGoogleSignIn === 'function') {
    onGoogleSignIn();
  } else {
    onClose();
  }
};

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3 className={styles.modalTitle}>Create an Account to Continue</h3>
        <p className={styles.modalText}>
          You've reached the limit for guest searches. Please log in or create an account to continue using all features.
        </p>
        <div className={styles.modalButtons}>
          <button 
            className={styles.loginButton}
            onClick={handleSignIn}
          >
            <FcGoogle size={18} />
            <span>Continue with Google</span>
          </button>
          <button 
            className={styles.cancelButton}
            onClick={onClose}
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;