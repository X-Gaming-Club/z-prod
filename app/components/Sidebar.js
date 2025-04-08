// app/components/Sidebar.js
'use client';
import React, { useState, useEffect } from 'react';
import { FaGamepad } from "react-icons/fa";
import { RiHome3Fill } from "react-icons/ri";
import { TbAnalyze } from "react-icons/tb";
import { FaRedditAlien } from "react-icons/fa";
import { CgInsights } from "react-icons/cg";
// import { IoGameController } from "react-icons/io5";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '@/styles/Sidebar.module.css';

const Sidebar = () => {
  const pathname = usePathname();
  const [activeIcon, setActiveIcon] = useState('');
  const [hoveredIcon, setHoveredIcon] = useState(null);
  
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
    } else if (pathname === '/Xgaming') {
      setActiveIcon('Xgaming');
    } else if (pathname === '/LiveopsInsights') {
      setActiveIcon('LiveopsInsights');
    }
  }, [pathname]);
  
  // Menu items with their corresponding routes
  const menuItems = [
    { id: 'home', icon: <RiHome3Fill size={22} />, name: 'Home', route: '/Homepage' },
    { id: 'CompAnalysis', icon: <TbAnalyze size={22} />, name: 'Competitor Analysis', route: '/CompAnalysis' },
    { id: 'RedditResearch', icon: <FaRedditAlien size={22} />, name: 'Reddit Research', route: '/RedditResearch' },
    { id: 'PlayStoreInsights', icon: <FaGamepad size={20} />, name: 'PlayStore Insights', route: '/PlayStoreInsights' },
    // { id: 'Xgaming', icon: <IoGameController size={20} />, name: 'X Gaming', route: '/Xgaming' },
    { id: 'LiveopsInsights', icon: <CgInsights size={20} />, name: 'LiveOps Insights', route: '/LiveopsInsights' },
  ];

  const renderMenuItem = (item) => (
    <div key={item.id} className={styles.linkContainer}>
      <Link href={item.route} className={styles.navLink}>
        <button
          className={`${styles.iconButton} ${activeIcon === item.id ? styles.active : ''}`}
          onMouseEnter={() => setHoveredIcon(item.id)}
          onMouseLeave={() => setHoveredIcon(null)}
        >
          {item.icon}
          {hoveredIcon === item.id && (
            <span className={styles.tooltip}>{item.name}</span>
          )}
        </button>
      </Link>
    </div>
  );

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarContent}>
        <div className={styles.menuIcons}>
          {menuItems.map(renderMenuItem)}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;