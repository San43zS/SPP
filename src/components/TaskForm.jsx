import { useState } from "react"
import Input from "./Input.jsx"
import Button from "./Button.jsx"

export default function TaskForm({ 
  task = null, 
  onSubmit, 
  onCancel,
  className = ""
}) {
  const [formData, setFormData] = useState({
    title: task?.title || "",
    description: task?.description || "",
    assignee: task?.assignee || "",
    priority: task?.priority || "medium",
    status: task?.status || "todo",
    tags: task?.tags?.join(", ") || ""
  })

  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = "Название задачи обязательно"
    }
    
    if (!formData.assignee.trim()) {
      newErrors.assignee = "Исполнитель обязателен"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    const taskData = {
      ...formData,
      tags: formData.tags ? formData.tags.split(",").map(tag => tag.trim()).filter(tag => tag) : [],
      id: task?.id || Date.now().toString(),
      createdAt: task?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    onSubmit(taskData)
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <Input
          label="Название задачи *"
          placeholder="Введите название задачи"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          error={errors.title}
          icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 12l2 2 4-4"/>
              <circle cx="12" cy="12" r="10"/>
            </svg>
          }
        />

        <div>
          <label style={{ display: "block", marginBottom: 8, fontSize: 16, fontWeight: 500, color: "var(--text)" }}>
            Описание
          </label>
          <textarea
            placeholder="Описание задачи (необязательно)"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            style={{
              width: "100%",
              minHeight: 100,
              padding: "16px",
              background: "var(--bg-elev)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              color: "var(--text)",
              fontSize: "16px",
              resize: "vertical",
              fontFamily: "inherit"
            }}
          />
        </div>

        <Input
          label="Исполнитель *"
          placeholder="Введите имя исполнителя"
          value={formData.assignee}
          onChange={(e) => handleChange("assignee", e.target.value)}
          error={errors.assignee}
          icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          }
        />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <label style={{ display: "block", marginBottom: 8, fontSize: 16, fontWeight: 500, color: "var(--text)" }}>
              Приоритет
            </label>
            <select
              value={formData.priority}
              onChange={(e) => handleChange("priority", e.target.value)}
              style={{
                width: "100%",
                padding: "16px",
                background: "var(--bg-elev)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                color: "var(--text)",
                fontSize: "16px"
              }}
            >
              <option value="low">Низкий</option>
              <option value="medium">Средний</option>
              <option value="high">Высокий</option>
            </select>
          </div>

          <div>
            <label style={{ display: "block", marginBottom: 8, fontSize: 16, fontWeight: 500, color: "var(--text)" }}>
              Статус
            </label>
            <select
              value={formData.status}
              onChange={(e) => handleChange("status", e.target.value)}
              style={{
                width: "100%",
                padding: "16px",
                background: "var(--bg-elev)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                color: "var(--text)",
                fontSize: "16px"
              }}
            >
              <option value="todo">К выполнению</option>
              <option value="in_progress">В работе</option>
              <option value="done">Выполнено</option>
              <option value="blocked">Заблокировано</option>
            </select>
          </div>
        </div>

        <Input
          label="Теги"
          placeholder="Введите теги через запятую"
          value={formData.tags}
          onChange={(e) => handleChange("tags", e.target.value)}
          icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
              <line x1="7" y1="7" x2="7.01" y2="7"/>
            </svg>
          }
        />

        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 8 }}>
          <Button 
            type="button"
            style={{ background: "var(--border)", color: "var(--text)" }}
            onClick={onCancel}
          >
            Отмена
          </Button>
          <Button type="submit">
            {task ? "Обновить задачу" : "Создать задачу"}
          </Button>
        </div>
      </div>
    </form>
  )
}

