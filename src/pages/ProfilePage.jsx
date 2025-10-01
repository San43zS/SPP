import React, { useState } from 'react';
import { formatDate, getCurrentDate } from '../utils/dateUtils';
import { getTaskStatistics } from '../utils/taskFilter';

/**
 * Страница профиля пользователя
 */
const ProfilePage = () => {
  // Состояние пользователя для демонстрации
  const [user] = useState({
    id: 1,
    name: 'Иван Иванов',
    email: 'ivan.ivanov@example.com',
    role: 'Разработчик',
    avatar: null,
    joinDate: '2024-01-15T10:00:00Z',
    lastLogin: getCurrentDate(),
    preferences: {
      theme: 'light',
      language: 'ru',
      notifications: true
    }
  });

  // Пример статистики пользователя
  const userStats = {
    totalTasks: 45,
    completedTasks: 32,
    activeProjects: 3,
    completedProjects: 1,
    averageTaskTime: '2.5 часа',
    productivity: 85
  };

  const taskStats = getTaskStatistics([
    { status: 'todo' },
    { status: 'in_progress' },
    { status: 'done' },
    { status: 'done' },
    { status: 'done' }
  ]);

  return (
    <div className="profile-page">
      <header className="page-header">
        <h1>Профиль пользователя</h1>
        <p className="page-subtitle">
          Управляйте своими настройками и просматривайте статистику
        </p>
      </header>

      <div className="profile-content">
        <div className="profile-section">
          <div className="profile-card">
            <div className="profile-header">
              <div className="avatar">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} />
                ) : (
                  <div className="avatar-placeholder">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </div>
                )}
              </div>
              <div className="profile-info">
                <h2>{user.name}</h2>
                <p className="user-role">{user.role}</p>
                <p className="user-email">{user.email}</p>
              </div>
            </div>
            
            <div className="profile-meta">
              <div className="meta-item">
                <span className="meta-label">Дата регистрации:</span>
                <span className="meta-value">{formatDate(user.joinDate)}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Последний вход:</span>
                <span className="meta-value">{formatDate(user.lastLogin)}</span>
              </div>
            </div>
            
            <div className="profile-actions">
              <button className="btn btn-primary">Редактировать профиль</button>
              <button className="btn btn-outline">Изменить пароль</button>
            </div>
          </div>
        </div>

        <div className="stats-section">
          <h3>Статистика работы</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <h4>Всего задач</h4>
              <div className="stat-number">{userStats.totalTasks}</div>
            </div>
            
            <div className="stat-card">
              <h4>Выполнено</h4>
              <div className="stat-number">{userStats.completedTasks}</div>
            </div>
            
            <div className="stat-card">
              <h4>Активных проектов</h4>
              <div className="stat-number">{userStats.activeProjects}</div>
            </div>
            
            <div className="stat-card">
              <h4>Завершенных проектов</h4>
              <div className="stat-number">{userStats.completedProjects}</div>
            </div>
            
            <div className="stat-card">
              <h4>Среднее время задачи</h4>
              <div className="stat-number">{userStats.averageTaskTime}</div>
            </div>
            
            <div className="stat-card">
              <h4>Продуктивность</h4>
              <div className="stat-number">{userStats.productivity}%</div>
            </div>
          </div>
        </div>

        <div className="preferences-section">
          <h3>Настройки</h3>
          <div className="preferences-card">
            <div className="preference-item">
              <label>
                <input 
                  type="checkbox" 
                  checked={user.preferences.notifications}
                  readOnly
                />
                Уведомления
              </label>
            </div>
            
            <div className="preference-item">
              <label>
                Тема:
                <select value={user.preferences.theme} disabled>
                  <option value="light">Светлая</option>
                  <option value="dark">Темная</option>
                </select>
              </label>
            </div>
            
            <div className="preference-item">
              <label>
                Язык:
                <select value={user.preferences.language} disabled>
                  <option value="ru">Русский</option>
                  <option value="en">English</option>
                </select>
              </label>
            </div>
            
            <div className="preference-actions">
              <button className="btn btn-primary">Сохранить настройки</button>
            </div>
          </div>
        </div>

        <div className="recent-activity-section">
          <h3>Последняя активность</h3>
          <div className="activity-list">
            <div className="activity-item">
              <span className="activity-time">{formatDate(getCurrentDate())}</span>
              <span className="activity-text">Завершена задача "Реализовать авторизацию"</span>
            </div>
            <div className="activity-item">
              <span className="activity-time">{formatDate(getCurrentDate())}</span>
              <span className="activity-text">Создан новый проект "Мобильное приложение"</span>
            </div>
            <div className="activity-item">
              <span className="activity-time">{formatDate(getCurrentDate())}</span>
              <span className="activity-text">Обновлен профиль пользователя</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

