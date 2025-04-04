'use client';
import React, { useState, useRef, useEffect } from "react";
import { IoSend } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import styles from "../../styles/ChatComponent.module.css";

const ChatComponent = ({ initialQuery }) => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Initialize with the first query when component mounts
  useEffect(() => {
    if (initialQuery && initialQuery.trim() !== "") {
      handleInitialQuery(initialQuery);
    }
  }, [initialQuery]);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Generate a unique ID for messages
  const generateUniqueId = () => {
    return Date.now() + "-" + Math.random().toString(36).substring(2, 9);
  };

  const handleInitialQuery = (query) => {
    // Add user message with a unique ID
    const userMessage = {
      id: generateUniqueId(),
      sender: "user",
      text: query,
      timestamp: new Date().toISOString(),
    };

    setMessages([userMessage]);
    setIsThinking(true);

    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponse = {
        id: generateUniqueId(),
        sender: "bot",
        text: simulateBotResponse(query),
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsThinking(false);
    }, 1200);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    
    // Dynamically adjust textarea height
    e.target.style.height = "auto";
    e.target.style.height = Math.min(120, e.target.scrollHeight) + "px";
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    // Add user message with a unique ID
    const userMessage = {
      id: generateUniqueId(),
      sender: "user",
      text: inputValue,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsThinking(true);
    
    // Reset textarea height
    if (document.querySelector(`.${styles.chatInput}`)) {
      document.querySelector(`.${styles.chatInput}`).style.height = "auto";
    }

    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponse = {
        id: generateUniqueId(),
        sender: "bot",
        text: simulateBotResponse(inputValue),
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsThinking(false);
    }, 1200);
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

  // Simple response generator (in real application, this would call the backend API)
  const simulateBotResponse = (query) => {
    // Handle empty or very short queries
    if (query.trim().length < 3) {
      return "I don't have specific information about that topic in my database. Could you try asking about our work with IT services, financial metrics for SaaS companies, cybersecurity trends, or EV market growth?";
    }
    
    const responses = {
      "it service":
        "Based on our database, we've worked with several IT service providers in the cloud space. Notable projects include:\n\n1. Project Horizon (2023-2024): We advised RetailFlow Systems during its acquisition of SkyPilot Technologies, which specializes in Amazon seller tools.\n\n2. Project Atlas (2023-2024): We assisted Aurora Partners in evaluating TeraGuard, a cloud and IT service provider focused on security solutions.\n\nWould you like more specific details about any of these projects?",
      "financial metrics":
        "Key financial metrics for SaaS companies typically include:\n\n• Annual Recurring Revenue (ARR)\n• Monthly Recurring Revenue (MRR)\n• Customer Acquisition Cost (CAC)\n• Lifetime Value (LTV)\n• Churn Rate\n• Net Revenue Retention\n• Gross Margin\n• Rule of 40 (Growth Rate + Profit Margin)\n\nBased on our analysis of the sector, top-performing SaaS companies in 2024 are showing Net Revenue Retention above 120% and CAC payback periods under 12 months.",
      cybersecurity:
        "Recent cybersecurity trends observed in our projects include:\n\n1. Increased adoption of Zero Trust architectures\n2. Rise in AI-powered threat detection systems\n3. Growing emphasis on supply chain security following several high-profile breaches\n4. Expansion of security operations centers (SOCs) with advanced automation\n5. Heightened regulatory focus on data protection and breach disclosure\n\nOur Project Orion with HarborGate Investments specifically focused on acquisition targets in the security space that address these trends.",
      "ev market":
        "The EV market has shown significant growth in 2024, with global electric vehicle sales increasing by approximately 35% year-over-year. Key developments include:\n\n• China remains the largest market, but European countries are showing accelerated adoption rates\n• Battery technology improvements have reduced costs by nearly 15% while extending range\n• Charging infrastructure has expanded by 40% in major markets\n• Several traditional automakers have announced plans to phase out combustion engine vehicles by 2030\n\nWould you like me to provide more specific data on particular regions or manufacturers?",
    };

    // Find which key phrase is in the query
    for (const [key, response] of Object.entries(responses)) {
      if (query.toLowerCase().includes(key)) {
        return response;
      }
    }

    // Default response
    return "I don't have specific information about that topic in my database. Could you try asking about our work with IT services, financial metrics for SaaS companies, cybersecurity trends, or EV market growth?";
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <>
      <div className={styles.chatContainer}>
        <div className={styles.message}>
          <div className={styles.messageContent}>
            <div className={styles.messageText}>
              Hello! I'm Kenley, your data insights assistant. How can I
              help you today?
            </div>
            <div className={styles.messageTimestamp}>
              {formatTime(new Date().toISOString())}
            </div>
          </div>
        </div>

        {messages.map((message) => (
          <div
            key={message.id}
            className={`${styles.message} ${
              message.sender === "user" ? styles.userMessage : ""
            }`}
          >
            <div className={styles.messageContent}>
              <div className={styles.messageText}>{message.text}</div>
              <div className={styles.messageTimestamp}>
                {formatTime(message.timestamp)}
              </div>
            </div>
          </div>
        ))}

        {isThinking && (
          <div className={styles.message}>
            <div className={styles.messageContent}>
              <div className={styles.thinkingIndicator}>
                <span className={styles.thinkingDot}></span>
                <span className={styles.thinkingDot}></span>
                <span className={styles.thinkingDot}></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className={styles.inputContainer}>
        <div className={styles.inputControlsWrapper}>
          <div className={styles.inputWrapper}>
            <textarea
              placeholder="Ask a follow-up question..."
              className={styles.chatInput}
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              rows={1}
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
          </div>

          <button
            className={`${styles.sendButton} ${
              inputValue.trim() ? styles.sendButtonActive : styles.sendButtonDisabled
            }`}
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
          >
            <IoSend />
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatComponent;