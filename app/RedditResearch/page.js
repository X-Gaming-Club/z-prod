'use client'
import React, { useState } from 'react';
import styles from '../../styles/RedditResearch.module.css';
import Sidebar from '../components/Sidebar';
import { FaRedditAlien, FaSearch, FaFilter, FaSortAmountDown, FaRegClock, FaFire, FaChartLine } from 'react-icons/fa';
import { IoMdTrendingUp } from 'react-icons/io';
import { BsBookmark, BsCalendar3, BsCardText } from 'react-icons/bs';
import Header from '../components/Header';

const RedditResearch = () => {
  const [activeTab, setActiveTab] = useState('posts');
  const [sortMethod, setSortMethod] = useState('relevance');
  const [searchTerm, setSearchTerm] = useState('');
  const [timeRange, setTimeRange] = useState('month');
  
  // Dummy data for Reddit posts
  const posts = [
    {
      id: 1,
      title: 'Anyone played the new update? What are your thoughts?',
      author: 'GameEnthusiast42',
      subreddit: 'r/gaming',
      upvotes: 2467,
      comments: 532,
      timePosted: '2 days ago',
      snippet: 'The new update has some interesting features but Im having issues with the new combat system. Anyone else experiencing this?',
      sentiment: 'mixed'
    },
    {
      id: 2,
      title: 'The progression system is broken and heres why',
      author: 'BalanceWizard',
      subreddit: 'r/gamedesign',
      upvotes: 5283,
      comments: 842,
      timePosted: '1 week ago',
      snippet: 'After dozens of hours of gameplay, its clear that the progression curve is fundamentally broken. The early game is too slow and the mid-game...',
      sentiment: 'negative'
    },
    {
      id: 3,
      title: 'This game has the best character customization Ive seen',
      author: 'RPGLover2023',
      subreddit: 'r/games',
      upvotes: 3891,
      comments: 624,
      timePosted: '3 days ago',
      snippet: 'Ive spent more time in the character creator than the actual game. The level of detail is amazing and puts other RPGs to shame...',
      sentiment: 'positive'
    },
    {
      id: 4,
      title: 'Tips for new players - everything I wish I knew',
      author: 'HelpfulGamer',
      subreddit: 'r/GamingTips',
      upvotes: 1937,
      comments: 312,
      timePosted: '5 days ago',
      snippet: 'After 100+ hours, here are some essential tips to help new players get started. First, focus on resource management before...',
      sentiment: 'positive'
    }
  ];
  
  // Dummy data for trending topics
  const trendingTopics = [
    { id: 1, topic: 'Combat System', mentions: 1283, sentiment: 'negative', change: '+32%' },
    { id: 2, topic: 'Character Creation', mentions: 876, sentiment: 'positive', change: '+15%' },
    { id: 3, topic: 'Server Stability', mentions: 764, sentiment: 'negative', change: '+128%' },
    { id: 4, topic: 'New Content Update', mentions: 643, sentiment: 'mixed', change: 'New' },
    { id: 5, topic: 'Monetization', mentions: 532, sentiment: 'negative', change: '+22%' }
  ];
  
  // Dummy data for subreddits
  const subreddits = [
    { id: 1, name: 'r/gaming', members: '34.2M', relevantPosts: 287, sentiment: 'mixed' },
    { id: 2, name: 'r/gamedesign', members: '612K', relevantPosts: 154, sentiment: 'negative' },
    { id: 3, name: 'r/games', members: '3.7M', relevantPosts: 93, sentiment: 'positive' },
    { id: 4, name: 'r/truegaming', members: '1.9M', relevantPosts: 76, sentiment: 'mixed' },
    { id: 5, name: 'r/GameDevelopment', members: '428K', relevantPosts: 42, sentiment: 'positive' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Search logic would go here
    console.log('Searching for:', searchTerm);
  };

  return (
    <div className={styles.pageContainer}>
      
      <Header />
      <Sidebar />
      <main className={styles.mainContent}>
        <div className={styles.header}>
          <div className={styles.titleSection}>
            <h1 className={styles.title}>
              <FaRedditAlien className={styles.redditIcon} /> Reddit Research
            </h1>
            <p className={styles.subtitle}>Analyze community feedback and sentiment from Reddit</p>
          </div>
          
          <form className={styles.searchForm} onSubmit={handleSearch}>
            <div className={styles.searchInputWrapper}>
              <FaSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search posts, topics, or subreddits..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>
            <button type="submit" className={styles.searchButton}>Search</button>
          </form>
        </div>
        
        <div className={styles.controlsBar}>
          <div className={styles.tabs}>
            <button 
              className={`${styles.tabButton} ${activeTab === 'posts' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('posts')}
            >
              <BsCardText />
              <span>Posts</span>
            </button>
            <button 
              className={`${styles.tabButton} ${activeTab === 'topics' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('topics')}
            >
              <IoMdTrendingUp />
              <span>Trending Topics</span>
            </button>
            <button 
              className={`${styles.tabButton} ${activeTab === 'subreddits' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('subreddits')}
            >
              <FaRedditAlien />
              <span>Subreddits</span>
            </button>
            <button 
              className={`${styles.tabButton} ${activeTab === 'analytics' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('analytics')}
            >
              <FaChartLine />
              <span>Analytics</span>
            </button>
          </div>
          
          <div className={styles.filters}>
            <div className={styles.filterGroup}>
              <label>Sort:</label>
              <select 
                value={sortMethod} 
                onChange={(e) => setSortMethod(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="relevance">Relevance</option>
                <option value="date">Date</option>
                <option value="upvotes">Upvotes</option>
                <option value="comments">Comments</option>
              </select>
            </div>
            
            <div className={styles.filterGroup}>
              <label>Time:</label>
              <select 
                value={timeRange} 
                onChange={(e) => setTimeRange(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="day">Past 24 Hours</option>
                <option value="week">Past Week</option>
                <option value="month">Past Month</option>
                <option value="year">Past Year</option>
                <option value="all">All Time</option>
              </select>
            </div>
            
            <button className={styles.filterButton}>
              <FaFilter />
              <span>More Filters</span>
            </button>
          </div>
        </div>
        
        {activeTab === 'posts' && (
          <div className={styles.postsContainer}>
            {posts.map(post => (
              <div key={post.id} className={styles.postCard}>
                <div className={styles.postHeader}>
                  <div className={styles.postSubreddit}>{post.subreddit}</div>
                  <div className={styles.postTime}>
                    <FaRegClock />
                    <span>{post.timePosted}</span>
                  </div>
                </div>
                
                <h3 className={styles.postTitle}>{post.title}</h3>
                <p className={styles.postSnippet}>{post.snippet}</p>
                
                <div className={styles.postFooter}>
                  <div className={styles.postStats}>
                    <div className={styles.postStat}>
                      <FaFire />
                      <span>{post.upvotes} upvotes</span>
                    </div>
                    <div className={styles.postStat}>
                      <BsCardText />
                      <span>{post.comments} comments</span>
                    </div>
                    <div className={`${styles.postSentiment} ${styles[post.sentiment]}`}>
                      {post.sentiment}
                    </div>
                  </div>
                  
                  <div className={styles.postActions}>
                    <button className={styles.postAction}>
                      <BsBookmark />
                      <span>Save</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            <div className={styles.loadMore}>
              <button className={styles.loadMoreButton}>Load more posts</button>
            </div>
          </div>
        )}
        
        {activeTab === 'topics' && (
          <div className={styles.topicsContainer}>
            <div className={styles.topicsHeader}>
              <h2>Trending Topics</h2>
              <div className={styles.topicsTimeSelector}>
                <BsCalendar3 />
                <select className={styles.filterSelect}>
                  <option value="day">Today</option>
                  <option value="week">This week</option>
                  <option value="month" selected>This month</option>
                </select>
              </div>
            </div>
            
            <div className={styles.topicsTable}>
              <div className={styles.topicsTableHeader}>
                <div className={styles.topicColumn}>Topic</div>
                <div className={styles.mentionsColumn}>Mentions</div>
                <div className={styles.sentimentColumn}>Sentiment</div>
                <div className={styles.changeColumn}>Change</div>
                <div className={styles.actionsColumn}>Actions</div>
              </div>
              
              {trendingTopics.map(topic => (
                <div key={topic.id} className={styles.topicRow}>
                  <div className={styles.topicColumn}>{topic.topic}</div>
                  <div className={styles.mentionsColumn}>{topic.mentions}</div>
                  <div className={styles.sentimentColumn}>
                    <span className={`${styles.sentimentBadge} ${styles[topic.sentiment]}`}>
                      {topic.sentiment}
                    </span>
                  </div>
                  <div className={styles.changeColumn}>{topic.change}</div>
                  <div className={styles.actionsColumn}>
                    <button className={styles.topicViewButton}>View Posts</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'subreddits' && (
          <div className={styles.subredditsContainer}>
            <div className={styles.subredditsGrid}>
              {subreddits.map(subreddit => (
                <div key={subreddit.id} className={styles.subredditCard}>
                  <div className={styles.subredditIcon}>
                    <FaRedditAlien />
                  </div>
                  <div className={styles.subredditInfo}>
                    <h3 className={styles.subredditName}>{subreddit.name}</h3>
                    <div className={styles.subredditStats}>
                      <div className={styles.subredditStat}>
                        <span className={styles.statLabel}>Members:</span>
                        <span className={styles.statValue}>{subreddit.members}</span>
                      </div>
                      <div className={styles.subredditStat}>
                        <span className={styles.statLabel}>Posts:</span>
                        <span className={styles.statValue}>{subreddit.relevantPosts}</span>
                      </div>
                      <div className={styles.subredditStat}>
                        <span className={styles.statLabel}>Sentiment:</span>
                        <span className={`${styles.sentimentBadge} ${styles[subreddit.sentiment]}`}>
                          {subreddit.sentiment}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.subredditActions}>
                    <button className={styles.subredditButton}>View Posts</button>
                    <button className={styles.subredditButton}>Track</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'analytics' && (
          <div className={styles.analyticsPlaceholder}>
            <div className={styles.placeholderIcon}>
              <FaChartLine size={48} />
            </div>
            <h2>Reddit Analytics</h2>
            <p>This section will display advanced sentiment analysis, trend visualization, and engagement metrics.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default RedditResearch;