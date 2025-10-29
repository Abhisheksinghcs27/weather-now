import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar';

const Header = ({ onSearch }) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <header className="header">
      <div className="header-left">
        <img onClick={() => window.location.reload()} style={{ cursor: 'pointer' }} src="/src/assets/weather-now.png" alt="logo" className="logo" />
        <h1 onClick={() => window.location.reload() } style={{ cursor: 'pointer' }}>Weather Now</h1>
      </div>
      <div className="header-center">
        <Searchbar onSearch={onSearch} />
      </div>
      <div className="header-right">
        <button className="icon-btn" onClick={toggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
       
      </div>
    </header>
  );
};

export default Header;
