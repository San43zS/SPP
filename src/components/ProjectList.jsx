import { useState } from "react"
import ProjectCard from "./ProjectCard.jsx"
import Input from "./Input.jsx"
import Button from "./Button.jsx"

export default function ProjectList({ 
  projects = [], 
  onProjectEdit, 
  onProjectDelete, 
  onProjectView,
  onProjectCreate,
  className = ""
}) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")
  const [sortBy, setSortBy] = useState("createdAt")

  const filteredProjects = projects.filter(project => {
    const matchesFilter = filter === "all" || project.status === filter
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name)
      case "progress":
        const aProgress = a.tasks?.length > 0 ? 
          (a.tasks.filter(t => t.status === 'done').length / a.tasks.length) * 100 : 0
        const bProgress = b.tasks?.length > 0 ? 
          (b.tasks.filter(t => t.status === 'done').length / b.tasks.length) * 100 : 0
        return bProgress - aProgress
      case "tasks":
        return (b.tasks?.length || 0) - (a.tasks?.length || 0)
      case "createdAt":
      default:
        return new Date(b.createdAt) - new Date(a.createdAt)
    }
  })

  return (
    <div className={className}>
      
      {/* Header with search and filters */}
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        marginBottom: 32,
        flexWrap: "wrap",
        gap: 16
      }}>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
          <Input
            placeholder="Поиск проектов..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
            }
            style={{ minWidth: 300 }}
          />
          
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              padding: "12px 16px",
              background: "var(--bg-elev)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              color: "var(--text)",
              fontSize: "14px",
              minWidth: 140
            }}
          >
            <option value="all">Все проекты</option>
            <option value="active">Активные</option>
            <option value="planning">В планах</option>
            <option value="completed">Завершенные</option>
            <option value="paused">Приостановленные</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: "12px 16px",
              background: "var(--bg-elev)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              color: "var(--text)",
              fontSize: "14px",
              minWidth: 140
            }}
          >
            <option value="createdAt">По дате создания</option>
            <option value="name">По названию</option>
            <option value="progress">По прогрессу</option>
            <option value="tasks">По количеству задач</option>
          </select>
        </div>

        <Button onClick={onProjectCreate}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Новый проект
        </Button>
      </div>

      {/* Projects Grid */}
      {sortedProjects.length > 0 ? (
        <div className="grid sm-2 md-3 lg-4" style={{ gap: 24 }}>
          {sortedProjects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={onProjectEdit}
              onDelete={onProjectDelete}
              onView={onProjectView}
            />
          ))}
        </div>
      ) : (
        <div style={{ 
          textAlign: "center", 
          padding: "60px 20px", 
          color: "var(--muted)",
          background: "var(--bg-elev)",
          borderRadius: "12px",
          border: "1px solid var(--border)"
        }}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" style={{ margin: "0 auto 24px" }}>
            <path d="M3 3h18v18H3zM9 9h6v6H9z"/>
          </svg>
          <h3 style={{ margin: "0 0 12px 0", fontSize: "20px", fontWeight: "600" }}>
            {searchTerm || filter !== "all" ? "Проекты не найдены" : "Нет проектов"}
          </h3>
          <p style={{ margin: "0 0 24px 0", fontSize: "16px" }}>
            {searchTerm || filter !== "all" 
              ? "Попробуйте изменить фильтры или создать новый проект" 
              : "Создайте свой первый проект для начала работы"
            }
          </p>
          {(!searchTerm && filter === "all") && (
            <Button onClick={onProjectCreate}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Создать первый проект
            </Button>
          )}
        </div>
      )}

      {/* Stats */}
      {sortedProjects.length > 0 && (
        <div style={{ 
          marginTop: 32, 
          padding: "20px", 
          background: "var(--bg-elev)", 
          borderRadius: "12px",
          border: "1px solid var(--border)"
        }}>
          <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 16 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "24px", fontWeight: "700", color: "var(--text)" }}>
                {projects.length}
              </div>
              <div style={{ fontSize: "14px", color: "var(--muted)" }}>Всего проектов</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "24px", fontWeight: "700", color: "var(--text)" }}>
                {projects.filter(p => p.status === 'active').length}
              </div>
              <div style={{ fontSize: "14px", color: "var(--muted)" }}>Активных</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "24px", fontWeight: "700", color: "var(--text)" }}>
                {projects.reduce((sum, p) => sum + (p.tasks?.length || 0), 0)}
              </div>
              <div style={{ fontSize: "14px", color: "var(--muted)" }}>Всего задач</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "24px", fontWeight: "700", color: "var(--text)" }}>
                {Math.round(projects.reduce((sum, p) => {
                  const completed = p.tasks?.filter(t => t.status === 'done').length || 0
                  const total = p.tasks?.length || 0
                  return sum + (total > 0 ? (completed / total) * 100 : 0)
                }, 0) / Math.max(projects.length, 1))}%
              </div>
              <div style={{ fontSize: "14px", color: "var(--muted)" }}>Средний прогресс</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

