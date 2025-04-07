"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "../../styles/Homepage.module.css";
import Sidebar from "../components/Sidebar";
import { IoSend } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io"; // Added for file removal icon
import { BsGlobe } from "react-icons/bs";
import { AiOutlineFileSearch } from "react-icons/ai";
import ChatComponent from "../components/ChatComponent";
import gsap from "gsap";

const Homepage = () => {
  const [inputValue, setInputValue] = useState("");
  const [firstQuery, setFirstQuery] = useState(true);
  const [initialQuery, setInitialQuery] = useState("");
  // New state for attached files
  const [attachedFiles, setAttachedFiles] = useState([]);
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

  const handleSendMessage = () => {
    // Modified to check for either text or attached files
    if (inputValue.trim() === "" && attachedFiles.length === 0) return;
    
    // Save initial query and files to pass to chat component
    setInitialQuery(inputValue);
    
    // Change to chat view
    setFirstQuery(false);
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
            <ChatComponent initialQuery={initialQuery} initialFiles={attachedFiles} />
          )}
        </div>
      </main>
    </div>
  );
};

export default Homepage;