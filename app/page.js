"use client";
import React, { useEffect, useRef } from "react";
import styles from "../styles/Page.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import gsap from "gsap";

const LoginPage = () => {
  const router = useRouter();
  
  // References for GSAP animations
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);
  const termsRef = useRef(null);

  useEffect(() => {
    // Create timeline for smooth sequential animations
    const tl = gsap.timeline({ 
      defaults: { 
        duration: 0.8, 
        ease: "power2.out" 
      } 
    });

    // Initial animation for the container
    tl.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 }
    );

    // Logo animation
    tl.fromTo(
      logoRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      "-=0.3"
    );

    // Heading animation
    tl.fromTo(
      headingRef.current,
      { opacity: 0 },
      { opacity: 1 },
      "-=0.4"
    );

    // Subtitle animation
    tl.fromTo(
      subtitleRef.current,
      { opacity: 0 },
      { opacity: 1 },
      "-=0.6"
    );

    // Button animation
    tl.fromTo(
      buttonRef.current,
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1 },
      "-=0.4"
    );

    // Terms animation
    tl.fromTo(
      termsRef.current,
      { opacity: 0 },
      { opacity: 1 },
      "-=0.6"
    );
  }, []);

  const handleSignIn = () => {
    // Animate out before navigating
    gsap.to(containerRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      onComplete: () => router.push("/Homepage")
    });
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.loginContent} ref={containerRef}>
        <div className={styles.logoWrapper} ref={logoRef}>
          <Image
            src="/b_logo.svg"
            alt="XGaming"
            width={100}
            height={100}
            priority
          />
        </div>
        
        <h1 className={styles.loginHeading} ref={headingRef}>
          Welcome to XGaming
        </h1>
        
        <p className={styles.loginSubtitle} ref={subtitleRef}>
          Your personal insights assistant for games and analysis
        </p>
        
        <button 
          className={styles.googleButton}
          onClick={handleSignIn}
          ref={buttonRef}
        >
          <FcGoogle size={18} />
          <span>Continue with Google</span>
        </button>
        
        <div className={styles.termsText} ref={termsRef}>
          By continuing, you agree to our <a href="#" className={styles.link}>Terms of Service</a> and <a href="#" className={styles.link}>Privacy Policy</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;