import { useState } from "react"
import Container from "../components/Container.jsx"
import Card from "../components/Card.jsx"
import TaskList from "../components/TaskList.jsx"
import StatsCard from "../components/StatsCard.jsx"
import Badge from "../components/Badge.jsx"

const initialTasks = [
  {
    id: "1",
    title: "Создать компонент TaskList",
    status: "done",
    priority: "high",
    createdAt: "2024-01-20T10:00:00Z"
  },
  {
    id: "2", 
    title: "Добавить анимации для карточек",
    status: "in_progress",
    priority: "medium",
    createdAt: "2024-01-21T14:30:00Z"
  },
  {
    id: "3",
    title: "Настроить роутинг между страницами",
    status: "todo",
    priority: "low",
    createdAt: "2024-01-22T09:15:00Z"
  },
  {
    id: "4",
    title: "Добавить валидацию форм",
    status: "todo",
    priority: "medium",
    createdAt: "2024-01-22T11:45:00Z"
  },
  {
    id: "5",
    title: "Оптимизировать производительность",
    status: "blocked",
    priority: "high",
    createdAt: "2024-01-23T16:20:00Z"
  }
]

export default function Tasks() {
  const [tasks, setTasks] = useState(initialTasks)
  const [filter, setFilter] = useState("all")

  const handleTaskUpdate = (taskId, updates) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, ...updates } : task
      )
    )
  }

  const handleTaskAdd = (newTask) => {
    setTasks(prevTasks => [...prevTasks, newTask])
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === "all") return true
    return task.status === filter
  })

  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === "done").length,
    inProgress: tasks.filter(t => t.status === "in_progress").length,
    blocked: tasks.filter(t => t.status === "blocked").length
  }

  const stats = [
    {
      title: "Всего задач",
      value: taskStats.total.toString(),
      change: "+3",
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
      value: taskStats.completed.toString(),
      change: "+1",
      changeType: "positive",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="20,6 9,17 4,12"/>
        </svg>
      )
    },
    {
      title: "В работе",
      value: taskStats.inProgress.toString(),
      change: "0",
      changeType: "neutral",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12,6 12,12 16,14"/>
        </svg>
      )
    },
    {
      title: "Заблокировано",
      value: taskStats.blocked.toString(),
      change: "+1",
      changeType: "negative",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="15" y1="9" x2="9" y2="15"/>
          <line x1="9" y1="9" x2="15" y2="15"/>
        </svg>
      )
    }
  ]

  return (
    <section>
      <Container>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40 }}>
          <h2 style={{ marginTop: 0, marginBottom: 0, fontSize: 32, fontWeight: 700 }}>Управление задачами</h2>
          <div style={{ display: "flex", gap: 8 }}>
            {["all", "todo", "in_progress", "done", "blocked"].map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                style={{
                  padding: "8px 12px",
                  background: filter === status ? "var(--primary)" : "var(--border)",
                  color: filter === status ? "white" : "var(--text)",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "12px",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
              >
                {status === "all" ? "Все" :
                 status === "todo" ? "К выполнению" :
                 status === "in_progress" ? "В работе" :
                 status === "done" ? "Выполнено" : "Заблокировано"}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 40 }}>
          <h3 style={{ marginBottom: 32, fontSize: 28, fontWeight: 600 }}>Статистика</h3>
          <div className="grid sm-2 md-4">
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

        <div className="grid sm-2" style={{ gap: 24 }}>
          <Card title="Список задач" subtitle={`Показано: ${filteredTasks.length} из ${tasks.length}`}>
            <TaskList 
              tasks={filteredTasks}
              onTaskUpdate={handleTaskUpdate}
              onTaskAdd={handleTaskAdd}
            />
          </Card>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <Card title="Быстрые действия">
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <button style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "12px",
                  background: "var(--bg-elev)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  color: "var(--text)",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14,2 14,8 20,8"/>
                  </svg>
                  Экспорт задач
                </button>
                <button style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "12px",
                  background: "var(--bg-elev)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  color: "var(--text)",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7,10 12,15 17,10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Импорт задач
                </button>
                <button style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "12px",
                  background: "var(--bg-elev)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  color: "var(--text)",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 3h18v18H3zM9 9h6v6H9z"/>
                  </svg>
                  Настройки фильтров
                </button>
              </div>
            </Card>

            <Card title="Прогресс по приоритетам">
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontSize: 14 }}>Высокий приоритет</span>
                    <Badge variant="danger" size="small">
                      {tasks.filter(t => t.priority === "high").length}
                    </Badge>
                  </div>
                  <div style={{ 
                    height: 6, 
                    background: "var(--border)", 
                    borderRadius: "3px",
                    overflow: "hidden"
                  }}>
                    <div style={{
                      height: "100%",
                      width: `${(tasks.filter(t => t.priority === "high" && t.status === "done").length / Math.max(tasks.filter(t => t.priority === "high").length, 1)) * 100}%`,
                      background: "linear-gradient(90deg, #ef4444, #dc2626)",
                      transition: "width 0.3s ease"
                    }} />
                  </div>
                </div>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontSize: 14 }}>Средний приоритет</span>
                    <Badge variant="warning" size="small">
                      {tasks.filter(t => t.priority === "medium").length}
                    </Badge>
                  </div>
                  <div style={{ 
                    height: 6, 
                    background: "var(--border)", 
                    borderRadius: "3px",
                    overflow: "hidden"
                  }}>
                    <div style={{
                      height: "100%",
                      width: `${(tasks.filter(t => t.priority === "medium" && t.status === "done").length / Math.max(tasks.filter(t => t.priority === "medium").length, 1)) * 100}%`,
                      background: "linear-gradient(90deg, #f59e0b, #d97706)",
                      transition: "width 0.3s ease"
                    }} />
                  </div>
                </div>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontSize: 14 }}>Низкий приоритет</span>
                    <Badge variant="info" size="small">
                      {tasks.filter(t => t.priority === "low").length}
                    </Badge>
                  </div>
                  <div style={{ 
                    height: 6, 
                    background: "var(--border)", 
                    borderRadius: "3px",
                    overflow: "hidden"
                  }}>
                    <div style={{
                      height: "100%",
                      width: `${(tasks.filter(t => t.priority === "low" && t.status === "done").length / Math.max(tasks.filter(t => t.priority === "low").length, 1)) * 100}%`,
                      background: "linear-gradient(90deg, #3b82f6, #1d4ed8)",
                      transition: "width 0.3s ease"
                    }} />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  )
}
