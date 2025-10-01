import React from 'react';
import { getCurrentDate, formatDate } from '../utils/dateUtils';
import { getTaskStatistics } from '../utils/taskFilter';

/**
 * Главная страница приложения
 */
const HomePage = () => {
  // Пример данных для демонстрации
  const sampleTasks = [
    { id: 1, title: 'Задача 1', status: 'todo', dueDate: getCurrentDate() },
    { id: 2, title: 'Задача 2', status: 'in_progress', dueDate: getCurrentDate() },
    { id: 3, title: 'Задача 3', status: 'done', dueDate: getCurrentDate() },
  ];

  const stats = getTaskStatistics(sampleTasks);

  return (
    <div className="home-page">
      <header className="page-header">
        <h1>Добро пожаловать в Task Manager</h1>
        <p className="page-subtitle">
          Управляйте своими задачами эффективно
        </p>
      </header>

      <div className="dashboard">
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Всего задач</h3>
            <div className="stat-number">{stats.total}</div>
          </div>
          
          <div className="stat-card">
            <h3>К выполнению</h3>
            <div className="stat-number">{stats.todo}</div>
          </div>
          
          <div className="stat-card">
            <h3>В работе</h3>
            <div className="stat-number">{stats.in_progress}</div>
          </div>
          
          <div className="stat-card">
            <h3>Выполнено</h3>
            <div className="stat-number">{stats.done}</div>
          </div>
        </div>

        <div className="recent-activity">
          <h2>Последняя активность</h2>
          <div className="activity-list">
            <div className="activity-item">
              <span className="activity-time">{formatDate(getCurrentDate())}</span>
              <span className="activity-text">Создана новая задача "Задача 1"</span>
            </div>
            <div className="activity-item">
              <span className="activity-time">{formatDate(getCurrentDate())}</span>
              <span className="activity-text">Задача "Задача 2" переведена в работу</span>
            </div>
            <div className="activity-item">
              <span className="activity-time">{formatDate(getCurrentDate())}</span>
              <span className="activity-text">Задача "Задача 3" выполнена</span>
            </div>
          </div>
        </div>

        <div className="quick-actions">
          <h2>Быстрые действия</h2>
          <div className="action-buttons">
            <button className="btn btn-primary">Создать задачу</button>
            <button className="btn btn-secondary">Создать проект</button>
            <button className="btn btn-outline">Просмотреть все задачи</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

