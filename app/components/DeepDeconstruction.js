'use client';
import React, { useState } from 'react';
import styles from '../../styles/DeepDeconstruction.module.css';
import { BsArrowLeft } from 'react-icons/bs';
import { FaDownload } from 'react-icons/fa';

const DeepDeconstruction = ({ selectedGames, onBackClick }) => {
  // Get selected game objects
  const [maxGamesToCompare, setMaxGamesToCompare] = useState(4);
  
  // State for any additional games that might be added in the deep deconstruction view
  const [additionalGames, setAdditionalGames] = useState([]);
  
  // Combined games array (selected + additional)
  const allGames = [...selectedGames, ...additionalGames];
  
  const handleAddMore = () => {
    // This would typically open a modal or dropdown to select more games
    // For demo purposes, we'll add a placeholder game
    if (allGames.length < maxGamesToCompare) {
      const newGame = { 
        id: `additional-${Date.now()}`, 
        name: `Game ${String.fromCharCode(67 + additionalGames.length)}`, 
        studio: "Studio X" 
      };
      
      setAdditionalGames([...additionalGames, newGame]);
    }
  };

  return (
    <div className={styles.deepDeconstruction}>
      <button 
        className={styles.backButton}
        onClick={onBackClick}
      >
        <BsArrowLeft />
        Back
      </button>
      
      <h2>Deep Deconstruction</h2>
      
      <div className={styles.gameComparison}>
        <div className={styles.gameHeaders}>
          {allGames.map(game => (
            <div key={game.id} className={styles.gameColumn}>
              <h3>{game.name}</h3>
            </div>
          ))}
          
          {allGames.length < maxGamesToCompare && (
            <div className={styles.addGameColumn} onClick={handleAddMore}>
              <div className={styles.addMoreButton}>
                + Add Game
              </div>
            </div>
          )}
        </div>
        
        <div className={styles.aboutGames}>
          <h4>About the games</h4>
          <div className={styles.gameInfo}>
            {allGames.map(game => (
              <div key={game.id} className={styles.gameInfoCard}>
                {game.name}
              </div>
            ))}
          </div>
        </div>
        
        <div className={styles.metricsSection}>
          <h4>Metrics</h4>
          <div className={styles.metricRows}>
            <div className={styles.metricRow}>
              <div className={styles.metricLabel}>User Base</div>
              {allGames.map(game => (
                <div key={game.id} className={styles.metricValue}>
                  {Math.floor(Math.random() * 20 + 10)}M
                </div>
              ))}
            </div>
            
            <div className={styles.metricRow}>
              <div className={styles.metricLabel}>Growth</div>
              {allGames.map(game => (
                <div key={game.id} className={styles.metricValue}>
                  +{Math.floor(Math.random() * 10)}%
                </div>
              ))}
            </div>
            
            <div className={styles.metricRow}>
              <div className={styles.metricLabel}>Revenue</div>
              {allGames.map(game => (
                <div key={game.id} className={styles.metricValue}>
                  ${Math.floor(Math.random() * 90 + 10)}M
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className={styles.qualitativeSection}>
          <h4>Qualitative Analysis</h4>
          <div className={styles.analysisContent}>
            <p>Detailed qualitative analysis comparing the selected games would appear here, including gameplay mechanics, user engagement strategies, monetization approaches, and player retention tactics.</p>
          </div>
        </div>
      </div>
      
      <div className={styles.deconstructedFields}>
        <h4>Deconstructed Fields/Matrices</h4>
        <div className={styles.fieldsGrid}>
          <div className={styles.fieldCard}>Gameplay Loop</div>
          <div className={styles.fieldCard}>Monetization</div>
          <div className={styles.fieldCard}>Retention</div>
        </div>
      </div>
      
      <button className={styles.exportButton}>
        <FaDownload />
        Export Analysis
      </button>
    </div>
  );
};

export default DeepDeconstruction;