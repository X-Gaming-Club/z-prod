'use client'
import React, { useState } from 'react';
import styles from '../../styles/PlayStoreInsights.module.css';
import Sidebar from '../components/Sidebar';
import { BsStarFill, BsStarHalf, BsDownload, BsFillBarChartFill } from 'react-icons/bs';
import { FaChartLine, FaFilter, FaSearch, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { BiMobile } from 'react-icons/bi';
import Header from '../components/Header';

const PlayStoreInsights = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedReview, setExpandedReview] = useState(null);
  
  // Dummy app metrics data
  const appMetrics = {
    rating: 4.2,
    downloads: '5.4M',
    activeUsers: '1.2M',
    ranking: '#4 in Games',
    updates: '3 days ago'
  };
  
  // Dummy review data
  const reviews = [
    {
      id: 1,
      author: 'Alex M.',
      rating: 5,
      date: 'Oct 12, 2024',
      content: 'Fantastic game! The graphics are stunning and gameplay is smooth on my Pixel 7. Love the new character customization options in the latest update.',
      helpful: 87,
      device: 'Pixel 7',
      version: '2.4.1',
      sentiment: 'positive'
    },
    {
      id: 2,
      author: 'Jordan T.',
      rating: 2,
      date: 'Oct 10, 2024',
      content: 'Game crashes every time I try to enter the battle mode. Been an issue for weeks now. Please fix this ASAP. Otherwise the game is good but completely unplayable for me right now.',
      helpful: 132,
      device: 'Samsung Galaxy S22',
      version: '2.4.0',
      sentiment: 'negative'
    },
    {
      id: 3,
      author: 'Sam K.',
      rating: 4,
      date: 'Oct 9, 2024',
      content: 'Really enjoy this game! Would give 5 stars but the ads are getting a bit excessive. The new levels are challenging and fun though.',
      helpful: 46,
      device: 'iPhone 15',
      version: '2.4.1',
      sentiment: 'mixed'
    }
  ];
  
  // Dummy competitor data
  const competitors = [
    { id: 1, name: 'Epic Adventure RPG', rating: 4.6, downloads: '8.2M', change: '+0.2' },
    { id: 2, name: 'Fantasy Quest', rating: 4.0, downloads: '3.7M', change: '-0.1' },
    { id: 3, name: 'Dungeon Crawler', rating: 4.4, downloads: '6.1M', change: '+0.3' }
  ];
  
  // Dummy issues data
  const issues = [
    { id: 1, issue: 'App crashes in battle mode', count: 132, change: '+24%', severity: 'high' },
    { id: 2, issue: 'Excessive advertisements', count: 87, change: '+12%', severity: 'medium' },
    { id: 3, issue: 'Slow loading times', count: 64, change: '-5%', severity: 'medium' },
    { id: 4, issue: 'Battery drain', count: 41, change: '+8%', severity: 'low' }
  ];

  // Toggle review expansion
  const toggleReview = (id) => {
    if (expandedReview === id) {
      setExpandedReview(null);
    } else {
      setExpandedReview(id);
    }
  };

  // Render star rating component
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<BsStarFill key={`full-${i}`} className={styles.starIcon} />);
    }
    
    if (hasHalfStar) {
      stars.push(<BsStarHalf key="half" className={styles.starIcon} />);
    }
    
    return <div className={styles.starRating}>{stars}</div>;
  };

  return (
    <div className={styles.pageContainer}>
     
      <Header />
      <Sidebar />
      <main className={styles.mainContent} >
        <div className={styles.header}>
          <div className={styles.titleSection}>
            <h1 className={styles.title}>
              <BiMobile className={styles.titleIcon} /> PlayStore Insights
            </h1>
            <p className={styles.subtitle}>Monitor app performance, reviews, and competitive analysis</p>
          </div>
          
          <div className={styles.searchBox}>
            <FaSearch className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Search reviews..." 
              className={styles.searchInput}
            />
          </div>
        </div>
        
        <div className={styles.tabsContainer}>
          <button 
            className={`${styles.tabButton} ${activeTab === 'overview' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'reviews' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'issues' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('issues')}
          >
            Top Issues
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'competitors' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('competitors')}
          >
            Competitors
          </button>
        </div>
        
        {activeTab === 'overview' && (
          <div className={styles.overviewContent}>
            <div className={styles.metricsCards}>
              <div className={styles.metricCard}>
                <div className={styles.metricHeader}>Rating</div>
                <div className={styles.metricValue}>{appMetrics.rating}</div>
                <div className={styles.metricStars}>{renderStars(appMetrics.rating)}</div>
              </div>
              
              <div className={styles.metricCard}>
                <div className={styles.metricHeader}>Downloads</div>
                <div className={styles.metricValue}>{appMetrics.downloads}</div>
                <div className={styles.metricIcon}>
                  <BsDownload />
                </div>
              </div>
              
              <div className={styles.metricCard}>
                <div className={styles.metricHeader}>Active Users</div>
                <div className={styles.metricValue}>{appMetrics.activeUsers}</div>
                <div className={styles.metricIcon}>
                  <BiMobile />
                </div>
              </div>
              
              <div className={styles.metricCard}>
                <div className={styles.metricHeader}>Store Ranking</div>
                <div className={styles.metricValue}>{appMetrics.ranking}</div>
                <div className={styles.metricSubtext}>Updated {appMetrics.updates}</div>
              </div>
            </div>
            
            <div className={styles.insightSection}>
              <div className={styles.sectionTitle}>Key Insights</div>
              <div className={styles.insightCards}>
                <div className={styles.insightCard}>
                  <div className={styles.insightHeader}>
                    <FaChartLine />
                    <h3>Rating Trend</h3>
                  </div>
                  <div className={styles.insightContent}>
                    <div className={`${styles.trendIndicator} ${styles.positive}`}>+0.2 ↑</div>
                    <p>Your app rating has improved by 0.2 stars over the last 30 days. This is ahead of the category average increase of 0.1.</p>
                  </div>
                </div>
                
                <div className={styles.insightCard}>
                  <div className={styles.insightHeader}>
                    <BsFillBarChartFill />
                    <h3>Top Issue</h3>
                  </div>
                  <div className={styles.insightContent}>
                    <div className={`${styles.issueTag} ${styles.high}`}>Crashes</div>
                    <p>132 recent reviews mention crashes in battle mode, a 24% increase from last month.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={styles.chartPlaceholder}>
              <FaChartLine size={32} />
              <p>Rating & Download Trends (Chart visualization will appear here)</p>
            </div>
          </div>
        )}
        
        {activeTab === 'reviews' && (
          <div className={styles.reviewsContent}>
            <div className={styles.reviewsControls}>
              <div className={styles.filterButtons}>
                <button className={`${styles.filterButton} ${styles.active}`}>All Reviews</button>
                <button className={styles.filterButton}>Positive</button>
                <button className={styles.filterButton}>Critical</button>
              </div>
              
              <button className={styles.sortButton}>
                <FaFilter /> Filter & Sort
              </button>
            </div>
            
            <div className={styles.reviewsList}>
              {reviews.map(review => (
                <div key={review.id} className={styles.reviewCard}>
                  <div className={styles.reviewHeader}>
                    <div className={styles.reviewerInfo}>
                      <div className={styles.reviewerName}>{review.author}</div>
                      <div className={styles.reviewDate}>{review.date}</div>
                    </div>
                    <div className={styles.reviewRating}>
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  
                  <div className={`${styles.reviewContent} ${expandedReview === review.id ? styles.expanded : ''}`}>
                    {review.content}
                  </div>
                  
                  {review.content.length > 100 && (
                    <button 
                      className={styles.expandButton}
                      onClick={() => toggleReview(review.id)}
                    >
                      {expandedReview === review.id ? (
                        <>Show less <FaChevronUp /></>
                      ) : (
                        <>Show more <FaChevronDown /></>
                      )}
                    </button>
                  )}
                  
                  <div className={styles.reviewFooter}>
                    <div className={styles.reviewMeta}>
                      <span className={styles.deviceInfo}>{review.device}</span>
                      <span className={styles.versionInfo}>v{review.version}</span>
                      <span className={`${styles.sentimentTag} ${styles[review.sentiment]}`}>
                        {review.sentiment}
                      </span>
                    </div>
                    <div className={styles.helpfulCount}>{review.helpful} found this helpful</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'issues' && (
          <div className={styles.issuesContent}>
            <div className={styles.issueHeader}>
              <h2>Trending Issues</h2>
              <p>Based on review analysis from the last 30 days</p>
            </div>
            
            <div className={styles.issuesList}>
              {issues.map(issue => (
                <div key={issue.id} className={`${styles.issueCard} ${styles[issue.severity]}`}>
                  <div className={styles.issueInfo}>
                    <div className={`${styles.issueSeverity} ${styles[issue.severity]}`}>
                      {issue.severity}
                    </div>
                    <div className={styles.issueTitle}>{issue.issue}</div>
                  </div>
                  
                  <div className={styles.issueStats}>
                    <div className={styles.issueCount}>{issue.count} mentions</div>
                    <div className={`${styles.issueChange} ${issue.change.includes('+') ? styles.negative : styles.positive}`}>
                      {issue.change}
                    </div>
                  </div>
                  
                  <button className={styles.viewReviewsButton}>View Reviews</button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'competitors' && (
          <div className={styles.competitorsContent}>
            <div className={styles.competitorTable}>
              <div className={styles.competitorHeader}>
                <div className={styles.compNameCol}>App Name</div>
                <div className={styles.compRatingCol}>Rating</div>
                <div className={styles.compDownloadsCol}>Downloads</div>
                <div className={styles.compChangeCol}>Rating Change</div>
                <div className={styles.compActionsCol}>Actions</div>
              </div>
              
              <div className={styles.yourAppRow}>
                <div className={styles.compNameCol}>Your App</div>
                <div className={styles.compRatingCol}>
                  {appMetrics.rating} {renderStars(appMetrics.rating)}
                </div>
                <div className={styles.compDownloadsCol}>{appMetrics.downloads}</div>
                <div className={styles.compChangeCol}>—</div>
                <div className={styles.compActionsCol}>—</div>
              </div>
              
              {competitors.map(comp => (
                <div key={comp.id} className={styles.competitorRow}>
                  <div className={styles.compNameCol}>{comp.name}</div>
                  <div className={styles.compRatingCol}>
                    {comp.rating} {renderStars(comp.rating)}
                  </div>
                  <div className={styles.compDownloadsCol}>{comp.downloads}</div>
                  <div className={`${styles.compChangeCol} ${parseFloat(comp.change) > 0 ? styles.positive : styles.negative}`}>
                    {comp.change}
                  </div>
                  <div className={styles.compActionsCol}>
                    <button className={styles.compareButton}>Compare</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PlayStoreInsights;