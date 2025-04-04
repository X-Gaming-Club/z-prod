'use client';

import React from 'react';
import styles from '../styles/Page.module.css';
import Sidebar from './components/Sidebar';

const Page = () => {
  const suggestedPrompts = [
    "22 Insurance rates",
    "Our work with IT services",
    "Cybersecurity experts at the firm",
    "EV market growth"
  ];

  return (
    <div className={styles.container}>
      <Sidebar />
      
      <main className={styles.mainContent}>
        <div className={styles.centerContent}>
          <div className={styles.header}>
            <h1 className={styles.title}>Kenley</h1>
            <h2 className={styles.subtitle}>Insights at Scale</h2>
          </div>
          
          <div className={styles.searchContainer}>
            <div className={styles.inputWrapper}>
              <input 
                type="text" 
                placeholder="Find answers" 
                className={styles.searchInput} 
              />
              
              <div className={styles.inputOptions}>
                <div className={styles.contextSelector}>
                  <span className={styles.contextIcon}>📊</span>
                  <span>Kenley context</span>
                  <span className={styles.dropdownIcon}>▼</span>
                </div>
                
                <div className={styles.divider}></div>
                
                <div className={styles.defaultSelector}>
                  <span>Default</span>
                  <span className={styles.dropdownIcon}>▼</span>
                </div>
                
                <button className={styles.sendButton}>
                  <span className={styles.sendIcon}>⬆️</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className={styles.promptsContainer}>
            {suggestedPrompts.map((prompt, index) => (
              <button key={index} className={styles.promptButton}>
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;