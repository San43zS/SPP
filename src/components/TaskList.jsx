import { useState } from "react"
import Badge from "./Badge.jsx"
import Button from "./Button.jsx"
import Input from "./Input.jsx"

export default function TaskList({ tasks = [], onTaskUpdate, onTaskAdd }) {
  const [newTask, setNewTask] = useState("")
  const [isAdding, setIsAdding] = useState(false)

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

  const handleAddTask = () => {
    if (newTask.trim() && onTaskAdd) {
      onTaskAdd({
        id: Date.now().toString(),
        title: newTask,
        status: "todo",
        priority: "medium",
        createdAt: new Date().toISOString()
      })
      setNewTask("")
      setIsAdding(false)
    }
  }

  const handleStatusChange = (taskId, newStatus) => {
    if (onTaskUpdate) {
      onTaskUpdate(taskId, { status: newStatus })
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ margin: 0 }}>Задачи</h3>
        <Button 
          size="small"
          onClick={() => setIsAdding(!isAdding)}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Добавить задачу
        </Button>
      </div>

      {isAdding && (
        <div style={{ 
          padding: 16, 
          background: "var(--bg-elev)", 
          borderRadius: 8, 
          border: "1px solid var(--border)" 
        }}>
          <Input
            placeholder="Введите название задачи..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12l2 2 4-4"/>
                <circle cx="12" cy="12" r="10"/>
              </svg>
            }
          />
          <div style={{ display: "flex", gap: 8, marginTop: 12, justifyContent: "flex-end" }}>
            <Button 
              size="small"
              style={{ background: "var(--border)", color: "var(--text)" }}
              onClick={() => setIsAdding(false)}
            >
              Отмена
            </Button>
            <Button size="small" onClick={handleAddTask}>
              Добавить
            </Button>
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {tasks.length === 0 ? (
          <div style={{ 
            textAlign: "center", 
            padding: "32px 16px", 
            color: "var(--muted)",
            background: "var(--bg-elev)",
            borderRadius: 8,
            border: "1px solid var(--border)"
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" style={{ margin: "0 auto 12px" }}>
              <path d="M9 12l2 2 4-4"/>
              <circle cx="12" cy="12" r="10"/>
            </svg>
            <p style={{ margin: 0 }}>Нет задач. Добавьте первую задачу!</p>
          </div>
        ) : (
          tasks.map(task => (
            <div 
              key={task.id}
              style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: 12, 
                padding: 16, 
                background: "var(--bg-elev)", 
                borderRadius: 8, 
                border: "1px solid var(--border)",
                transition: "all 0.2s ease"
              }}
            >
              <div style={{ 
                width: 20, 
                height: 20, 
                borderRadius: "50%", 
                border: "2px solid var(--border)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: task.status === "done" ? "var(--primary)" : "transparent",
                transition: "all 0.2s ease"
              }}
              onClick={() => handleStatusChange(task.id, task.status === "done" ? "todo" : "done")}
            >
              {task.status === "done" && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                  <polyline points="20,6 9,17 4,12"/>
                </svg>
              )}
            </div>
              
              <div style={{ flex: 1 }}>
                <div style={{ 
                  fontWeight: 500, 
                  marginBottom: 4,
                  textDecoration: task.status === "done" ? "line-through" : "none",
                  opacity: task.status === "done" ? 0.6 : 1
                }}>
                  {task.title}
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  {getStatusBadge(task.status)}
                  {getPriorityBadge(task.priority)}
                  <span style={{ fontSize: 12, color: "var(--muted)" }}>
                    {new Date(task.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", gap: 4 }}>
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(task.id, e.target.value)}
                  style={{
                    padding: "4px 8px",
                    background: "var(--bg-elev)",
                    border: "1px solid var(--border)",
                    borderRadius: "4px",
                    color: "var(--text)",
                    fontSize: "12px"
                  }}
                >
                  <option value="todo">К выполнению</option>
                  <option value="in_progress">В работе</option>
                  <option value="done">Выполнено</option>
                  <option value="blocked">Заблокировано</option>
                </select>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

