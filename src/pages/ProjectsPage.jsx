import React, { useState } from 'react';
import { generateProjectId } from '../utils/idGenerator';
import { formatDate } from '../utils/dateUtils';

/**
 * Страница управления проектами
 */
const ProjectsPage = () => {
  // Состояние для демонстрации
  const [projects] = useState([
    {
      id: generateProjectId(),
      name: 'Веб-приложение Task Manager',
      description: 'Разработка современного приложения для управления задачами',
      status: 'active',
      createdAt: new Date().toISOString(),
      tasksCount: 15,
      completedTasks: 8
    },
    {
      id: generateProjectId(),
      name: 'Мобильное приложение',
      description: 'Создание мобильной версии приложения',
      status: 'planning',
      createdAt: new Date().toISOString(),
      tasksCount: 0,
      completedTasks: 0
    },
    {
      id: generateProjectId(),
      name: 'Документация API',
      description: 'Написание документации для REST API',
      status: 'completed',
      createdAt: new Date().toISOString(),
      tasksCount: 5,
      completedTasks: 5
    }
  ]);

  const getStatusLabel = (status) => {
    const statusLabels = {
      'planning': 'Планирование',
      'active': 'Активный',
      'completed': 'Завершен',
      'cancelled': 'Отменен'
    };
    return statusLabels[status] || status;
  };

  const getStatusClass = (status) => {
    return `status-${status}`;
  };

  const getProgressPercentage = (completed, total) => {
    if (total === 0) return 0;
    return Math.round((completed / total) * 100);
  };

  return (
    <div className="projects-page">
      <header className="page-header">
        <h1>Проекты</h1>
        <p className="page-subtitle">
          Управляйте своими проектами и отслеживайте прогресс
        </p>
        <button className="btn btn-primary">Создать новый проект</button>
      </header>

      <div className="projects-grid">
        {projects.map(project => (
          <div key={project.id} className="project-card">
            <div className="project-header">
              <h3 className="project-title">{project.name}</h3>
              <span className={`project-status ${getStatusClass(project.status)}`}>
                {getStatusLabel(project.status)}
              </span>
            </div>
            
            <p className="project-description">{project.description}</p>
            
            <div className="project-stats">
              <div className="stat">
                <span className="stat-label">Задач:</span>
                <span className="stat-value">{project.tasksCount}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Выполнено:</span>
                <span className="stat-value">{project.completedTasks}</span>
              </div>
            </div>
            
            <div className="project-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${getProgressPercentage(project.completedTasks, project.tasksCount)}%` }}
                ></div>
              </div>
              <span className="progress-text">
                {getProgressPercentage(project.completedTasks, project.tasksCount)}%
              </span>
            </div>
            
            <div className="project-meta">
              <span className="created-date">
                Создан: {formatDate(project.createdAt)}
              </span>
            </div>
            
            <div className="project-actions">
              <button className="btn btn-sm btn-outline">Просмотреть</button>
              <button className="btn btn-sm btn-primary">Редактировать</button>
            </div>
          </div>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="empty-state">
          <h3>Проекты не найдены</h3>
          <p>Создайте свой первый проект, чтобы начать работу</p>
          <button className="btn btn-primary">Создать проект</button>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;

