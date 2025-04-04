'use client'
import React, { useState } from 'react';
import styles from '../../styles/LiveopsInsights.module.css';
import Sidebar from '../components/Sidebar';
import { FaChartLine, FaCalendarAlt, FaFilter, FaDownload, FaSearch } from 'react-icons/fa';
import { BiTrendingUp } from 'react-icons/bi';
import { IoMdRefresh } from 'react-icons/io';

const LiveopsInsights = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('last30days');
  
  // Dummy data for KPIs
  const kpiData = [
    { id: 1, title: 'Daily Active Users', value: '2.3M', change: '+5.2%', trend: 'up' },
    { id: 2, title: 'Revenue', value: '$432K', change: '+8.7%', trend: 'up' },
    { id: 3, title: 'Retention D1', value: '45%', change: '-2.1%', trend: 'down' },
    { id: 4, title: 'Average Session', value: '24m', change: '+1.3%', trend: 'up' }
  ];
  
  // Dummy data for events
  const eventsData = [
    { id: 1, name: 'Summer Festival', status: 'active', players: '845K', revenue: '$125K', conversion: '5.2%' },
    { id: 2, name: 'Daily Challenges', status: 'active', players: '1.2M', revenue: '$98K', conversion: '3.8%' },
    { id: 3, name: 'Special Bundle', status: 'upcoming', players: '-', revenue: '-', conversion: '-' },
    { id: 4, name: 'Spring Event', status: 'ended', players: '765K', revenue: '$86K', conversion: '4.5%' }
  ];

  return (
    <div className={styles.pageContainer}>
      <Sidebar />
      <main className={styles.mainContent}>
        <div className={styles.header}>
          <div className={styles.titleSection}>
            <h1 className={styles.title}>LiveOps Insights</h1>
            <p className={styles.subtitle}>Monitor in-game events and performance metrics</p>
          </div>
          
          <div className={styles.controls}>
            <div className={styles.dateSelector}>
              <FaCalendarAlt />
              <select 
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className={styles.selectInput}
              >
                <option value="last7days">Last 7 Days</option>
                <option value="last30days">Last 30 Days</option>
                <option value="last90days">Last 90 Days</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
            
            <button className={styles.refreshButton}>
              <IoMdRefresh />
              <span>Refresh</span>
            </button>
            
            <button className={styles.exportButton}>
              <FaDownload />
              <span>Export</span>
            </button>
          </div>
        </div>
        
        <div className={styles.tabsContainer}>
          <div className={styles.tabs}>
            <button 
              className={`${styles.tabButton} ${activeTab === 'overview' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`${styles.tabButton} ${activeTab === 'events' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('events')}
            >
              Live Events
            </button>
            <button 
              className={`${styles.tabButton} ${activeTab === 'players' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('players')}
            >
              Player Segments
            </button>
            <button 
              className={`${styles.tabButton} ${activeTab === 'revenue' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('revenue')}
            >
              Revenue Analysis
            </button>
          </div>
        </div>
        
        {activeTab === 'overview' && (
          <div className={styles.overviewContent}>
            <div className={styles.kpiSection}>
              {kpiData.map(kpi => (
                <div key={kpi.id} className={styles.kpiCard}>
                  <div className={styles.kpiHeader}>
                    <h3 className={styles.kpiTitle}>{kpi.title}</h3>
                    <div className={`${styles.kpiTrend} ${kpi.trend === 'up' ? styles.trendUp : styles.trendDown}`}>
                      <BiTrendingUp />
                      <span>{kpi.change}</span>
                    </div>
                  </div>
                  <div className={styles.kpiValue}>{kpi.value}</div>
                </div>
              ))}
            </div>
            
            <div className={styles.chartSection}>
              <div className={styles.chartCard}>
                <div className={styles.chartHeader}>
                  <h3>Daily Active Users</h3>
                  <div className={styles.chartControls}>
                    <select className={styles.chartSelect}>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                </div>
                <div className={styles.chartPlaceholder}>
                  <FaChartLine size={40} />
                  <p>Chart visualization will appear here</p>
                </div>
              </div>
              
              <div className={styles.chartCard}>
                <div className={styles.chartHeader}>
                  <h3>Revenue Breakdown</h3>
                  <div className={styles.chartControls}>
                    <select className={styles.chartSelect}>
                      <option value="items">By Items</option>
                      <option value="events">By Events</option>
                      <option value="bundles">By Bundles</option>
                    </select>
                  </div>
                </div>
                <div className={styles.chartPlaceholder}>
                  <FaChartLine size={40} />
                  <p>Chart visualization will appear here</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'events' && (
          <div className={styles.eventsContent}>
            <div className={styles.tableHeader}>
              <div className={styles.tableSearch}>
                <FaSearch />
                <input type="text" placeholder="Search events..." />
              </div>
              <div className={styles.tableFilters}>
                <button className={styles.filterButton}>
                  <FaFilter />
                  <span>Filter</span>
                </button>
                <select className={styles.filterSelect}>
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="ended">Ended</option>
                </select>
              </div>
            </div>
            
            <div className={styles.tableContainer}>
              <table className={styles.eventsTable}>
                <thead>
                  <tr>
                    <th>Event Name</th>
                    <th>Status</th>
                    <th>Players</th>
                    <th>Revenue</th>
                    <th>Conversion</th>
                  </tr>
                </thead>
                <tbody>
                  {eventsData.map(event => (
                    <tr key={event.id}>
                      <td>{event.name}</td>
                      <td>
                        <span className={`${styles.statusBadge} ${styles[event.status]}`}>
                          {event.status}
                        </span>
                      </td>
                      <td>{event.players}</td>
                      <td>{event.revenue}</td>
                      <td>{event.conversion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {(activeTab === 'players' || activeTab === 'revenue') && (
          <div className={styles.placeholderContent}>
            <div className={styles.placeholderIcon}>
              <FaChartLine size={48} />
            </div>
            <h2>Coming Soon</h2>
            <p>This section is under development. Check back later for detailed {activeTab} analytics.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default LiveopsInsights;