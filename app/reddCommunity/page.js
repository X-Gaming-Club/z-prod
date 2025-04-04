'use client'
import React, { useState } from 'react';
import styles from '../../styles/ReddCommunity.module.css';
import Sidebar from '../components/Sidebar';
import { FaRedditAlien, FaArrowUp, FaArrowDown, FaCommentAlt, FaShare, FaBookmark, FaEllipsisH, FaTrophy, FaFire, FaStar, FaClock } from 'react-icons/fa';

const ReddCommunity = () => {
  const [activeSort, setActiveSort] = useState('hot');
  const [activePage, setActivePage] = useState(1);
  const [votedPosts, setVotedPosts] = useState({});

  // Dummy data for posts
  const posts = [
    {
      id: 1,
      author: 'GamerPro123',
      subreddit: 'r/gaming',
      timePosted: '5 hours ago',
      title: 'Just finished Celestial Odyssey after 120 hours - here are my thoughts',
      text: 'After an incredible journey spanning over 120 hours, I have finally completed Celestial Odyssey and all of its side quests. This game is truly a masterpiece of modern RPG design. The character development, world-building, and combat systems all come together to create one of the most immersive gaming experiences Ive had in years.',
      image: '/api/placeholder/600/400',
      upvotes: 1542,
      comments: 328,
      tags: ['Discussion', 'RPG', 'Review']
    },
    {
      id: 2,
      author: 'DevNinja',
      subreddit: 'r/gamedev',
      timePosted: '12 hours ago',
      title: 'Implementing a better inventory system - code and demo included',
      text: 'Ive been working on a new inventory system for my indie game that allows for better organization and drag-and-drop functionality. Ive included a working demo and code snippets in the comments for anyone who wants to implement something similar in their projects.',
      upvotes: 876,
      comments: 145,
      tags: ['Tutorial', 'Code', 'UI/UX']
    },
    {
      id: 3,
      author: 'NewsBot',
      subreddit: 'r/gamingnews',
      timePosted: '2 days ago',
      title: 'BREAKING: Velocity Games announces Neon Drift 2 with revolutionary AI-powered racing mechanics',
      text: 'Velocity Games has just announced Neon Drift 2, the sequel to their critically acclaimed racing game. The new title will feature revolutionary AI-powered racing mechanics that adapt to each players driving style to create personalized challenges and experiences.',
      image: '/api/placeholder/600/400',
      upvotes: 3254,
      comments: 521,
      tags: ['News', 'Announcement', 'Racing']
    },
    {
      id: 4,
      author: 'PixelArtist',
      subreddit: 'r/gameart',
      timePosted: '1 day ago',
      title: 'I recreated classic game characters in my own pixel art style',
      text: 'Ive been working on a series where I recreate iconic game characters in my own unique pixel art style. Heres the first batch featuring characters from the most legendary games of the 90s era.',
      image: '/api/placeholder/600/400',
      upvotes: 952,
      comments: 87,
      tags: ['Art', 'PixelArt', 'Retro']
    }
  ];

  // Dummy data for trending topics
  const trendingTopics = [
    { id: 1, name: 'E3 2025 Announcements', stats: '25.4k posts today' },
    { id: 2, name: 'Neon Drift 2 Reveal', stats: '12.3k posts today' },
    { id: 3, name: 'Indie Game Showcase', stats: '8.7k posts today' },
    { id: 4, name: 'Game Development Tips', stats: '5.2k posts today' },
    { id: 5, name: 'Retro Gaming', stats: '3.9k posts today' },
  ];

  // Dummy data for subreddits
  const subreddits = [
    { id: 1, name: 'r/gaming', members: '40.2M members', joined: false },
    { id: 2, name: 'r/gamedev', members: '5.8M members', joined: true },
    { id: 3, name: 'r/gameart', members: '2.3M members', joined: false },
    { id: 4, name: 'r/gamingnews', members: '3.7M members', joined: true },
    { id: 5, name: 'r/indiegames', members: '1.5M members', joined: false },
  ];

  const handleSortChange = (sort) => {
    setActiveSort(sort);
    // Here you would fetch new data from backend based on sort criteria
  };

  const handleVote = (postId, direction) => {
    setVotedPosts(prev => {
      const current = prev[postId] || 'none';
      
      if (current === direction) {
        const newVotes = { ...prev };
        delete newVotes[postId];
        return newVotes;
      } else {
        return { ...prev, [postId]: direction };
      }
    });
    
    // Here you would send the vote to the backend
  };

  const handleJoinSubreddit = (subredditId) => {
    // Here you would send join/leave request to backend
    console.log(`Toggle join for subreddit ${subredditId}`);
  };

  const handlePageChange = (page) => {
    setActivePage(page);
    // Here you would fetch new data from backend for the selected page
  };

  const sortIcons = {
    hot: <FaFire />,
    new: <FaClock />,
    top: <FaTrophy />,
    best: <FaStar />
  };

  return (
    <div className={styles.pageContainer}>
      <Sidebar />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            <FaRedditAlien className={styles.titleIcon} />
            ReddCommunity
          </h1>
          <p className={styles.subtitle}>
            Discover and engage with gaming communities, news, and discussions in one place.
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.mainFeed}>
            <div className={styles.sortOptions}>
              {Object.entries(sortIcons).map(([sort, icon]) => (
                <button
                  key={sort}
                  className={`${styles.sortOption} ${activeSort === sort ? styles.sortOptionActive : ''}`}
                  onClick={() => handleSortChange(sort)}
                >
                  {icon}
                  <span>{sort.charAt(0).toUpperCase() + sort.slice(1)}</span>
                </button>
              ))}
            </div>

            {posts.map(post => (
              <div key={post.id} className={styles.postCard}>
                <div className={styles.postHeader}>
                  <div className={styles.postInfo}>
                    <div className={styles.postAvatar}>
                      {post.author.charAt(0)}
                    </div>
                    <div className={styles.postAuthor}>
                      <span className={styles.authorName}>{post.author}</span>
                      <div className={styles.postMeta}>
                        <span className={styles.postSubreddit}>{post.subreddit}</span>
                        <span>•</span>
                        <span>{post.timePosted}</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.postActions}>
                    <button className={styles.actionButton}>
                      <FaBookmark />
                    </button>
                    <button className={styles.actionButton}>
                      <FaEllipsisH />
                    </button>
                  </div>
                </div>

                <div className={styles.postContent}>
                  <h2 className={styles.postTitle}>{post.title}</h2>
                  <p className={styles.postText}>{post.text}</p>
                  {post.image && (
                    <img 
                      src={post.image} 
                      alt="Post content" 
                      className={styles.postImage} 
                    />
                  )}
                  {post.tags && (
                    <div className={styles.postTags}>
                      {post.tags.map((tag, index) => (
                        <span key={index} className={styles.postTag}>{tag}</span>
                      ))}
                    </div>
                  )}
                </div>

                <div className={styles.postFooter}>
                  <div className={styles.voteSection}>
                    <button 
                      className={`${styles.voteButton} ${votedPosts[post.id] === 'up' ? styles.upvoteActive : ''}`}
                      onClick={() => handleVote(post.id, 'up')}
                    >
                      <FaArrowUp />
                    </button>
                    <span className={styles.voteCount}>
                      {post.upvotes + (votedPosts[post.id] === 'up' ? 1 : 0) - (votedPosts[post.id] === 'down' ? 1 : 0)}
                    </span>
                    <button 
                      className={`${styles.voteButton} ${votedPosts[post.id] === 'down' ? styles.downvoteActive : ''}`}
                      onClick={() => handleVote(post.id, 'down')}
                    >
                      <FaArrowDown />
                    </button>
                  </div>
                  <div className={styles.commentSection}>
                    <button className={styles.voteButton}>
                      <FaCommentAlt />
                    </button>
                    <span className={styles.commentCount}>{post.comments} Comments</span>
                  </div>
                  <button className={styles.shareButton}>
                    <FaShare />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            ))}

            <div className={styles.paginationSection}>
              <button 
                className={styles.paginationButton}
                onClick={() => handlePageChange(activePage - 1)}
                disabled={activePage === 1}
              >
                &lt;
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
                &gt;
              </button>
            </div>
          </div>

          <div className={styles.sidebar}>
            <div className={styles.sidebarCard}>
              <div className={styles.sidebarHeader}>
                <h3 className={styles.sidebarTitle}>Trending Today</h3>
              </div>
              <div className={styles.sidebarContent}>
                <div className={styles.trendingTopics}>
                  {trendingTopics.map(topic => (
                    <div key={topic.id} className={styles.topicItem}>
                      <span className={styles.topicNumber}>{topic.id}</span>
                      <div className={styles.topicDetails}>
                        <span className={styles.topicName}>{topic.name}</span>
                        <span className={styles.topicStats}>{topic.stats}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.sidebarCard}>
              <div className={styles.sidebarHeader}>
                <h3 className={styles.sidebarTitle}>Top Gaming Communities</h3>
              </div>
              <div className={styles.sidebarContent}>
                <div className={styles.subreddits}>
                  {subreddits.map(subreddit => (
                    <div key={subreddit.id} className={styles.subredditItem}>
                      <div className={styles.subredditIcon}>
                        {subreddit.name.charAt(3)}
                      </div>
                      <div className={styles.subredditInfo}>
                        <span className={styles.subredditName}>{subreddit.name}</span>
                        <span className={styles.subredditMembers}>{subreddit.members}</span>
                      </div>
                      <button 
                        className={styles.joinButton}
                        onClick={() => handleJoinSubreddit(subreddit.id)}
                      >
                        {subreddit.joined ? 'Joined' : 'Join'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReddCommunity;