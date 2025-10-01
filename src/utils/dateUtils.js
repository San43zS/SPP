/**
 * Утилиты для работы с датами
 */

/**
 * Форматирует дату в читаемый формат
 * @param {Date|string} date - Дата для форматирования
 * @param {string} locale - Локаль (по умолчанию 'ru-RU')
 * @returns {string} Отформатированная дата
 */
export const formatDate = (date, locale = 'ru-RU') => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return 'Неверная дата';
  }
  
  return dateObj.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Форматирует дату и время
 * @param {Date|string} date - Дата для форматирования
 * @param {string} locale - Локаль (по умолчанию 'ru-RU')
 * @returns {string} Отформатированная дата и время
 */
export const formatDateTime = (date, locale = 'ru-RU') => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return 'Неверная дата';
  }
  
  return dateObj.toLocaleString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Получает текущую дату в формате ISO
 * @returns {string} Текущая дата в формате ISO
 */
export const getCurrentDate = () => {
  return new Date().toISOString();
};

/**
 * Проверяет, является ли дата сегодняшней
 * @param {Date|string} date - Дата для проверки
 * @returns {boolean} true, если дата сегодняшняя
 */
export const isToday = (date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  
  return dateObj.getDate() === today.getDate() &&
         dateObj.getMonth() === today.getMonth() &&
         dateObj.getFullYear() === today.getFullYear();
};

/**
 * Проверяет, является ли дата вчерашней
 * @param {Date|string} date - Дата для проверки
 * @returns {boolean} true, если дата вчерашняя
 */
export const isYesterday = (date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  
  return dateObj.getDate() === yesterday.getDate() &&
         dateObj.getMonth() === yesterday.getMonth() &&
         dateObj.getFullYear() === yesterday.getFullYear();
};

/**
 * Вычисляет разность в днях между двумя датами
 * @param {Date|string} date1 - Первая дата
 * @param {Date|string} date2 - Вторая дата
 * @returns {number} Разность в днях
 */
export const getDaysDifference = (date1, date2) => {
  const d1 = typeof date1 === 'string' ? new Date(date1) : date1;
  const d2 = typeof date2 === 'string' ? new Date(date2) : date2;
  
  const timeDiff = Math.abs(d2.getTime() - d1.getTime());
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};

/**
 * Добавляет дни к дате
 * @param {Date|string} date - Исходная дата
 * @param {number} days - Количество дней для добавления
 * @returns {Date} Новая дата
 */
export const addDays = (date, days) => {
  const dateObj = typeof date === 'string' ? new Date(date) : new Date(date);
  dateObj.setDate(dateObj.getDate() + days);
  return dateObj;
};

