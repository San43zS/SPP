FROM node:18-alpine

# Рабочая директория
WORKDIR /app

# Копируем package.json и package-lock.json (если есть)
COPY package*.json ./

# Установка зависимостей
RUN npm ci

# Копируем исходный код
COPY . .

# Сборка приложения (Vite создаст dist/)
RUN npm run build

# Открываем порт для vite preview (по умолчанию 4173, но используем 5173)
EXPOSE 5173

# Запуск предпросмотра продакшн-сборки
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "5173"]

