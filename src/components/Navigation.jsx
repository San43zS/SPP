import React, { useState } from 'react';

/**
 * Компонент навигации
 */
const Navigation = ({ currentPage, onPageChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Главная', icon: '🏠' },
    { id: 'projects', label: 'Проекты', icon: '📁' },
    { id: 'profile', label: 'Профиль', icon: '👤' }
  ];

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handlePageChange = (pageId) => {
    onPageChange(pageId);
    setIsMenuOpen(false);
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <h2>Task Manager</h2>
        </div>
        
        {/* Десктопное меню */}
        <div className="nav-menu desktop-menu">
          {menuItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => handlePageChange(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Мобильное меню */}
        <div className="mobile-menu">
          <button 
            className="menu-toggle"
            onClick={handleMenuToggle}
            aria-label="Открыть меню"
          >
            <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </div>

      {/* Мобильное выпадающее меню */}
      {isMenuOpen && (
        <div className="mobile-dropdown">
          {menuItems.map(item => (
            <button
              key={item.id}
              className={`mobile-nav-item ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => handlePageChange(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navigation;

