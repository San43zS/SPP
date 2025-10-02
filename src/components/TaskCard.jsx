import { useState } from "react"
import Badge from "./Badge.jsx"
import Button from "./Button.jsx"

export default function TaskCard({ 
  task, 
  onEdit, 
  onDelete, 
  onStatusChange,
  className = "",
  isDragging = false
}) {
  const [isHovered, setIsHovered] = useState(false)

  const getStatusBadge = (status) => {
    const statusMap = {
      todo: { variant: "default", label: "К выполнению" },
      in_progress: { variant: "warning", label: "В работе" },
      done: { variant: "success", label: "Выполнено" },
      blocked: { variant: "danger", label: "Заблокировано" }
    }
    const config = statusMap[status] || { variant: "default", label: status }
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const getPriorityBadge = (priority) => {
    const priorityMap = {
      low: { variant: "info", label: "Низкий" },
      medium: { variant: "warning", label: "Средний" },
      high: { variant: "danger", label: "Высокий" }
    }
    const config = priorityMap[priority] || { variant: "default", label: priority }
    return <Badge variant={config.variant} size="small">{config.label}</Badge>
  }

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const getStatusColor = (status) => {
    const colors = {
      todo: "var(--muted)",
      in_progress: "#f59e0b",
      done: "#22c55e",
      blocked: "#ef4444"
    }
    return colors[status] || "var(--muted)"
  }

  return (
    <div 
      className={`card ${className}`}
      style={{ 
        cursor: "grab",
        transform: isHovered ? "translateY(-2px)" : "translateY(0)",
        transition: "all 0.2s ease",
        opacity: isDragging ? 0.5 : 1,
        borderLeft: `4px solid ${getStatusColor(task.status)}`,
        minHeight: "140px"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.effectAllowed = "move"
        e.dataTransfer.setData("text/plain", task.id)
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div style={{ flex: 1 }}>
          <h4 style={{ 
            margin: "0 0 8px 0", 
            fontSize: "16px", 
            fontWeight: "600",
            color: "var(--text)",
            lineHeight: "1.4"
          }}>
            {task.title}
          </h4>
          {task.description && (
            <p style={{ 
              margin: "0 0 12px 0", 
              color: "var(--muted)", 
              fontSize: "14px",
              lineHeight: "1.5"
            }}>
              {task.description}
            </p>
          )}
        </div>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {getPriorityBadge(task.priority)}
        </div>
      </div>

      {/* Assignee */}
      {task.assignee && (
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: 8, 
          marginBottom: 12,
          padding: "8px 12px",
          background: "var(--bg-elev)",
          borderRadius: "8px"
        }}>
          <div style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: "linear-gradient(135deg, var(--primary), var(--primary-600))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "12px",
            fontWeight: "bold"
          }}>
            {getInitials(task.assignee)}
          </div>
          <span style={{ fontSize: "14px", color: "var(--text)" }}>{task.assignee}</span>
        </div>
      )}

      {/* Tags */}
      {task.tags && task.tags.length > 0 && (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
          {task.tags.map(tag => (
            <Badge key={tag} variant="default" size="small">{tag}</Badge>
          ))}
        </div>
      )}

      {/* Footer */}
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        paddingTop: 12,
        borderTop: "1px solid var(--border)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {getStatusBadge(task.status)}
          <span style={{ fontSize: "12px", color: "var(--muted)" }}>
            {new Date(task.createdAt).toLocaleDateString()}
          </span>
        </div>
        
        <div style={{ display: "flex", gap: 4 }}>
          <button 
            style={{ 
              background: "none", 
              border: "none", 
              color: "var(--primary)", 
              cursor: "pointer", 
              padding: "4px",
              borderRadius: "4px",
              transition: "background 0.2s ease"
            }}
            onClick={(e) => {
              e.stopPropagation()
              onEdit && onEdit(task.id)
            }}
            onMouseEnter={(e) => e.target.style.background = "rgba(99, 102, 241, 0.1)"}
            onMouseLeave={(e) => e.target.style.background = "none"}
            title="Редактировать"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
          <button 
            style={{ 
              background: "none", 
              border: "none", 
              color: "var(--muted)", 
              cursor: "pointer", 
              padding: "4px",
              borderRadius: "4px",
              transition: "background 0.2s ease"
            }}
            onClick={(e) => {
              e.stopPropagation()
              onDelete && onDelete(task.id)
            }}
            onMouseEnter={(e) => e.target.style.background = "rgba(239, 68, 68, 0.1)"}
            onMouseLeave={(e) => e.target.style.background = "none"}
            title="Удалить"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3,6 5,6 21,6"/>
              <path d="M19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
