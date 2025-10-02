import { useState } from "react"
import Badge from "./Badge.jsx"
import Button from "./Button.jsx"
import ProgressBar from "./ProgressBar.jsx"

export default function ProjectCard({ 
  project, 
  onEdit, 
  onDelete, 
  onView,
  className = "" 
}) {
  const [isHovered, setIsHovered] = useState(false)

  const getStatusBadge = (status) => {
    const statusMap = {
      active: { variant: "success", label: "Активный" },
      planning: { variant: "warning", label: "В планах" },
      completed: { variant: "info", label: "Завершен" },
      paused: { variant: "danger", label: "Приостановлен" }
    }
    const config = statusMap[status] || { variant: "default", label: status }
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const getPriorityBadge = (priority) => {
    const priorityMap = {
      high: { variant: "danger", label: "Высокий" },
      medium: { variant: "warning", label: "Средний" },
      low: { variant: "info", label: "Низкий" }
    }
    const config = priorityMap[priority] || { variant: "default", label: priority }
    return <Badge variant={config.variant} size="small">{config.label}</Badge>
  }

  const completedTasks = project.tasks?.filter(task => task.status === 'done').length || 0
  const totalTasks = project.tasks?.length || 0
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  return (
    <div 
      className={`card ${className}`}
      style={{ 
        cursor: "pointer",
        transform: isHovered ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.3s ease"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onView && onView(project.id)}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ 
            margin: "0 0 8px 0", 
            fontSize: "20px", 
            fontWeight: "600",
            color: "var(--text)"
          }}>
            {project.name}
          </h3>
          <p style={{ 
            margin: "0 0 12px 0", 
            color: "var(--muted)", 
            fontSize: "14px",
            lineHeight: "1.5"
          }}>
            {project.description}
          </p>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {getStatusBadge(project.status)}
          {getPriorityBadge(project.priority)}
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <ProgressBar 
          value={progress} 
          label={`${progress}% завершено`}
          variant={progress === 100 ? "success" : "primary"}
        />
      </div>

      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        marginBottom: 16 
      }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {project.tags?.map(tag => (
            <Badge key={tag} variant="default" size="small">{tag}</Badge>
          ))}
        </div>
        <div style={{ fontSize: "14px", color: "var(--muted)", fontWeight: "500" }}>
          {completedTasks}/{totalTasks} задач
        </div>
      </div>

      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        paddingTop: 16,
        borderTop: "1px solid var(--border)"
      }}>
        <div style={{ fontSize: "12px", color: "var(--muted)" }}>
          Создан: {new Date(project.createdAt).toLocaleDateString()}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button 
            style={{ 
              background: "none", 
              border: "none", 
              color: "var(--primary)", 
              cursor: "pointer", 
              fontSize: "12px",
              padding: "4px 8px",
              borderRadius: "4px",
              transition: "background 0.2s ease"
            }}
            onClick={(e) => {
              e.stopPropagation()
              onEdit && onEdit(project.id)
            }}
            onMouseEnter={(e) => e.target.style.background = "rgba(99, 102, 241, 0.1)"}
            onMouseLeave={(e) => e.target.style.background = "none"}
          >
            Редактировать
          </button>
          <button 
            style={{ 
              background: "none", 
              border: "none", 
              color: "var(--muted)", 
              cursor: "pointer", 
              fontSize: "12px",
              padding: "4px 8px",
              borderRadius: "4px",
              transition: "background 0.2s ease"
            }}
            onClick={(e) => {
              e.stopPropagation()
              onDelete && onDelete(project.id)
            }}
            onMouseEnter={(e) => e.target.style.background = "rgba(239, 68, 68, 0.1)"}
            onMouseLeave={(e) => e.target.style.background = "none"}
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  )
}

