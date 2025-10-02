import { useState } from "react"
import Home from "./pages/Home.jsx"
import Projects from "./pages/Projects.jsx"
import Tasks from "./pages/Tasks.jsx"
import UserProfile from "./pages/UserProfile.jsx"
import ProjectPage from "./pages/ProjectPage.jsx"
import NavBar from "./components/NavBar.jsx"
import Container from "./components/Container.jsx"
import "./App.css"

const initialProjects = [
  {
    id: "1",
    name: "Учебный проект",
    description: "Лабы по СПП",
    status: "active",
    priority: "high",
    tags: ["учеба", "программирование"],
    createdAt: "2024-01-15T10:00:00Z",
    tasks: [
      {
        id: "t1",
        title: "Создать компонент TaskList",
        description: "Реализовать компонент для отображения списка задач",
        assignee: "Иван Иванов",
        status: "done",
        priority: "high",
        tags: ["frontend", "react"],
        createdAt: "2024-01-20T10:00:00Z"
      },
      {
        id: "t2",
        title: "Добавить анимации для карточек",
        description: "Создать плавные анимации при наведении и взаимодействии",
        assignee: "Мария Петрова",
        status: "in_progress",
        priority: "medium",
        tags: ["ui", "animations"],
        createdAt: "2024-01-21T14:30:00Z"
      },
      {
        id: "t3",
        title: "Настроить роутинг между страницами",
        description: "Добавить навигацию между разными разделами приложения",
        assignee: "Алексей Сидоров",
        status: "todo",
        priority: "low",
        tags: ["routing", "navigation"],
        createdAt: "2024-01-22T09:15:00Z"
      }
    ]
  },
  {
    id: "2",
    name: "Личный сайт",
    description: "Портфолио и блог",
    status: "planning",
    priority: "medium",
    tags: ["дизайн", "веб"],
    createdAt: "2024-01-20T10:00:00Z",
    tasks: [
      {
        id: "t4",
        title: "Создать дизайн главной страницы",
        description: "Разработать макет и дизайн для главной страницы сайта",
        assignee: "Елена Козлова",
        status: "todo",
        priority: "high",
        tags: ["design", "ui"],
        createdAt: "2024-01-25T10:00:00Z"
      }
    ]
  },
  {
    id: "3",
    name: "Мобильное приложение",
    description: "Трекер привычек",
    status: "planning",
    priority: "low",
    tags: ["мобильная разработка", "привычки"],
    createdAt: "2024-01-25T10:00:00Z",
    tasks: []
  }
]

export default function App() {
  const [currentPage, setCurrentPage] = useState("home")
  const [currentProjectId, setCurrentProjectId] = useState(null)
  const [projects, setProjects] = useState(initialProjects)

  const handleProjectView = (projectId) => {
    setCurrentProjectId(projectId)
    setCurrentPage("project")
  }

  const handleProjectCreate = (projectData) => {
    const newProject = {
      ...projectData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      tasks: []
    }
    setProjects(prev => [...prev, newProject])
  }

  const handleProjectUpdate = (projectId, updates) => {
    setProjects(prev => 
      prev.map(project => 
        project.id === projectId ? { ...project, ...updates } : project
      )
    )
  }

  const handleProjectDelete = (projectId) => {
    setProjects(prev => prev.filter(project => project.id !== projectId))
    if (currentProjectId === projectId) {
      setCurrentPage("projects")
      setCurrentProjectId(null)
    }
  }

  const handleTaskCreate = (projectId, taskData) => {
    setProjects(prev => 
      prev.map(project => 
        project.id === projectId 
          ? { ...project, tasks: [...(project.tasks || []), taskData] }
          : project
      )
    )
  }

  const handleTaskUpdate = (projectId, taskId, updates) => {
    setProjects(prev => 
      prev.map(project => 
        project.id === projectId 
          ? { 
              ...project, 
              tasks: project.tasks.map(task => 
                task.id === taskId ? { ...task, ...updates } : task
              )
            }
          : project
      )
    )
  }

  const handleTaskDelete = (projectId, taskId) => {
    setProjects(prev => 
      prev.map(project => 
        project.id === projectId 
          ? { ...project, tasks: project.tasks.filter(task => task.id !== taskId) }
          : project
      )
    )
  }

  const currentProject = projects.find(p => p.id === currentProjectId)

  return (
    <div className="app-root">
      <header className="app-header">
        <NavBar 
          current={currentPage} 
          onChange={(page) => {
            console.log("Changing page to:", page)
            setCurrentPage(page)
            if (page !== "project") {
              setCurrentProjectId(null)
            }
          }} 
        />
      </header>
      <main className="app-content">
        <Container>
          {/* Debug info */}
          <div style={{ 
            position: "fixed", 
            top: "10px", 
            right: "10px", 
            background: "var(--card)", 
            padding: "10px", 
            borderRadius: "8px", 
            border: "1px solid var(--border)",
            fontSize: "12px",
            zIndex: 1000
          }}>
            Current: {currentPage}
          </div>
          
          {currentPage === "home" && <Home />}
          {currentPage === "projects" && (
            <div>
              <h1 style={{ color: "red", fontSize: "48px" }}>PROJECTS PAGE LOADED</h1>
              <Projects 
                projects={projects}
                onProjectView={handleProjectView}
                onProjectCreate={handleProjectCreate}
                onProjectUpdate={handleProjectUpdate}
                onProjectDelete={handleProjectDelete}
              />
            </div>
          )}
          {currentPage === "tasks" && <Tasks />}
          {currentPage === "profile" && <UserProfile />}
          {currentPage === "project" && currentProject && (
            <ProjectPage 
              project={currentProject}
              onTaskCreate={(taskData) => handleTaskCreate(currentProjectId, taskData)}
              onTaskUpdate={(taskId, updates) => handleTaskUpdate(currentProjectId, taskId, updates)}
              onTaskDelete={(taskId) => handleTaskDelete(currentProjectId, taskId)}
            />
          )}
        </Container>
      </main>
    </div>
  )
}

