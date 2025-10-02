export default function NavBar({ current, onChange }) {
  const navItems = [
    {
      key: "home",
      label: "Главная",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9,22 9,12 15,12 15,22"/>
        </svg>
      )
    },
    {
      key: "projects", 
      label: "Проекты",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 3h18v18H3zM9 9h6v6H9z"/>
        </svg>
      )
    },
    {
      key: "tasks",
      label: "Задачи",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 12l2 2 4-4"/>
          <circle cx="12" cy="12" r="10"/>
        </svg>
      )
    },
    {
      key: "profile",
      label: "Профиль", 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      )
    }
  ]

  const makeBtn = (item) => (
    <button 
      key={item.key} 
      onClick={() => onChange(item.key)} 
      aria-pressed={current === item.key}
      style={{ display: "flex", alignItems: "center", gap: 6 }}
    >
      {item.icon}
      <span>{item.label}</span>
    </button>
  )

  return (
    <div className="container" style={{ display: "flex", alignItems: "center", gap: 16, padding: "12px 0" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 48,
          height: 48,
          borderRadius: "12px",
          background: "linear-gradient(135deg, var(--primary), var(--primary-600))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M9 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-4"/>
            <rect x="9" y="3" width="6" height="8" rx="1"/>
          </svg>
        </div>
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>Task Manager</h1>
      </div>
      <nav className="app-nav" aria-label="Главная навигация" style={{ marginLeft: "auto" }}>
        {navItems.map(makeBtn)}
      </nav>
    </div>
  )
}



