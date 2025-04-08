'use client';
import React, { useState } from 'react';
import styles from '../../styles/CompAnalysis.module.css';
import Sidebar from '../components/Sidebar';
import { FaSearch, FaPlus, FaDownload } from 'react-icons/fa';
import { MdInsights } from 'react-icons/md';
import DeepDeconstruction from '../components/DeepDeconstruction';
import Header from '../components/Header';

const CompAnalysis = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudio, setSelectedStudio] = useState('all');
  const [selectedGames, setSelectedGames] = useState([]);
  const [activeSection, setActiveSection] = useState('all'); // all, trending, compare
  const [showDeepDeconstruction, setShowDeepDeconstruction] = useState(false);

  // Simple data for games
  const games = [
    { id: 1, name: 'Game A', studio: 'Studio 1', trending: true },
    { id: 2, name: 'Game B', studio: 'Studio 2', trending: true },
    { id: 3, name: 'Game C', studio: 'Studio 3', trending: false },
    { id: 4, name: 'Game D', studio: 'Studio 1', trending: false },
    { id: 5, name: 'Game E', studio: 'Studio 2', trending: true }
  ];
  
  // Get unique studios for the filter
  const studios = [...new Set(games.map(game => game.studio))];

  // Filter games based on active section and search query
  const filteredGames = games.filter(game => {
    const matchesSearch = searchQuery.trim() === '' || 
      game.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStudio = selectedStudio === 'all' || game.studio === selectedStudio;
    
    const matchesSection = 
      activeSection === 'all' || 
      (activeSection === 'trending' && game.trending) ||
      activeSection === 'compare';
    
    return matchesSearch && matchesStudio && matchesSection;
  });

  // Get selected game objects
  const selectedGameObjects = selectedGames.map(id => games.find(game => game.id === id));

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleGameSelection = (gameId) => {
    if (selectedGames.includes(gameId)) {
      setSelectedGames(selectedGames.filter(id => id !== gameId));
    } else {
      // Limit to 2 games for comparison in main view
      if (selectedGames.length >= 2) {
        return;
      }
      setSelectedGames([...selectedGames, gameId]);
    }
  };

  const handleDeepDeconstruction = () => {
    setShowDeepDeconstruction(true);
  };

  const handleBackToMain = () => {
    setShowDeepDeconstruction(false);
  };

  const renderMainScreen = () => {
    return (
      <>
        {/* Search and Studio filter */}
        <div className={styles.searchContainer}>
          <div className={styles.searchInput}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          
          <div className={styles.studioDropdown}>
            <select 
              value={selectedStudio}
              onChange={(e) => setSelectedStudio(e.target.value)}
            >
              <option value="all">Studio</option>
              {studios.map(studio => (
                <option key={studio} value={studio}>{studio}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className={styles.mainContent}>
          {/* Left Section */}
          <div className={styles.leftSection}>
            <button className={styles.addButton}>
              <FaPlus />
            </button>
            
            <div className={styles.gameCategories}>
              <div className={styles.categorySection}>
                <h3>All Games</h3>
                <div className={styles.gameList}>
                  {filteredGames.map(game => (
                    <div 
                      key={game.id} 
                      className={`${styles.gameCard} ${selectedGames.includes(game.id) ? styles.selected : ''}`}
                      onClick={() => toggleGameSelection(game.id)}
                    >
                      {game.name}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className={styles.categorySection}>
                <h3>Trending</h3>
                <div className={styles.gameList}>
                  {games
                    .filter(game => game.trending)
                    .map(game => (
                      <div 
                        key={game.id} 
                        className={`${styles.gameCard} ${selectedGames.includes(game.id) ? styles.selected : ''}`}
                        onClick={() => toggleGameSelection(game.id)}
                      >
                        {game.name}
                      </div>
                    ))
                  }
                </div>
              </div>
              
              <div className={styles.categorySection}>
                <h3>Compare</h3>
                <div className={styles.gameList}>
                  {selectedGameObjects.length > 0 ? (
                    selectedGameObjects.map(game => (
                      <div 
                        key={game.id} 
                        className={`${styles.gameCard} ${styles.selected}`}
                        onClick={() => toggleGameSelection(game.id)}
                      >
                        {game.name}
                      </div>
                    ))
                  ) : (
                    <div className={styles.emptyState}>Select games to compare</div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Section - Only visible when games are selected */}
          {selectedGames.length > 0 && (
            <div className={styles.rightSection}>
              <h2>Compare Shortlisted</h2>
              
              <div className={styles.selectedGames}>
                {selectedGameObjects.map(game => (
                  <div key={game.id} className={styles.selectedGame}>
                    {game.name}
                  </div>
                ))}
              </div>
              
              <div className={styles.comparisonContent}>
                <div className={styles.briefDeconstruction}>
                  <p>Brief deconstruction about {selectedGameObjects.map(g => g.name).join(' and ')}.</p>
                  <p>This section provides a high-level comparison of the selected games.</p>
                </div>
                
                <button 
                  className={styles.deepDeconstructButton}
                  onClick={handleDeepDeconstruction}
                >
                  <MdInsights className={styles.buttonIcon} />
                  Deep Deconstruction
                </button>
              </div>
              
              <button className={styles.exportButton}>
                <FaDownload />
                Export
              </button>
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <div className={styles.container}>
      <Sidebar />
      <Header />
      <div className={styles.mainContainer}>
        {showDeepDeconstruction ? (
          <DeepDeconstruction 
            selectedGames={selectedGameObjects} 
            onBackClick={handleBackToMain} 
          />
        ) : (
          renderMainScreen()
        )}
      </div>
    </div>
  );
};

export default CompAnalysis;