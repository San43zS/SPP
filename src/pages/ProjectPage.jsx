import { useState } from "react"
import Container from "../components/Container.jsx"
import KanbanBoard from "../components/KanbanBoard.jsx"
import StatsCard from "../components/StatsCard.jsx"
import Badge from "../components/Badge.jsx"
import Button from "../components/Button.jsx"
import Modal from "../components/Modal.jsx"
import TaskForm from "../components/TaskForm.jsx"

export default function ProjectPage({ 
  project, 
  onTaskCreate, 
  onTaskUpdate, 
  onTaskDelete 
}) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  const handleTaskCreate = (taskData) => {
    const newTask = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    onTaskCreate(newTask)
  }

  const handleTaskUpdate = (taskId, updates) => {
    onTaskUpdate(taskId, { ...updates, updatedAt: new Date().toISOString() })
  }

  const handleTaskDelete = (taskId) => {
    onTaskDelete(taskId)
  }

  const handleTaskEdit = (taskId) => {
    const task = project.tasks?.find(t => t.id === taskId)
    setEditingTask(task)
    setIsEditModalOpen(true)
  }

  const handleTaskSubmit = (taskData) => {
    if (editingTask) {
      handleTaskUpdate(editingTask.id, taskData)
    } else {
      handleTaskCreate(taskData)
    }
    setEditingTask(null)
    setIsEditModalOpen(false)
  }

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

  if (!project) {
    return (
      <Container>
        <div style={{ 
          textAlign: "center", 
          padding: "60px 20px", 
          color: "var(--muted)" 
        }}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" style={{ margin: "0 auto 24px" }}>
            <path d="M3 3h18v18H3zM9 9h6v6H9z"/>
          </svg>
          <h2 style={{ margin: "0 0 12px 0" }}>Проект не найден</h2>
          <p style={{ margin: 0 }}>Проект с указанным ID не существует</p>
        </div>
      </Container>
    )
  }

  const tasks = project.tasks || []
  const completedTasks = tasks.filter(task => task.status === 'done').length
  const inProgressTasks = tasks.filter(task => task.status === 'in_progress').length
  const todoTasks = tasks.filter(task => task.status === 'todo').length
  const progress = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0

  const stats = [
    {
      title: "Всего задач",
      value: tasks.length.toString(),
      change: `+${tasks.filter(t => new Date(t.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}`,
      changeType: "positive",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 12l2 2 4-4"/>
          <circle cx="12" cy="12" r="10"/>
        </svg>
      )
    },
    {
      title: "Выполнено",
      value: completedTasks.toString(),
      change: `${progress}%`,
      changeType: "positive",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="20,6 9,17 4,12"/>
        </svg>
      )
    },
    {
      title: "В работе",
      value: inProgressTasks.toString(),
      change: "Активно",
      changeType: "neutral",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12,6 12,12 16,14"/>
        </svg>
      )
    },
    {
      title: "К выполнению",
      value: todoTasks.toString(),
      change: "Ожидает",
      changeType: "neutral",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      )
    }
  ]

  return (
    <Container>
      {/* Project Header */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
          <Button 
            style={{ background: "var(--border)", color: "var(--text)" }}
            onClick={() => window.history.back()}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15,18 9,12 15,6"/>
            </svg>
            Назад к проектам
          </Button>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
          <div style={{ flex: 1 }}>
            <h1 style={{ 
              margin: "0 0 12px 0", 
              fontSize: "36px", 
              fontWeight: "700",
              color: "var(--text)"
            }}>
              {project.name}
            </h1>
            <p style={{ 
              margin: "0 0 16px 0", 
              color: "var(--muted)", 
              fontSize: "18px",
              lineHeight: "1.6"
            }}>
              {project.description}
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
              {getStatusBadge(project.status)}
              {getPriorityBadge(project.priority)}
              <span style={{ fontSize: "14px", color: "var(--muted)" }}>
                Создан: {new Date(project.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          <Button onClick={() => setIsEditModalOpen(true)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            Редактировать проект
          </Button>
        </div>

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
            {project.tags.map(tag => (
              <Badge key={tag} variant="default">{tag}</Badge>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="grid sm-2 md-4" style={{ gap: 20 }}>
          {stats.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              changeType={stat.changeType}
              icon={stat.icon}
            />
          ))}
        </div>
      </div>

      {/* Kanban Board */}
      <KanbanBoard
        tasks={tasks}
        onTaskUpdate={handleTaskUpdate}
        onTaskDelete={handleTaskDelete}
        onTaskCreate={handleTaskCreate}
      />

      {/* Edit Task Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Редактировать задачу"
        size="large"
      >
        <TaskForm
          task={editingTask}
          onSubmit={handleTaskSubmit}
          onCancel={() => setIsEditModalOpen(false)}
        />
      </Modal>
    </Container>
  )
}
