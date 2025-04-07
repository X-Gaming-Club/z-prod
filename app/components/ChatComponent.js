'use client';
import React, { useState, useRef, useEffect } from "react";
import { IoSend } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { FiEdit2, FiCopy, FiCheck } from "react-icons/fi"; // Added icons for edit and copy functionality
import styles from "../../styles/ChatComponent.module.css";

// Added onSearchCountUpdate to props
const ChatComponent = ({ initialQuery, initialFiles = [], onSearchCountUpdate }) => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState(initialFiles || []);
  const [editingMessageId, setEditingMessageId] = useState(null); // Track which message is being edited
  const [editText, setEditText] = useState(""); // Store edited text
  const [copiedMessageId, setCopiedMessageId] = useState(null); // Track which message was copied
  
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const editInputRef = useRef(null);

  // Initialize with the first query when component mounts
  useEffect(() => {
    if (initialQuery && initialQuery.trim() !== "") {
      // If there are initial files, include them in the first message
      handleInitialQuery(initialQuery, initialFiles);
    }
  }, [initialQuery, initialFiles]);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus on edit input when editing starts
  useEffect(() => {
    if (editingMessageId && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingMessageId]);

  // Clear copied message status after timeout
  useEffect(() => {
    if (copiedMessageId) {
      const timer = setTimeout(() => {
        setCopiedMessageId(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copiedMessageId]);

  // Generate a unique ID for messages
  const generateUniqueId = () => {
    return Date.now() + "-" + Math.random().toString(36).substring(2, 9);
  };

  const handleInitialQuery = (query, files = []) => {
    // Update search count if callback provided
    if (onSearchCountUpdate) {
      onSearchCountUpdate();
    }
    
    // Add user message with a unique ID
    const userMessage = {
      id: generateUniqueId(),
      sender: "user",
      text: query,
      files: files.length > 0 ? [...files] : [], // Include attached files if any
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

  // Handle editing message text
  const handleEditInputChange = (e) => {
    setEditText(e.target.value);
    
    // Dynamically adjust textarea height
    e.target.style.height = "auto";
    e.target.style.height = Math.min(120, e.target.scrollHeight) + "px";
  };

  // Start editing a message
  const handleStartEditing = (message) => {
    setEditingMessageId(message.id);
    setEditText(message.text);
  };

  // Save edited message
  const handleSaveEdit = () => {
    if (editText.trim() === "") return;

    // Update the edited message
    setMessages(prev => prev.map(msg => {
      if (msg.id === editingMessageId) {
        // If we're editing a message that previously got a response, mark the response as outdated
        const messageIndex = prev.findIndex(m => m.id === editingMessageId);
        const nextMessage = prev[messageIndex + 1];
        
        // If the next message is a bot response to this message, mark it
        if (nextMessage && nextMessage.sender === "bot") {
          return { ...msg, text: editText, edited: true, hasOutdatedResponse: true };
        }
        
        return { ...msg, text: editText, edited: true };
      }
      return msg;
    }));

    // Find the edited message and its position
    const messageIndex = messages.findIndex(m => m.id === editingMessageId);
    const editedMessage = messages[messageIndex];
    const nextMessage = messages[messageIndex + 1];
    
    // If the next message is a bot response to this message, replace it with a new response
    if (nextMessage && nextMessage.sender === "bot") {
      setIsThinking(true);
      
      // Remove the old response
      const newMessages = [...messages];
      newMessages.splice(messageIndex + 1, 1);
      setMessages(newMessages);
      
      // Generate a new response
      setTimeout(() => {
        const botResponse = {
          id: generateUniqueId(),
          sender: "bot",
          text: simulateBotResponse(editText),
          timestamp: new Date().toISOString(),
        };

        setMessages(prev => [
          ...prev.slice(0, messageIndex + 1),
          botResponse,
          ...prev.slice(messageIndex + 1)
        ]);
        setIsThinking(false);
      }, 1200);
    }
    
    // Exit edit mode
    setEditingMessageId(null);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingMessageId(null);
  };

  // Copy message text to clipboard
  const handleCopyMessage = (messageId, text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedMessageId(messageId);
    });
  };

  const handleSendMessage = () => {
    // Check if there's either text or files to send
    if (inputValue.trim() === "" && attachedFiles.length === 0) return;

    // Update search count if callback provided
    if (onSearchCountUpdate) {
      onSearchCountUpdate();
    }

    // Create message text including file info if there are any
    let messageText = inputValue.trim();
    
    // Add user message with a unique ID
    const userMessage = {
      id: generateUniqueId(),
      sender: "user",
      text: messageText,
      files: attachedFiles.length > 0 ? [...attachedFiles] : [], // Include attached files in the message
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsThinking(true);
    
    // Clear attached files after sending
    setAttachedFiles([]);
    
    // Reset textarea height
    if (document.querySelector(`.${styles.chatInput}`)) {
      document.querySelector(`.${styles.chatInput}`).style.height = "auto";
    }

    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponse = {
        id: generateUniqueId(),
        sender: "bot",
        text: simulateBotResponse(messageText),
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

  // Handle enter key for edit input
  const handleEditKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSaveEdit();
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current.click();
  };

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

  // Function to format file size
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
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
          </div>
        </div>

        {messages.map((message) => (
          <div
            key={message.id}
            className={`${styles.message} ${
              message.sender === "user" ? styles.userMessage : ""
            } ${message.hasOutdatedResponse ? styles.outdatedMessage : ""}`}
          >
            <div className={styles.messageContent}>
              {/* Show edit input if this message is being edited */}
              {editingMessageId === message.id ? (
                <div className={styles.editContainer}>
                  <textarea
                    ref={editInputRef}
                    className={styles.editInput}
                    value={editText}
                    onChange={handleEditInputChange}
                    onKeyDown={handleEditKeyPress}
                  />
                  <div className={styles.editActions}>
                    <button 
                      className={styles.editActionButton} 
                      onClick={handleSaveEdit}
                      aria-label="Save edit"
                    >
                      <FiCheck />
                    </button>
                    <button 
                      className={styles.editActionButton} 
                      onClick={handleCancelEdit}
                      aria-label="Cancel edit"
                    >
                      <IoMdClose />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className={styles.messageText}>
                    {message.text}
                    
                    {/* Display files if there are any */}
                    {message.files && message.files.length > 0 && (
                      <div className={styles.messageFiles}>
                        {message.files.map(file => (
                          <div key={file.id} className={styles.fileAttachment}>
                            <span className={styles.fileName}>{file.name}</span>
                            <span className={styles.fileSize}>{formatFileSize(file.size)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Only show action buttons for user messages */}
                  {message.sender === "user" && (
                    <div className={styles.messageActions}>
                      <button 
                        className={styles.actionButton} 
                        onClick={() => handleStartEditing(message)}
                        aria-label="Edit message"
                      >
                        <FiEdit2 size={14} />
                      </button>
                      <button 
                        className={styles.actionButton} 
                        onClick={() => handleCopyMessage(message.id, message.text)}
                        aria-label="Copy message"
                      >
                        {copiedMessageId === message.id ? (
                          <FiCheck size={14} className={styles.copiedIcon} />
                        ) : (
                          <FiCopy size={14} />
                        )}
                      </button>
                    </div>
                  )}
                </>
              )}
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
              (inputValue.trim() || attachedFiles.length > 0) ? styles.sendButtonActive : styles.sendButtonDisabled
            }`}
            onClick={handleSendMessage}
            disabled={!inputValue.trim() && attachedFiles.length === 0}
          >
            <IoSend />
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatComponent;