'use client'
import React, { useState } from 'react';
import styles from '../../styles/CompAnalysis.module.css';
import Sidebar from '../components/Sidebar';
import { FaChartLine, FaChartBar, FaFilter, FaDownload, FaSearch, FaTable, FaTimes } from 'react-icons/fa';
import { BsCalendar3, BsGridFill, BsListUl, BsBuilding, BsFileEarmark } from 'react-icons/bs';
import { IoMdRefresh } from 'react-icons/io';
import { BiFilterAlt } from 'react-icons/bi';

const CompAnalysis = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [viewMode, setViewMode] = useState('grid');
  const [timeRange, setTimeRange] = useState('last30days');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [selectedProject, setSelectedProject] = useState('all');
  
  // Dummy data for competitors
  const competitors = [
    { 
      id: 1, 
      name: 'Battle Royale Legends', 
      publisher: 'Epic Games', 
      category: 'Action',
      userBase: '45M',
      revenue: '$98M',
      growth: '+4.7%',
      rating: 4.7,
      logo: 'X_logo.svg',
      projectId: 'horizon'
    },
    { 
      id: 2, 
      name: 'Fantasy Kingdom', 
      publisher: 'MoonStar Games', 
      category: 'RPG',
      userBase: '32M',
      revenue: '$85M',
      growth: '+3.2%',
      rating: 4.5,
      logo: 'X_logo.svg',
      projectId: 'atlas'
    },
    { 
      id: 3, 
      name: 'Puzzle Masters', 
      publisher: 'BrainBox Studios', 
      category: 'Puzzle',
      userBase: '28M',
      revenue: '$62M',
      growth: '+6.8%',
      rating: 4.8,
      logo: 'X_logo.svg',
      projectId: 'aurora'
    },
    { 
      id: 4, 
      name: 'Racing Evolution', 
      publisher: 'Speedway Games', 
      category: 'Racing',
      userBase: '18M',
      revenue: '$45M',
      growth: '+1.5%',
      rating: 4.3,
      logo: 'X_logo.svg',
      projectId: 'orion'
    }
  ];
  
  // Projects data
  const projects = [
    { id: 'horizon', name: 'Project Horizon', code: '#2026' },
    { id: 'atlas', name: 'Project Atlas', code: '#2994' },
    { id: 'aurora', name: 'Project Aurora', code: '#2900' },
    { id: 'orion', name: 'Project Orion', code: '#7815' },
  ];
  
  // Dummy data for market metrics
  const marketMetrics = [
    { id: 1, title: 'Market Share', value: '12.3%', change: '+1.5%', trend: 'up' },
    { id: 2, title: 'Average Revenue Per User', value: '$5.70', change: '+3.2%', trend: 'up' },
    { id: 3, title: 'Category Ranking', value: '#4', change: '+2', trend: 'up' },
    { id: 4, title: 'User Acquisition Cost', value: '$2.45', change: '-0.8%', trend: 'down' }
  ];
  
  // Dummy data for feature comparison
  const featureComparison = [
    { feature: 'Multiplayer Mode', ourGame: 'Yes', competitor1: 'Yes', competitor2: 'Yes', competitor3: 'Limited' },
    { feature: 'In-app Purchases', ourGame: 'Yes', competitor1: 'Yes', competitor2: 'Yes', competitor3: 'Yes' },
    { feature: 'Social Features', ourGame: 'Advanced', competitor1: 'Basic', competitor2: 'Advanced', competitor3: 'Limited' },
    { feature: 'Daily Rewards', ourGame: 'Yes', competitor1: 'Limited', competitor2: 'Yes', competitor3: 'No' },
    { feature: 'Cloud Saves', ourGame: 'Yes', competitor1: 'Yes', competitor2: 'No', competitor3: 'Yes' },
    { feature: 'Offline Mode', ourGame: 'Yes', competitor1: 'No', competitor2: 'Limited', competitor3: 'Yes' }
  ];

  // Filter competitors based on search query and selected project
  const filteredCompetitors = competitors.filter(comp => {
    const matchesSearch = searchQuery.trim() === '' || 
      comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.publisher.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesProject = selectedProject === 'all' || comp.projectId === selectedProject;
    
    return matchesSearch && matchesProject;
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const handleProjectChange = (project) => {
    setSelectedProject(project);
  };

  const toggleFilterOptions = () => {
    setShowFilterOptions(!showFilterOptions);
  };

  return (
    <div className={styles.pageContainer}>
      <Sidebar />
      <main className={styles.mainContent}>
        <div className={styles.header}>
          <div className={styles.titleSection}>
            <h1 className={styles.title}>Competitive Analysis</h1>
            <p className={styles.subtitle}>Compare market positioning and competitor features</p>
          </div>
          
          <div className={styles.controls}>
            <div className={styles.timeRangeSelector}>
              <BsCalendar3 />
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className={styles.selectControl}
              >
                <option value="last7days">Last 7 Days</option>
                <option value="last30days">Last 30 Days</option>
                <option value="last90days">Last 90 Days</option>
                <option value="lastyear">Last Year</option>
              </select>
            </div>
            
            <button className={styles.controlButton}>
              <IoMdRefresh />
              <span>Refresh</span>
            </button>
            
            <button className={styles.controlButton}>
              <FaDownload />
              <span>Export</span>
            </button>
          </div>
        </div>
        
        {/* New search section */}
        <div className={styles.searchSection}>
          <div className={styles.searchInputWrapper}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search competitors, publishers, or categories..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {searchQuery && (
              <button className={styles.clearButton} onClick={clearSearch}>
                <FaTimes />
              </button>
            )}
          </div>
          
          <button className={styles.filterButton} onClick={toggleFilterOptions}>
            <BiFilterAlt />
            <span>Filter</span>
          </button>
        </div>
        
        {/* Filter options */}
        {showFilterOptions && (
          <div className={styles.filterOptions}>
            <div className={styles.filterGroup}>
              <div className={styles.filterLabel}>
                <BsCalendar3 />
                <span>Date</span>
              </div>
              <select className={styles.filterSelect}>
                <option value="all">All Dates</option>
                <option value="recent">Recent</option>
                <option value="last30">Last 30 Days</option>
                <option value="last90">Last 90 Days</option>
              </select>
            </div>
            
            <div className={styles.filterGroup}>
              <div className={styles.filterLabel}>
                <BsBuilding />
                <span>Source</span>
              </div>
              <select className={styles.filterSelect}>
                <option value="all">All Sources</option>
                <option value="internal">Internal Reports</option>
                <option value="market">Market Research</option>
                <option value="analyst">Analyst Reports</option>
              </select>
            </div>
            
            <div className={styles.filterGroup}>
              <div className={styles.filterLabel}>
                <BsFileEarmark />
                <span>File Type</span>
              </div>
              <select className={styles.filterSelect}>
                <option value="all">All Types</option>
                <option value="reports">Reports</option>
                <option value="presentations">Presentations</option>
                <option value="spreadsheets">Spreadsheets</option>
              </select>
            </div>
            
            <div className={styles.filterGroup}>
              <div className={styles.filterLabel}>
                <BsBuilding />
                <span>Project</span>
              </div>
              <select 
                className={styles.filterSelect}
                value={selectedProject}
                onChange={(e) => handleProjectChange(e.target.value)}
              >
                <option value="all">All Projects</option>
                {projects.map(project => (
                  <option key={project.id} value={project.id}>{project.name}</option>
                ))}
              </select>
            </div>
          </div>
        )}
        
        <div className={styles.tabsContainer}>
          <div className={styles.tabs}>
            <button 
              className={`${styles.tabButton} ${activeTab === 'overview' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`${styles.tabButton} ${activeTab === 'features' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('features')}
            >
              Feature Comparison
            </button>
            <button 
              className={`${styles.tabButton} ${activeTab === 'market' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('market')}
            >
              Market Analysis
            </button>
            <button 
              className={`${styles.tabButton} ${activeTab === 'trends' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('trends')}
            >
              Trends
            </button>
          </div>
          
          {activeTab === 'overview' && (
            <div className={styles.viewControls}>
              <button 
                className={`${styles.viewButton} ${viewMode === 'grid' ? styles.activeView : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <BsGridFill />
              </button>
              <button 
                className={`${styles.viewButton} ${viewMode === 'list' ? styles.activeView : ''}`}
                onClick={() => setViewMode('list')}
              >
                <BsListUl />
              </button>
            </div>
          )}
        </div>
        
        {/* Show search results message if search is active */}
        {searchQuery && (
          <div className={styles.searchResults}>
            <p>
              Showing results for <strong>"{searchQuery}"</strong>
              {selectedProject !== 'all' && (
                <span> in {projects.find(p => p.id === selectedProject)?.name}</span>
              )}
              {filteredCompetitors.length === 0 ? (
                <span className={styles.noResults}> - No results found</span>
              ) : (
                <span className={styles.resultCount}> - {filteredCompetitors.length} results</span>
              )}
            </p>
          </div>
        )}
        
        {activeTab === 'overview' && (
          <div className={styles.overviewContent}>
            <div className={styles.metricsSection}>
              {marketMetrics.map(metric => (
                <div key={metric.id} className={styles.metricCard}>
                  <div className={styles.metricContent}>
                    <h3 className={styles.metricTitle}>{metric.title}</h3>
                    <div className={styles.metricValue}>{metric.value}</div>
                    <div className={`${styles.metricChange} ${metric.trend === 'up' ? styles.positive : styles.negative}`}>
                      {metric.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Show message if no results */}
            {filteredCompetitors.length === 0 ? (
              <div className={styles.noResultsContainer}>
                <FaSearch size={48} className={styles.noResultsIcon} />
                <h3>No matching competitors found</h3>
                <p>Try adjusting your search terms or filters</p>
                <button className={styles.resetButton} onClick={() => {setSearchQuery(''); setSelectedProject('all');}}>
                  Reset Filters
                </button>
              </div>
            ) : (
              viewMode === 'grid' ? (
                <div className={styles.competitorsGrid}>
                  {filteredCompetitors.map(comp => (
                    <div key={comp.id} className={styles.competitorCard}>
                      <div className={styles.competitorHeader}>
                        <div className={styles.competitorLogo}>
                          <img src={comp.logo} alt={`${comp.name} logo`} />
                        </div>
                        <div className={styles.competitorInfo}>
                          <h3 className={styles.competitorName}>{comp.name}</h3>
                          <p className={styles.competitorPublisher}>{comp.publisher}</p>
                          <div className={styles.competitorMeta}>
                            <span className={styles.competitorCategory}>{comp.category}</span>
                            <span className={styles.competitorProject}>
                              {projects.find(p => p.id === comp.projectId)?.code}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className={styles.competitorStats}>
                        <div className={styles.statItem}>
                          <span className={styles.statLabel}>Users</span>
                          <span className={styles.statValue}>{comp.userBase}</span>
                        </div>
                        <div className={styles.statItem}>
                          <span className={styles.statLabel}>Revenue</span>
                          <span className={styles.statValue}>{comp.revenue}</span>
                        </div>
                        <div className={styles.statItem}>
                          <span className={styles.statLabel}>Growth</span>
                          <span className={`${styles.statValue} ${styles.positive}`}>{comp.growth}</span>
                        </div>
                        <div className={styles.statItem}>
                          <span className={styles.statLabel}>Rating</span>
                          <span className={styles.statValue}>{comp.rating}</span>
                        </div>
                      </div>
                      <div className={styles.competitorActions}>
                        <button className={styles.detailButton}>View Details</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.competitorsTable}>
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Publisher</th>
                        <th>Category</th>
                        <th>Project</th>
                        <th>User Base</th>
                        <th>Revenue</th>
                        <th>Growth</th>
                        <th>Rating</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCompetitors.map(comp => (
                        <tr key={comp.id}>
                          <td className={styles.nameCell}>
                            <img src={comp.logo} alt={`${comp.name} logo`} className={styles.tableLogo} />
                            <span>{comp.name}</span>
                          </td>
                          <td>{comp.publisher}</td>
                          <td>{comp.category}</td>
                          <td>{projects.find(p => p.id === comp.projectId)?.code}</td>
                          <td>{comp.userBase}</td>
                          <td>{comp.revenue}</td>
                          <td className={styles.positive}>{comp.growth}</td>
                          <td>{comp.rating}</td>
                          <td>
                            <button className={styles.tableActionButton}>Details</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            )}
            
            {filteredCompetitors.length > 0 && (
              <div className={styles.chartSection}>
                <div className={styles.chartCard}>
                  <div className={styles.chartHeader}>
                    <h3>Market Positioning Map</h3>
                    <div className={styles.chartControls}>
                      <select className={styles.chartSelect}>
                        <option value="revenue-rating">Revenue vs Rating</option>
                        <option value="users-engagement">Users vs Engagement</option>
                        <option value="growth-retention">Growth vs Retention</option>
                      </select>
                    </div>
                  </div>
                  <div className={styles.chartPlaceholder}>
                    <FaChartLine size={40} />
                    <p>Scatter plot visualization will appear here</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'features' && (
          <div className={styles.featuresContent}>
            <div className={styles.featureTableContainer}>
              <table className={styles.featureTable}>
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>Our Game</th>
                    <th>Battle Royale Legends</th>
                    <th>Fantasy Kingdom</th>
                    <th>Puzzle Masters</th>
                  </tr>
                </thead>
                <tbody>
                  {featureComparison.map((item, index) => (
                    <tr key={index}>
                      <td>{item.feature}</td>
                      <td className={styles.ourGameCell}>{item.ourGame}</td>
                      <td>{item.competitor1}</td>
                      <td>{item.competitor2}</td>
                      <td>{item.competitor3}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className={styles.featureAnalysis}>
              <div className={styles.analysisCard}>
                <h3>Feature Parity Analysis</h3>
                <div className={styles.chartPlaceholder}>
                  <FaChartBar size={40} />
                  <p>Feature comparison chart will appear here</p>
                </div>
              </div>
              
              <div className={styles.analysisCard}>
                <h3>Feature Gap Opportunities</h3>
                <div className={styles.opportunitiesList}>
                  <div className={styles.opportunityItem}>
                    <span className={styles.opportunityBadge}>High Impact</span>
                    <p>Implement advanced social sharing features to differentiate from competitors</p>
                  </div>
                  <div className={styles.opportunityItem}>
                    <span className={styles.opportunityBadge}>Medium Impact</span>
                    <p>Enhance cloud saves with cross-platform synchronization</p>
                  </div>
                  <div className={styles.opportunityItem}>
                    <span className={styles.opportunityBadge}>Medium Impact</span>
                    <p>Improve daily rewards system with streak bonuses</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {(activeTab === 'market' || activeTab === 'trends') && (
          <div className={styles.placeholderSection}>
            <div className={styles.placeholderIcon}>
              <FaTable size={48} />
            </div>
            <h2>Coming Soon</h2>
            <p>This section is currently under development. Your backend team will implement detailed {activeTab} data visualization here.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default CompAnalysis;