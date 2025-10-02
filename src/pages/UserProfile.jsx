import { useState } from "react"
import Container from "../components/Container.jsx"
import Card from "../components/Card.jsx"
import Button from "../components/Button.jsx"
import Modal from "../components/Modal.jsx"
import Input from "../components/Input.jsx"
import StatsCard from "../components/StatsCard.jsx"
import Badge from "../components/Badge.jsx"
import ProgressBar from "../components/ProgressBar.jsx"

export default function UserProfile() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [userInfo, setUserInfo] = useState({
    name: "Иван Иванов",
    email: "ivan@example.com",
    role: "Разработчик",
    bio: "Full-stack разработчик с опытом работы с React, Node.js и современными веб-технологиями.",
    skills: ["React", "JavaScript", "Node.js", "Python", "SQL"],
    joinDate: "2024-01-01"
  })

  const [editForm, setEditForm] = useState(userInfo)

  const stats = [
    {
      title: "Активные проекты",
      value: "6",
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
      value: "127",
      change: "+23",
      changeType: "positive",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="20,6 9,17 4,12"/>
        </svg>
      )
    },
    {
      title: "Рейтинг",
      value: "4.8",
      change: "+0.2",
      changeType: "positive",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
        </svg>
      )
    },
    {
      title: "Опыт работы",
      value: "2.5 года",
      change: "+6 мес",
      changeType: "positive",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12,6 12,12 16,14"/>
        </svg>
      )
    }
  ]

  const recentActivity = [
    { action: "Завершил задачу", project: "Учебный проект", time: "2 часа назад", type: "success" },
    { action: "Создал проект", project: "Мобильное приложение", time: "1 день назад", type: "info" },
    { action: "Обновил профиль", project: "Личные данные", time: "2 дня назад", type: "warning" },
    { action: "Добавил комментарий", project: "E-commerce платформа", time: "3 дня назад", type: "default" }
  ]

  const handleSaveProfile = () => {
    setUserInfo(editForm)
    setIsEditModalOpen(false)
  }

  const getActivityIcon = (type) => {
    const icons = {
      success: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="20,6 9,17 4,12"/>
        </svg>
      ),
      info: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="16" x2="12" y2="12"/>
          <line x1="12" y1="8" x2="12.01" y2="8"/>
        </svg>
      ),
      warning: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
          <line x1="12" y1="9" x2="12" y2="13"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
      ),
      default: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      )
    }
    return icons[type] || icons.default
  }

  return (
    <section>
      <Container>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40 }}>
          <h2 style={{ marginTop: 0, marginBottom: 0, fontSize: 32, fontWeight: 700 }}>Профиль пользователя</h2>
          <Button onClick={() => setIsEditModalOpen(true)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            Редактировать
          </Button>
        </div>

        <div className="grid sm-2" style={{ gap: 24, marginBottom: 32 }}>
          <Card title="Основная информация">
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
              <div style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: "linear-gradient(135deg, var(--primary), var(--primary-600))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: 24,
                fontWeight: "bold"
              }}>
                {userInfo.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h3 style={{ margin: "0 0 4px 0", fontSize: 20 }}>{userInfo.name}</h3>
                <Badge variant="primary">{userInfo.role}</Badge>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <span>{userInfo.email}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <span>В команде с {new Date(userInfo.joinDate).toLocaleDateString()}</span>
              </div>
            </div>
            {userInfo.bio && (
              <div style={{ marginTop: 16, padding: 12, background: "rgba(99, 102, 241, 0.1)", borderRadius: 8, border: "1px solid rgba(99, 102, 241, 0.2)" }}>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5 }}>{userInfo.bio}</p>
              </div>
            )}
          </Card>

          <Card title="Навыки и технологии">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
              {userInfo.skills.map(skill => (
                <Badge key={skill} variant="info">{skill}</Badge>
              ))}
            </div>
            <div style={{ marginTop: 16 }}>
              <h4 style={{ margin: "0 0 12px 0", fontSize: 14, color: "var(--muted)" }}>Прогресс обучения</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 13 }}>React</span>
                    <span style={{ fontSize: 13, color: "var(--muted)" }}>90%</span>
                  </div>
                  <ProgressBar value={90} variant="success" size="small" />
                </div>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 13 }}>Node.js</span>
                    <span style={{ fontSize: 13, color: "var(--muted)" }}>75%</span>
                  </div>
                  <ProgressBar value={75} variant="primary" size="small" />
                </div>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 13 }}>Python</span>
                    <span style={{ fontSize: 13, color: "var(--muted)" }}>60%</span>
                  </div>
                  <ProgressBar value={60} variant="warning" size="small" />
                </div>
              </div>
            </div>
          </Card>
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

        <div>
          <h3 style={{ marginBottom: 32, fontSize: 28, fontWeight: 600 }}>Последняя активность</h3>
          <Card>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {recentActivity.map((activity, index) => (
                <div key={index} style={{ display: "flex", alignItems: "center", gap: 12, padding: 12, background: "var(--bg-elev)", borderRadius: 8 }}>
                  <div style={{ 
                    width: 32, 
                    height: 32, 
                    borderRadius: "50%", 
                    background: "rgba(99, 102, 241, 0.1)", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                    color: "var(--primary)"
                  }}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 500, marginBottom: 2 }}>{activity.action}</div>
                    <div style={{ fontSize: 13, color: "var(--muted)" }}>{activity.project}</div>
                  </div>
                  <div style={{ fontSize: 12, color: "var(--muted)" }}>{activity.time}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Container>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Редактировать профиль"
        size="medium"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Input
            label="Имя"
            placeholder="Введите ваше имя"
            value={editForm.name}
            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            }
          />
          <Input
            label="Email"
            type="email"
            placeholder="Введите ваш email"
            value={editForm.email}
            onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            }
          />
          <Input
            label="Должность"
            placeholder="Введите вашу должность"
            value={editForm.role}
            onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
              </svg>
            }
          />
          <div>
            <label style={{ display: "block", marginBottom: 6, fontSize: 14, fontWeight: 500, color: "var(--text)" }}>
              О себе
            </label>
            <textarea
              placeholder="Расскажите о себе..."
              value={editForm.bio}
              onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
              style={{
                width: "100%",
                minHeight: 80,
                padding: "12px",
                background: "var(--bg-elev)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                color: "var(--text)",
                fontSize: "14px",
                resize: "vertical"
              }}
            />
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 8 }}>
            <Button 
              style={{ background: "var(--border)", color: "var(--text)" }}
              onClick={() => setIsEditModalOpen(false)}
            >
              Отмена
            </Button>
            <Button onClick={handleSaveProfile}>
              Сохранить
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  )
}


