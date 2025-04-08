'use client';
import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const XgamingPage = () => {
  return (
    <div className="container">
      <Header />
      <div className="content-wrapper">
        <Sidebar />
        <main className="main-content">
          <h1>X Gaming</h1>
          <p>Welcome to the X Gaming section. This page is under development.</p>
        </main>
      </div>
    </div>
  );
};

export default XgamingPage; 