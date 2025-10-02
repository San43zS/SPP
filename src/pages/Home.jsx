import { useState } from "react"
import Container from "../components/Container.jsx"
import Card from "../components/Card.jsx"
import Button from "../components/Button.jsx"
import Modal from "../components/Modal.jsx"
import Input from "../components/Input.jsx"
import StatsCard from "../components/StatsCard.jsx"
import ProgressBar from "../components/ProgressBar.jsx"
import Badge from "../components/Badge.jsx"

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newProject, setNewProject] = useState({ name: "", description: "" })

  const handleCreateProject = () => {
    if (newProject.name.trim()) {
      console.log("Creating project:", newProject)
      setNewProject({ name: "", description: "" })
      setIsModalOpen(false)
    }
  }

  const stats = [
    {
      title: "Активные проекты",
      value: "12",
      change: "+2",
      changeType: "positive",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 3h18v18H3zM9 9h6v6H9z"/>
        </svg>
      )
    },
    {
      title: "Задач выполнено",
      value: "89",
      change: "+12",
      changeType: "positive", 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="20,6 9,17 4,12"/>
        </svg>
      )
    },
    {
      title: "Команда",
      value: "8",
      change: "+1",
      changeType: "positive",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      )
    },
    {
      title: "Продуктивность",
      value: "94%",
      change: "+5%",
      changeType: "positive",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
        </svg>
      )
    }
  ]

  return (
    <section>
      <Container>
        <div className="hero">
          <div>
            <h2>Управляйте задачами красиво и просто</h2>
            <p>Создавайте проекты, распределяйте задачи и отслеживайте прогресс с помощью современного интерфейса.</p>
            <div style={{ marginTop: 32, display: "flex", gap: 16, flexWrap: "wrap" }}>
              <Button onClick={() => setIsModalOpen(true)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19"/>
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                Создать проект
              </Button>
              <Button style={{ background: "var(--border)", color: "var(--text)" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                </svg>
                Импорт задач
              </Button>
            </div>
          </div>
          <Card title="Быстрый старт" subtitle="Простые шаги для начала работы">
            <ol style={{ paddingLeft: 18, margin: 0, lineHeight: 1.6 }}>
              <li>Создайте новый проект</li>
              <li>Добавьте задачи и назначьте исполнителей</li>
              <li>Фильтруйте и отслеживайте статус выполнения</li>
              <li>Анализируйте прогресс и оптимизируйте процессы</li>
            </ol>
            <div style={{ marginTop: 16, padding: 12, background: "rgba(99, 102, 241, 0.1)", borderRadius: 8, border: "1px solid rgba(99, 102, 241, 0.2)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <Badge variant="info">Совет</Badge>
                <span style={{ fontSize: 14, fontWeight: 500 }}>Используйте теги для организации</span>
              </div>
              <p style={{ margin: 0, fontSize: 13, color: "var(--muted)" }}>
                Добавляйте теги к задачам для лучшей категоризации и поиска
              </p>
            </div>
          </Card>
        </div>

        <div style={{ marginTop: 64 }}>
          <h3 style={{ marginBottom: 32, fontSize: 28, fontWeight: 600 }}>Обзор активности</h3>
          <div className="grid sm-2 md-4" style={{ marginBottom: 32 }}>
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

        <div style={{ marginTop: 48 }}>
          <h3 style={{ marginBottom: 32, fontSize: 28, fontWeight: 600 }}>Прогресс проектов</h3>
          <div className="grid sm-2" style={{ gap: 24 }}>
            <Card title="Учебный проект" subtitle="Лабы по СПП">
              <ProgressBar value={75} label="75% завершено" variant="primary" />
              <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
                <Badge variant="success">В работе</Badge>
                <Badge variant="info">Срочно</Badge>
              </div>
            </Card>
            <Card title="Личный сайт" subtitle="Портфолио и блог">
              <ProgressBar value={45} label="45% завершено" variant="warning" />
              <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
                <Badge variant="warning">В планах</Badge>
                <Badge variant="default">Дизайн</Badge>
              </div>
            </Card>
          </div>
        </div>
      </Container>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Создать новый проект"
        size="medium"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Input
            label="Название проекта"
            placeholder="Введите название проекта"
            value={newProject.name}
            onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 3h18v18H3zM9 9h6v6H9z"/>
              </svg>
            }
          />
          <Input
            label="Описание"
            placeholder="Краткое описание проекта"
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
              </svg>
            }
          />
          <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 8 }}>
            <Button 
              style={{ background: "var(--border)", color: "var(--text)" }}
              onClick={() => setIsModalOpen(false)}
            >
              Отмена
            </Button>
            <Button onClick={handleCreateProject}>
              Создать проект
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  )
}


