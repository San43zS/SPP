/**
 * Утилиты для фильтрации задач по статусу
 */

// Константы статусов задач
export const TASK_STATUS = {
  TODO: 'todo',
  IN_PROGRESS: 'in_progress',
  DONE: 'done',
  CANCELLED: 'cancelled'
};

// Локализованные названия статусов
export const TASK_STATUS_LABELS = {
  [TASK_STATUS.TODO]: 'К выполнению',
  [TASK_STATUS.IN_PROGRESS]: 'В работе',
  [TASK_STATUS.DONE]: 'Выполнено',
  [TASK_STATUS.CANCELLED]: 'Отменено'
};

/**
 * Фильтрует задачи по статусу
 * @param {Array} tasks - Массив задач
 * @param {string} status - Статус для фильтрации
 * @returns {Array} Отфильтрованные задачи
 */
export const filterTasksByStatus = (tasks, status) => {
  if (!Array.isArray(tasks)) {
    return [];
  }
  
  if (!status || status === 'all') {
    return tasks;
  }
  
  return tasks.filter(task => task.status === status);
};

/**
 * Фильтрует задачи по нескольким статусам
 * @param {Array} tasks - Массив задач
 * @param {Array} statuses - Массив статусов для фильтрации
 * @returns {Array} Отфильтрованные задачи
 */
export const filterTasksByStatuses = (tasks, statuses) => {
  if (!Array.isArray(tasks) || !Array.isArray(statuses)) {
    return [];
  }
  
  if (statuses.length === 0) {
    return tasks;
  }
  
  return tasks.filter(task => statuses.includes(task.status));
};

/**
 * Получает статистику по задачам
 * @param {Array} tasks - Массив задач
 * @returns {Object} Статистика по статусам
 */
export const getTaskStatistics = (tasks) => {
  if (!Array.isArray(tasks)) {
    return {
      total: 0,
      [TASK_STATUS.TODO]: 0,
      [TASK_STATUS.IN_PROGRESS]: 0,
      [TASK_STATUS.DONE]: 0,
      [TASK_STATUS.CANCELLED]: 0
    };
  }
  
  const stats = {
    total: tasks.length,
    [TASK_STATUS.TODO]: 0,
    [TASK_STATUS.IN_PROGRESS]: 0,
    [TASK_STATUS.DONE]: 0,
    [TASK_STATUS.CANCELLED]: 0
  };
  
  tasks.forEach(task => {
    if (task.status && stats.hasOwnProperty(task.status)) {
      stats[task.status]++;
    }
  });
  
  return stats;
};

/**
 * Сортирует задачи по статусу
 * @param {Array} tasks - Массив задач
 * @param {string} order - Порядок сортировки ('asc' или 'desc')
 * @returns {Array} Отсортированные задачи
 */
export const sortTasksByStatus = (tasks, order = 'asc') => {
  if (!Array.isArray(tasks)) {
    return [];
  }
  
  const statusOrder = {
    [TASK_STATUS.TODO]: 1,
    [TASK_STATUS.IN_PROGRESS]: 2,
    [TASK_STATUS.DONE]: 3,
    [TASK_STATUS.CANCELLED]: 4
  };
  
  return [...tasks].sort((a, b) => {
    const aOrder = statusOrder[a.status] || 999;
    const bOrder = statusOrder[b.status] || 999;
    
    return order === 'asc' ? aOrder - bOrder : bOrder - aOrder;
  });
};

/**
 * Получает задачи с истекшим сроком
 * @param {Array} tasks - Массив задач
 * @returns {Array} Задачи с истекшим сроком
 */
export const getOverdueTasks = (tasks) => {
  if (!Array.isArray(tasks)) {
    return [];
  }
  
  const now = new Date();
  
  return tasks.filter(task => {
    if (!task.dueDate || task.status === TASK_STATUS.DONE || task.status === TASK_STATUS.CANCELLED) {
      return false;
    }
    
    const dueDate = new Date(task.dueDate);
    return dueDate < now;
  });
};

/**
 * Получает задачи на сегодня
 * @param {Array} tasks - Массив задач
 * @returns {Array} Задачи на сегодня
 */
export const getTodayTasks = (tasks) => {
  if (!Array.isArray(tasks)) {
    return [];
  }
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  return tasks.filter(task => {
    if (!task.dueDate) {
      return false;
    }
    
    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    
    return dueDate >= today && dueDate < tomorrow;
  });
};

