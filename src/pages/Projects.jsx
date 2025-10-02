import { useState } from "react"
import Container from "../components/Container.jsx"
import ProjectList from "../components/ProjectList.jsx"
import Modal from "../components/Modal.jsx"
import Input from "../components/Input.jsx"
import Button from "../components/Button.jsx"

export default function Projects({ 
  projects = [], 
  onProjectView, 
  onProjectCreate, 
  onProjectUpdate, 
  onProjectDelete 
}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [newProject, setNewProject] = useState({ name: "", description: "", priority: "medium", status: "planning", tags: "" })

  const handleCreateProject = () => {
    if (newProject.name.trim()) {
      const projectData = {
        ...newProject,
        tags: newProject.tags ? newProject.tags.split(",").map(tag => tag.trim()).filter(tag => tag) : []
      }
      onProjectCreate(projectData)
      setNewProject({ name: "", description: "", priority: "medium", status: "planning", tags: "" })
      setIsModalOpen(false)
    }
  }

  const handleEditProject = (projectId) => {
    const project = projects.find(p => p.id === projectId)
    if (project) {
      setEditingProject(project)
      setNewProject({
        name: project.name,
        description: project.description,
        priority: project.priority,
        status: project.status,
        tags: project.tags?.join(", ") || ""
      })
      setIsModalOpen(true)
    }
  }

  const handleUpdateProject = () => {
    if (newProject.name.trim() && editingProject) {
      const projectData = {
        ...newProject,
        tags: newProject.tags ? newProject.tags.split(",").map(tag => tag.trim()).filter(tag => tag) : []
      }
      onProjectUpdate(editingProject.id, projectData)
      setNewProject({ name: "", description: "", priority: "medium", status: "planning", tags: "" })
      setEditingProject(null)
      setIsModalOpen(false)
    }
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setEditingProject(null)
    setNewProject({ name: "", description: "", priority: "medium", status: "planning", tags: "" })
  }

  return (
    <section style={{ minHeight: "400px", padding: "20px 0" }}>
      <Container>
        
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ marginTop: 0, marginBottom: 0, fontSize: 32, fontWeight: 700, color: "var(--text)" }}>Проекты</h2>
          <p style={{ color: "var(--muted)", marginTop: 8 }}>Всего проектов: {projects.length}</p>
        </div>
        
        <ProjectList
          projects={projects}
          onProjectEdit={handleEditProject}
          onProjectDelete={onProjectDelete}
          onProjectView={onProjectView}
          onProjectCreate={() => setIsModalOpen(true)}
        />
      </Container>

      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={editingProject ? "Редактировать проект" : "Создать новый проект"}
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
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <label style={{ display: "block", marginBottom: 8, fontSize: 16, fontWeight: 500, color: "var(--text)" }}>
                Приоритет
              </label>
              <select
                value={newProject.priority}
                onChange={(e) => setNewProject({ ...newProject, priority: e.target.value })}
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
                value={newProject.status}
                onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
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
                <option value="planning">В планах</option>
                <option value="active">Активный</option>
                <option value="completed">Завершен</option>
                <option value="paused">Приостановлен</option>
              </select>
            </div>
          </div>
          <Input
            label="Теги"
            placeholder="Введите теги через запятую"
            value={newProject.tags}
            onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })}
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
                <line x1="7" y1="7" x2="7.01" y2="7"/>
              </svg>
            }
          />
          <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 8 }}>
            <Button 
              style={{ background: "var(--border)", color: "var(--text)" }}
              onClick={handleModalClose}
            >
              Отмена
            </Button>
            <Button onClick={editingProject ? handleUpdateProject : handleCreateProject}>
              {editingProject ? "Обновить проект" : "Создать проект"}
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  )
}


