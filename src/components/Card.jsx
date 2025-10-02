export default function Card({ title, subtitle, children }) {
  return (
    <div className="card">
      {title && <h3 style={{ marginTop: 0, marginBottom: 6 }}>{title}</h3>}
      {subtitle && <p style={{ marginTop: 0, color: "var(--muted)" }}>{subtitle}</p>}
      {children}
    </div>
  )
}





