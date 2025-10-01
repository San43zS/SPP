/**
 * Генератор уникальных ID
 */

/**
 * Генерирует уникальный ID на основе текущего времени и случайного числа
 * @returns {string} Уникальный ID
 */
export const generateId = () => {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substr(2, 5);
  return `${timestamp}-${randomPart}`;
};

/**
 * Генерирует UUID v4
 * @returns {string} UUID v4
 */
export const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

/**
 * Генерирует короткий ID для задач
 * @returns {string} Короткий ID
 */
export const generateTaskId = () => {
  return `task-${generateId()}`;
};

/**
 * Генерирует ID для проекта
 * @returns {string} ID проекта
 */
export const generateProjectId = () => {
  return `project-${generateId()}`;
};

