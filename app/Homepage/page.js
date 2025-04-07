"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "../../styles/Homepage.module.css";
import Sidebar from "../components/Sidebar";
import { IoSend } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { BsGlobe } from "react-icons/bs";
import { AiOutlineFileSearch } from "react-icons/ai";
import ChatComponent from "../components/ChatComponent";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

const Homepage = () => {
  const [inputValue, setInputValue] = useState("");
  const [firstQuery, setFirstQuery] = useState(true);
  const [initialQuery, setInitialQuery] = useState("");
  const [attachedFiles, setAttachedFiles] = useState([]);
  // Added search count tracking
  const [searchCount, setSearchCount] = useState(0);
  // Added state for login modal
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  const router = useRouter();
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  
  // Refs for GSAP animations
  const welcomeHeadingRef = useRef(null);
  const searchContainerRef = useRef(null);
  const promptsGridRef = useRef(null);
  const promptButtonsRef = useRef([]);

  // Original useEffect for input focus
  React.useEffect(() => {
    if (firstQuery) {
      inputRef.current?.focus();
    }
  }, [firstQuery]);
  
  // UseEffect for GSAP animations
  useEffect(() => {
    if (firstQuery) {
      // Create a GSAP timeline for sequenced animations
      const tl = gsap.timeline();
      
      // Animate welcome heading
      tl.fromTo(
        welcomeHeadingRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
      
      // Animate search container
      tl.fromTo(
        searchContainerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
        "-=0.4" // Start slightly before previous animation finishes
      );
      
      // Animate prompts grid
      tl.fromTo(
        promptsGridRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        "-=0.2"
      );
      
      // Animate each prompt button with staggered effect
      tl.fromTo(
        promptButtonsRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.4, 
          stagger: 0.1, // Each button starts 0.1s after the previous
          ease: "back.out(1.2)" // Slight overshoot for a bouncy effect
        },
        "-=0.3"
      );
    }
  }, [firstQuery]);

  const suggestedPrompts = [
    "Tell me about IT service providers in the cloud space",
    "What are the key financial metrics for SaaS companies?",
    "Explain recent cybersecurity trends",
    "Summarize the EV market growth in 2024",
  ];

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Updated to track search count and show login modal
  const handleSendMessage = () => {
    // Check if there's either text or attached file
    if (inputValue.trim() === "" && attachedFiles.length === 0) return;
    
    // Increment search count
    const newCount = searchCount + 1;
    setSearchCount(newCount);
    
    // Check if we should show login modal after 3 searches
    if (newCount >= 3 && !showLoginModal) {
      setShowLoginModal(true);
    } else {
      // Normal flow - proceed with chat
      setInitialQuery(inputValue);
      setFirstQuery(false);
    }
  };

  const handlePromptClick = (prompt) => {
    setInputValue(prompt);
    // Optional: automatically send the prompt
    // setTimeout(() => handleSendMessage(), 100);
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

  // Generate a unique ID for files
  const generateUniqueId = () => {
    return Date.now() + "-" + Math.random().toString(36).substring(2, 9);
  };

  // Updated to handle files properly
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      // Convert FileList to array and add to attachedFiles
      const newFiles = Array.from(e.target.files).map(file => ({
        id: generateUniqueId(),
        name: file.name,
        size: file.size,
        type: file.type,
        file: file // Store the actual file object
      }));
      
      setAttachedFiles(prev => [...prev, ...newFiles]);
    }
  };

  // New function to handle file removal
  const handleRemoveFile = (fileId) => {
    setAttachedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  // Function to format file size
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  // Handle search count update from ChatComponent
  const handleSearchCountUpdate = () => {
    const newCount = searchCount + 1;
    setSearchCount(newCount);
    if (newCount >= 3 && !showLoginModal) {
      setShowLoginModal(true);
    }
  };

  return (
    <div className={styles.container}>
      <Sidebar />
      <main
        className={`${styles.mainContent} ${
          !firstQuery ? styles.chatActive : ""
        }`}
      >
        <div className={styles.centerContent}>
          {firstQuery ? (
            <div className={styles.welcomeContainer}>
              <h1 className={styles.welcomeHeading} ref={welcomeHeadingRef}>What can I help with?</h1>

              <div className={styles.searchContainer} ref={searchContainerRef}>
                <div className={styles.inputWrapper}>
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Ask anything..."
                    className={styles.searchInput}
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
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

                {/* File attachment display area */}
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

                <div className={styles.actionButtons}>
                  <button
                    className={styles.actionButton}
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

                  <button className={styles.actionButton}>
                    <BsGlobe />
                    <span>Search</span>
                  </button>

                  <button className={styles.actionButton}>
                    <AiOutlineFileSearch />
                    <span>Deep research</span>
                  </button>
                </div>
              </div>

              <div className={styles.promptsGrid} ref={promptsGridRef}>
                {suggestedPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    className={styles.promptButton}
                    onClick={() => handlePromptClick(prompt)}
                    ref={(el) => (promptButtonsRef.current[index] = el)}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <ChatComponent 
              initialQuery={initialQuery} 
              initialFiles={attachedFiles} 
              onSearchCountUpdate={handleSearchCountUpdate}
            />
          )}
        </div>
      </main>

      {/* Login Modal */}
      {showLoginModal && (
        <div className={styles.loginModalOverlay}>
          <div className={styles.loginModalContent}>
            <h3 className={styles.loginModalTitle}>Create an Account to Continue</h3>
            <p className={styles.loginModalText}>
              You've reached the limit for guest searches. Please log in or create an account to continue using all features.
            </p>
            <div className={styles.loginModalButtons}>
            <button 
  className={styles.loginButton}
  onClick={() => setShowLoginModal(false)}
>
  <FcGoogle size={18} />
  <span>Continue with Google</span>
</button>
              <button 
                className={styles.cancelButton}
                onClick={() => setShowLoginModal(false)}
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;