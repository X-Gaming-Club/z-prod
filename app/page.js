"use client";
import React, { useState, useRef } from "react";
import styles from "../styles/Page.module.css";
import Sidebar from "./components/Sidebar";
import { IoSend } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { BsGlobe } from "react-icons/bs";
import { AiOutlineFileSearch } from "react-icons/ai";
import ChatComponent from "./components/ChatComponent";

const Page = () => {
  const [inputValue, setInputValue] = useState("");
  const [firstQuery, setFirstQuery] = useState(true);
  const [initialQuery, setInitialQuery] = useState("");
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);

  // Focus input on load
  React.useEffect(() => {
    if (firstQuery) {
      inputRef.current?.focus();
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
    if (inputValue.trim() === "") return;
    
    // Save initial query to pass to chat component
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

  const handleFileChange = (e) => {
    // Handle file upload here
    console.log("File selected:", e.target.files);
    // You can implement file handling logic here
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
              <h1 className={styles.welcomeHeading}>What can I help with?</h1>

              <div className={styles.searchContainer}>
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
                      !inputValue.trim() ? styles.sendButtonDisabled : styles.sendButtonActive
                    }`}
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                  >
                    <IoSend />
                  </button>
                </div>

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

              <div className={styles.promptsGrid}>
                {suggestedPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    className={styles.promptButton}
                    onClick={() => handlePromptClick(prompt)}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <ChatComponent initialQuery={initialQuery} />
          )}
        </div>
      </main>
    </div>
  );
};

export default Page;