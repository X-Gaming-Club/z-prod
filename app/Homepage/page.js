'use client';
import React, { useState, useRef, useEffect } from "react";
import styles from "../../styles/Homepage.module.css";
import Sidebar from "../components/Sidebar";
import { IoSend } from "react-icons/io5";
import { FaPlus, FaGamepad, FaChartLine, FaShieldAlt, FaCloudDownloadAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { BsGlobe } from "react-icons/bs";
import { AiOutlineFileSearch } from "react-icons/ai";
import ChatComponent from "../components/ChatComponent";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

// ADDED: Import the LoginModal component
import LoginModal from "../components/LoginModal";
import Header from "../components/Header";

const Homepage = () => {
  const [inputValue, setInputValue] = useState("");
  const [firstQuery, setFirstQuery] = useState(true);
  const [initialQuery, setInitialQuery] = useState("");
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [searchCount, setSearchCount] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [expandedFeature, setExpandedFeature] = useState(null);
  const [hasAttemptedLogin, setHasAttemptedLogin] = useState(false);

  const router = useRouter();
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  
  const welcomeHeadingRef = useRef(null);
  const searchContainerRef = useRef(null);
  const featuresGridRef = useRef(null);
  const featureButtonsRef = useRef([]);

  React.useEffect(() => {
    if (firstQuery) {
      inputRef.current?.focus();
    }
  }, [firstQuery]);
  
  useEffect(() => {
    if (firstQuery) {
      const tl = gsap.timeline();
      
      tl.fromTo(
        welcomeHeadingRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
      
      tl.fromTo(
        searchContainerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
        "-=0.4"
      );
      
      tl.fromTo(
        featuresGridRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        "-=0.2"
      );
      
      tl.fromTo(
        featureButtonsRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.4, 
          stagger: 0.1,
          ease: "back.out(1.2)"
        },
        "-=0.3"
      );
    }
  }, [firstQuery]);

  const xGamingFeatures = [
    {
      icon: <FaGamepad />,
      title: "Game Discovery",
      description: "Explore curated game recommendations tailored to your preferences.",
      fullDescription: "Our advanced algorithm analyzes your gaming history, play style, and interests to suggest the most engaging games across multiple platforms."
    },
    {
      icon: <FaChartLine />,
      title: "Performance Insights",
      description: "Track and optimize your gaming performance with detailed analytics.",
      fullDescription: "Get comprehensive insights into your gaming stats, skill progression, and comparative performance across different games and genres."
    },
    {
      icon: <FaShieldAlt />,
      title: "Community Safety",
      description: "Secure and positive gaming environment with advanced monitoring.",
      fullDescription: "Our robust safety features protect you from toxic behavior, provide content filters, and ensure a healthy, inclusive gaming community."
    },
    {
      icon: <FaCloudDownloadAlt />,
      title: "Cross-Platform Integration",
      description: "Seamless gaming experience across multiple devices and platforms.",
      fullDescription: "Sync your game progress, achievements, and preferences across PC, mobile, and console platforms with our universal gaming ecosystem."
    }
  ];

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === "" && attachedFiles.length === 0) return;
    
    // Increment search count
    const newCount = searchCount + 1;
    setSearchCount(newCount);
    
    // Check if search count exceeds limit and show login modal
    if (newCount >= 3 && !showLoginModal && !hasAttemptedLogin) {
      setShowLoginModal(true);
    } else {
      setInitialQuery(inputValue);
      setFirstQuery(false);
    }
  };

  // ADDED: Function to update search count from ChatComponent
  const handleSearchCountUpdate = () => {
    const newCount = searchCount + 1;
    setSearchCount(newCount);
    
    // Check if exceeded limit
    if (newCount >= 3 && !showLoginModal && !hasAttemptedLogin) {
      setShowLoginModal(true);
    }
  };

  const handleFeatureToggle = (index) => {
    setExpandedFeature(expandedFeature === index ? null : index);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map(file => ({
        id: Date.now() + "-" + Math.random().toString(36).substring(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        file: file
      }));
      
      setAttachedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleRemoveFile = (fileId) => {
    setAttachedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  // ADDED: Function to close the login modal
  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  // Add this new function to handle Google sign in and prevent modal from showing again
  const handleGoogleSignIn = () => {
    setShowLoginModal(false);
    // Set a flag to prevent modal from showing again in this session
    localStorage.setItem('loginPromptShown', 'true');
    // You could also reset the search count if you want to let them keep searching
    setSearchCount(0);
  };

  return (
    <div className={styles.container}>
    <Header /> {/* Full-width header */}
    <div className={styles.contentWrapper}>
      <Sidebar /> {/* Sidebar positioned below header */}
      <main
        className={`${styles.mainContent} ${
          !firstQuery ? styles.chatActive : ""
        }`}
      >
        <div className={styles.centerContent}>
          {firstQuery ? (
            <div className={styles.welcomeContainer}>
              <h1 className={styles.welcomeHeading} ref={welcomeHeadingRef}>
              What can we help with?
              </h1>

              <div className={styles.searchContainer} ref={searchContainerRef}>
                {attachedFiles.length > 0 && (
                  <div className={styles.attachmentsContainer}>
                    {attachedFiles.map(file => (
                      <div key={file.id} className={styles.attachmentItem}>
                        <span className={styles.attachmentName}>{file.name}</span>
                        <span className={styles.attachmentSize}>{formatFileSize(file.size)}</span>
                        <button 
                          className={styles.removeAttachmentButton}
                          onClick={() => handleRemoveFile(file.id)}
                        >
                          <IoMdClose />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className={styles.inputWrapper}>
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="What would you like to explore?"
                    className={styles.searchInput}
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                  />
                  <button
                    className={styles.uploadButton}
                    onClick={handleFileUpload}
                  >
                    <FaPlus />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                    multiple
                  />
                  <button
                    className={`${styles.sendButton} ${
                      (!inputValue.trim() && attachedFiles.length === 0) ? styles.sendButtonDisabled : styles.sendButtonActive
                    }`}
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() && attachedFiles.length === 0}
                  >
                    <IoSend />
                  </button>
                </div>

                <div className={styles.featuresGrid} ref={featuresGridRef}>
                  {xGamingFeatures.map((feature, index) => (
                    <div 
                      key={index} 
                      className={`${styles.featureButton} ${
                        expandedFeature === index ? styles.expanded : ''
                      }`}
                      ref={(el) => (featureButtonsRef.current[index] = el)}
                      onClick={() => handleFeatureToggle(index)}
                    >
                      <div className={styles.featureHeader}>
                        <span className={styles.featureIcon}>{feature.icon}</span>
                        <h3 className={styles.featureTitle}>{feature.title}</h3>
                      </div>
                      <p className={styles.featureDescription}>
                        {expandedFeature === index 
                          ? feature.fullDescription 
                          : feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            // UPDATED: Added onSearchCountUpdate prop to ChatComponent
            <ChatComponent 
              initialQuery={initialQuery} 
              initialFiles={attachedFiles}
              onSearchCountUpdate={handleSearchCountUpdate}
            />
          )}
        </div>
      </main>

      {/* REPLACED: Removed inline modal and using the LoginModal component */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={handleCloseLoginModal} 
        onGoogleSignIn={() => {
          setShowLoginModal(false);
          setHasAttemptedLogin(true); // Set flag to prevent showing modal again
        }}
      />
    </div>
    </div>
  );
};

export default Homepage;