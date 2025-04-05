'use client';
import React, { useState, useEffect } from 'react';
import { FaGamepad } from "react-icons/fa";
import { RiHome3Fill } from "react-icons/ri";
import { TbAnalyze } from "react-icons/tb";
import { FaRedditAlien } from "react-icons/fa";
import { CgInsights } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";
import styles from '../../styles/Sidebar.module.css';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeIcon, setActiveIcon] = useState('home');
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [showLogout, setShowLogout] = useState(false);
  
  // Update active icon based on current route when component mounts or route changes
  useEffect(() => {
    // Map paths to corresponding menu item IDs
    if (pathname === '/Homepage') {
      setActiveIcon('home');
    } else if (pathname === '/PlayStoreInsights') {
      setActiveIcon('PlayStoreInsights');
    } else if (pathname === '/RedditResearch') {
      setActiveIcon('RedditResearch');
    } else if (pathname === '/CompAnalysis') {
      setActiveIcon('CompAnalysis');
    } else if (pathname === '/LiveopsInsights') {
      setActiveIcon('LiveopsInsights');
    }
  }, [pathname]);
  
  // Menu items with their corresponding routes
  const menuItems = [
    { id: 'home', icon: <RiHome3Fill size={22} />, name: 'Home', route: '/Homepage' },
    { id: 'CompAnalysis', icon: <TbAnalyze size={22} />, name: 'CompAnalysis', route: '/CompAnalysis' },
    { id: 'RedditResearch', icon: <FaRedditAlien size={22} />, name: 'RedditResearch', route: '/RedditResearch' },
    { id: 'PlayStoreInsights', icon: <FaGamepad size={20} />, name: 'PlayStoreInsights', route: '/PlayStoreInsights' },
    { id: 'LiveopsInsights', icon: <CgInsights size={20} />, name: 'LiveopsInsights', route: '/LiveopsInsights' },
  ];
  
  // Handle icon click with navigation - fixed to prevent flash of incorrect active state
  const handleIconClick = (itemId, route) => {
    // First set the active icon immediately to prevent flickering
    setActiveIcon(itemId);
    
    // Then navigate to the route
    router.push(route);
  };
  
  // Handle profile click - toggle logout button visibility
  const handleProfileClick = () => {
    setShowLogout(!showLogout);
  };
  
  // Handle logout action
  const handleLogout = () => {
    router.push('/');
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <Image
          src="/X_logo.svg"
          alt="XGaming Logo"
          width={32}
          height={32}
          priority
        />
      </div>
      <div className={styles.sidebarContent}>
        <div className={styles.topIcons}>
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`${styles.iconButton} ${activeIcon === item.id ? styles.active : ''}`}
              onClick={() => handleIconClick(item.id, item.route)}
              onMouseEnter={() => setHoveredIcon(item.id)}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              {item.icon}
              {hoveredIcon === item.id && (
                <span className={styles.tooltip}>{item.name}</span>
              )}
            </button>
          ))}
        </div>
        <div className={styles.bottomIcons}>
          <div className={styles.profileContainer}>
            <button
              className={styles.avatarButton}
              onClick={handleProfileClick}
              onMouseEnter={() => setHoveredIcon('profile')}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <span>B</span>
              {hoveredIcon === 'profile' && !showLogout && (
                <span className={styles.tooltip}>Profile</span>
              )}
            </button>
            
            {showLogout && (
              <button 
                className={styles.logoutButton}
                onClick={handleLogout}
                onMouseEnter={() => setHoveredIcon('logout')}
                onMouseLeave={() => setHoveredIcon(null)}
              >
                <BiLogOut size={18} />
                {hoveredIcon === 'logout' && (
                  <span className={styles.tooltip}>Logout</span>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;