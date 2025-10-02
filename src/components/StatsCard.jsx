export default function StatsCard({ 
  title, 
  value, 
  change, 
  changeType = "neutral",
  icon,
  trend,
  className = ""
}) {
  const changeTypes = {
    positive: "stats-change-positive",
    negative: "stats-change-negative", 
    neutral: "stats-change-neutral"
  }

  return (
    <div className={`stats-card ${className}`}>
      <div className="stats-header">
        <div className="stats-icon">{icon}</div>
        <div className="stats-content">
          <h3 className="stats-title">{title}</h3>
          <div className="stats-value">{value}</div>
        </div>
      </div>
      {change && (
        <div className={`stats-change ${changeTypes[changeType]}`}>
          <span className="stats-change-value">{change}</span>
          {trend && <span className="stats-trend">{trend}</span>}
        </div>
      )}
    </div>
  )
}

