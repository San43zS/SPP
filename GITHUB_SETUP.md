# Инструкции по созданию репозитория на GitHub

## 1. Создание репозитория на GitHub

1. Перейдите на [GitHub.com](https://github.com) и войдите в свой аккаунт
2. Нажмите на кнопку "New" или "+" в правом верхнем углу
3. Выберите "New repository"
4. Заполните форму:
   - **Repository name**: `task-manager-react`
   - **Description**: `Современное React приложение для управления задачами`
   - **Visibility**: Public (или Private, если предпочитаете)
   - **Initialize this repository with**: НЕ отмечайте никаких опций (README, .gitignore, license)
5. Нажмите "Create repository"

## 2. Инициализация локального Git репозитория

Выполните следующие команды в терминале в корневой папке проекта:

```bash
# Инициализация Git репозитория
git init

# Добавление всех файлов в индекс
git add .

# Создание первого коммита
git commit -m "Initial commit: Task Manager React app with Docker support"

# Добавление удаленного репозитория (замените YOUR_USERNAME на ваш GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/task-manager-react.git

# Переименование основной ветки в main (если нужно)
git branch -M main

# Отправка кода в GitHub
git push -u origin main
```

## 3. Настройка .gitignore

Убедитесь, что у вас есть файл `.gitignore` со следующим содержимым:

```gitignore
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Production builds
dist/
build/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# nyc test coverage
.nyc_output
```

## 4. Создание файла .gitignore

Если файл `.gitignore` отсутствует, создайте его:

```bash
# Создание .gitignore файла
echo "node_modules/
dist/
build/
.env
*.log
.DS_Store
.vscode/
.idea/" > .gitignore
```

## 5. Дополнительные настройки GitHub

### Настройка GitHub Pages (опционально)

1. Перейдите в Settings вашего репозитория
2. Найдите раздел "Pages" в левом меню
3. В разделе "Source" выберите "GitHub Actions"
4. Создайте файл `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

### Настройка Issues и Projects

1. В настройках репозитория включите Issues
2. Создайте шаблоны для Issues и Pull Requests
3. Настройте Projects для отслеживания задач

## 6. Проверка

После выполнения всех шагов:

1. Убедитесь, что все файлы загружены в репозиторий
2. Проверьте, что README.md отображается корректно
3. Убедитесь, что Docker файлы присутствуют
4. Проверьте, что приложение можно клонировать и запустить

## 7. Команды для клонирования и запуска

Другие разработчики смогут клонировать и запустить проект:

```bash
# Клонирование репозитория
git clone https://github.com/YOUR_USERNAME/task-manager-react.git

# Переход в папку проекта
cd task-manager-react

# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Или запуск с Docker
docker-compose up --build
```

## 8. Дополнительные рекомендации

- Добавьте описание проекта в README.md
- Создайте Issues для планирования новых функций
- Используйте ветки для разработки новых функций
- Настройте автоматические проверки кода (CI/CD)
- Добавьте лицензию (например, MIT License)

