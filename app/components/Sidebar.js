'use client'
import React, { useState, useEffect } from 'react';
import { FaGamepad } from "react-icons/fa";
import { RiHome3Fill } from "react-icons/ri";
import { TbAnalyze } from "react-icons/tb";
import { IoIosSearch } from "react-icons/io";
import { FaRedditAlien } from "react-icons/fa";
import styles from '../../styles/Sidebar.module.css';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeIcon, setActiveIcon] = useState('home');
  const [hoveredIcon, setHoveredIcon] = useState(null);

  // Update active icon based on current route when component mounts or route changes
  useEffect(() => {
    // Map paths to corresponding menu item IDs
    if (pathname === '/') {
      setActiveIcon('home');
    } else if (pathname === '/Games') {
      setActiveIcon('games');
    } else if (pathname === '/ReddCommunity') {
      setActiveIcon('ReddCommunity');
    } else if (pathname === '/Analytics') {
      setActiveIcon('analytics');
    } else if (pathname === '/search') {
      setActiveIcon('search');
    }
  }, [pathname]);

  // Menu items with their corresponding routes
  const menuItems = [
    { id: 'search', icon: <IoIosSearch size={22} />, name: 'Search', route: '/' },
    { id: 'home', icon: <RiHome3Fill size={22} />, name: 'Home', route: '/' },
    { id: 'games', icon: <FaGamepad size={20} />, name: 'Games', route: '/Games' },
    { id: 'ReddCommunity', icon: <FaRedditAlien size={22} />, name: 'ReddCommunity', route: '/ReddCommunity' },
    { id: 'analytics', icon: <TbAnalyze size={22} />, name: 'Analytics', route: '/Analytics' },
  ];

  // Handle icon click with navigation
  const handleIconClick = (itemId, route) => {
    if (itemId === 'search') {
      console.log('Search clicked');
      return;
    }
    setActiveIcon(itemId);
    router.push(route);
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
          <button
            className={styles.avatarButton}
            onMouseEnter={() => setHoveredIcon('profile')}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            <span>B</span>
            {hoveredIcon === 'profile' && (
              <span className={styles.tooltip}>Profile</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;