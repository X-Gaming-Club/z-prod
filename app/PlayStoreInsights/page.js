'use client'
import React, { useState } from 'react';
import styles from '../../styles/PlayStoreInsights.module.css';
import Sidebar from '../components/Sidebar';
import { FaSearch, FaStar, FaFilter, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const PlayStoreInsights = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    genre: [],
    platform: [],
    rating: [],
    price: []
  });
  const [activePage, setActivePage] = useState(1);

  // Dummy data for PlayStoreInsights
  const PlayStoreInsights = [
    {
      id: 1,
      title: 'Celestial Odyssey',
      company: 'Starlight Studios',
      rating: 4.8,
      tags: ['RPG', 'Open World', 'Fantasy'],
      description: 'Embark on an epic journey through a vast fantasy world with stunning visuals and deep character progression.',
      price: '$59.99',
      imageUrl: '/api/placeholder/400/240',
    },
    {
      id: 2,
      title: 'Neon Drift',
      company: 'Velocity PlayStoreInsights',
      rating: 4.5,
      tags: ['Racing', 'Arcade', 'Multiplayer'],
      description: 'Experience high-octane racing in futuristic neon-lit cities with cutting-edge graphics and precise controls.',
      price: '$39.99',
      imageUrl: '/api/placeholder/400/240',
    },
    {
      id: 3,
      title: 'Shadow Protocol',
      company: 'Phantom Interactive',
      rating: 4.7,
      tags: ['Stealth', 'Action', 'Story-Rich'],
      description: 'Infiltrate enemy bases, eliminate targets, and uncover a global conspiracy in this immersive stealth action game.',
      price: '$49.99',
      imageUrl: '/api/placeholder/400/240',
    },
    {
      id: 4,
      title: 'Cosmic Defense',
      company: 'Nebula Entertainment',
      rating: 4.3,
      tags: ['Strategy', 'Sci-Fi', 'Tower Defense'],
      description: 'Protect your space colony from alien invasions by building advanced defense systems and managing resources.',
      price: '$29.99',
      imageUrl: '/api/placeholder/400/240',
    },
    {
      id: 5,
      title: 'Wild Frontier',
      company: 'Prairie Studios',
      rating: 4.6,
      tags: ['Survival', 'Open World', 'Crafting'],
      description: 'Survive in a harsh wilderness, build shelters, hunt for food, and discover the secrets of a mysterious land.',
      price: '$44.99',
      imageUrl: '/api/placeholder/400/240',
    },
    {
      id: 6,
      title: 'Code Warriors',
      company: 'Logic PlayStoreInsights',
      rating: 4.4,
      tags: ['Puzzle', 'Educational', 'Programming'],
      description: 'Learn programming concepts through engaging puzzles and challenges in a vibrant digital world.',
      price: '$19.99',
      imageUrl: '/api/placeholder/400/240',
    }
  ];

  // Filter categories
  const filterOptions = {
    genre: ['Action', 'Adventure', 'RPG', 'Strategy', 'Simulation', 'Sports', 'Racing', 'Puzzle'],
    platform: ['PC', 'PlayStation', 'Xbox', 'Nintendo Switch', 'Mobile'],
    rating: ['5 Stars', '4+ Stars', '3+ Stars'],
    price: ['Under $20', '$20 - $40', '$40 - $60', 'Over $60', 'Free to Play']
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (category, option) => {
    setActiveFilters(prev => {
      const newFilters = { ...prev };
      if (newFilters[category].includes(option)) {
        newFilters[category] = newFilters[category].filter(item => item !== option);
      } else {
        newFilters[category] = [...newFilters[category], option];
      }
      return newFilters;
    });
  };

  const clearFilters = () => {
    setActiveFilters({
      genre: [],
      platform: [],
      rating: [],
      price: []
    });
  };

  const handlePageChange = (page) => {
    setActivePage(page);
    // Here you would fetch new data from backend for the selected page
  };

  return (
    <div className={styles.pageContainer}>
      <Sidebar />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Game Library</h1>
          <p className={styles.subtitle}>
            Discover and explore our collection of carefully curated PlayStoreInsights across various genres and platforms.
          </p>
        </div>

        <div className={styles.searchSection}>
          <div className={styles.searchBar}>
            <input 
              type="text" 
              placeholder="Search for PlayStoreInsights, genres, or companies" 
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button className={styles.searchButton}>
              <FaSearch />
              <span>Search</span>
            </button>
          </div>
        </div>

        <div className={styles.filtersSection}>
          <div className={styles.filtersHeader}>
            <h2 className={styles.filtersTitle}>
              <FaFilter style={{ marginRight: '8px' }} />
              Filters
            </h2>
            <button className={styles.clearFiltersButton} onClick={clearFilters}>
              Clear all filters
            </button>
          </div>
          <div className={styles.filterGroups}>
            {Object.entries(filterOptions).map(([category, options]) => (
              <div key={category} className={styles.filterGroup}>
                <h3 className={styles.filterGroupTitle}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </h3>
                <div className={styles.filterOptions}>
                  {options.map(option => (
                    <div key={option} className={styles.filterOption}>
                      <input 
                        type="checkbox"
                        id={`${category}-${option}`}
                        checked={activeFilters[category].includes(option)}
                        onChange={() => handleFilterChange(category, option)}
                      />
                      <label htmlFor={`${category}-${option}`}>{option}</label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.content}>
          {PlayStoreInsights.map(game => (
            <div key={game.id} className={styles.gameCard}>
              <div className={styles.gameImageContainer}>
                <img 
                  src={game.imageUrl} 
                  alt={game.title} 
                  className={styles.gameImage}
                />
              </div>
              <div className={styles.gameDetails}>
                <div className={styles.gameHeader}>
                  <div className={styles.gameInfo}>
                    <h3>{game.title}</h3>
                    <div className={styles.gameCompany}>{game.company}</div>
                  </div>
                  <div className={styles.gameRating}>
                    <FaStar />
                    <span>{game.rating}</span>
                  </div>
                </div>
                <div className={styles.gameTags}>
                  {game.tags.map((tag, index) => (
                    <span key={index} className={styles.gameTag}>{tag}</span>
                  ))}
                </div>
                <p className={styles.gameDescription}>{game.description}</p>
                <div className={styles.gameFooter}>
                  <div className={styles.gamePrice}>{game.price}</div>
                  <button className={styles.gameButton}>View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.paginationSection}>
          <button 
            className={styles.paginationButton}
            onClick={() => handlePageChange(activePage - 1)}
            disabled={activePage === 1}
          >
            <FaChevronLeft />
          </button>
          {[1, 2, 3, 4, 5].map(page => (
            <button 
              key={page} 
              className={`${styles.paginationButton} ${activePage === page ? styles.paginationButtonActive : ''}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
          <button 
            className={styles.paginationButton}
            onClick={() => handlePageChange(activePage + 1)}
            disabled={activePage === 5}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayStoreInsights;