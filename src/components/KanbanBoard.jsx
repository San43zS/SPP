import { useState } from "react"
import TaskCard from "./TaskCard.jsx"
import Button from "./Button.jsx"
import Modal from "./Modal.jsx"
import TaskForm from "./TaskForm.jsx"

export default function KanbanBoard({ 
  tasks = [], 
  onTaskUpdate, 
  onTaskDelete,
  onTaskCreate,
  className = ""
}) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [draggedTask, setDraggedTask] = useState(null)
  const [dragOverColumn, setDragOverColumn] = useState(null)

  const columns = [
    { id: "todo", title: "К выполнению", color: "var(--muted)" },
    { id: "in_progress", title: "В работе", color: "#f59e0b" },
    { id: "done", title: "Выполнено", color: "#22c55e" }
  ]

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status)
  }

  const handleDragStart = (e, task) => {
    setDraggedTask(task)
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData("text/plain", task.id)
  }

  const handleDragOver = (e, columnId) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
    setDragOverColumn(columnId)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDragOverColumn(null)
  }

  const handleDrop = (e, newStatus) => {
    e.preventDefault()
    const taskId = e.dataTransfer.getData("text/plain")
    const task = tasks.find(t => t.id === taskId)
    
    if (task && task.status !== newStatus) {
      onTaskUpdate(task.id, { status: newStatus })
    }
    setDraggedTask(null)
    setDragOverColumn(null)
  }

  const handleTaskEdit = (taskId) => {
    const task = tasks.find(t => t.id === taskId)
    setEditingTask(task)
  }

  const handleTaskSubmit = (taskData) => {
    if (editingTask) {
      onTaskUpdate(editingTask.id, taskData)
    } else {
      onTaskCreate(taskData)
    }
    setEditingTask(null)
    setIsCreateModalOpen(false)
  }

  const handleTaskCancel = () => {
    setEditingTask(null)
    setIsCreateModalOpen(false)
  }

  return (
    <div className={className}>
      {/* Header */}
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        marginBottom: 32 
      }}>
        <h2 style={{ margin: 0, fontSize: 28, fontWeight: 600 }}>Kanban доска</h2>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Добавить задачу
        </Button>
      </div>

      {/* Kanban Columns */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
        gap: 24,
        minHeight: "600px"
      }}>
        {columns.map(column => {
          const columnTasks = getTasksByStatus(column.id)
          
          return (
            <div 
              key={column.id}
              style={{
                background: dragOverColumn === column.id ? "rgba(99, 102, 241, 0.1)" : "var(--bg-elev)",
                borderRadius: "12px",
                border: dragOverColumn === column.id ? "2px dashed var(--primary)" : "1px solid var(--border)",
                padding: "20px",
                minHeight: "500px",
                transition: "all 0.2s ease"
              }}
              onDragOver={(e) => handleDragOver(e, column.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              {/* Column Header */}
              <div style={{ 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center", 
                marginBottom: 20,
                paddingBottom: 16,
                borderBottom: "1px solid var(--border)"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    background: column.color
                  }} />
                  <h3 style={{ 
                    margin: 0, 
                    fontSize: "18px", 
                    fontWeight: "600",
                    color: "var(--text)"
                  }}>
                    {column.title}
                  </h3>
                </div>
                <div style={{
                  background: "var(--border)",
                  color: "var(--text)",
                  padding: "4px 12px",
                  borderRadius: "12px",
                  fontSize: "14px",
                  fontWeight: "500"
                }}>
                  {columnTasks.length}
                </div>
              </div>

              {/* Tasks */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {columnTasks.length > 0 ? (
                  columnTasks.map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onEdit={handleTaskEdit}
                      onDelete={onTaskDelete}
                      isDragging={draggedTask?.id === task.id}
                    />
                  ))
                ) : (
                  <div style={{
                    textAlign: "center",
                    padding: "40px 20px",
                    color: "var(--muted)",
                    border: "2px dashed var(--border)",
                    borderRadius: "8px",
                    background: "var(--card)"
                  }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" style={{ margin: "0 auto 12px" }}>
                      <path d="M9 12l2 2 4-4"/>
                      <circle cx="12" cy="12" r="10"/>
                    </svg>
                    <p style={{ margin: 0, fontSize: "14px" }}>
                      {column.id === "todo" ? "Нет задач к выполнению" :
                       column.id === "in_progress" ? "Нет задач в работе" : "Нет выполненных задач"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Create/Edit Task Modal */}
      <Modal
        isOpen={isCreateModalOpen || !!editingTask}
        onClose={handleTaskCancel}
        title={editingTask ? "Редактировать задачу" : "Создать новую задачу"}
        size="large"
      >
        <TaskForm
          task={editingTask}
          onSubmit={handleTaskSubmit}
          onCancel={handleTaskCancel}
        />
      </Modal>
    </div>
  )
}
