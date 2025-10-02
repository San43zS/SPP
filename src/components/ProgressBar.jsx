export default function ProgressBar({ 
  value, 
  max = 100, 
  size = "medium",
  variant = "default",
  showLabel = true,
  label,
  className = ""
}) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
  
  const sizes = {
    small: "progress-sm",
    medium: "progress-md", 
    large: "progress-lg"
  }

  const variants = {
    default: "progress-default",
    primary: "progress-primary",
    success: "progress-success",
    warning: "progress-warning",
    danger: "progress-danger"
  }

  return (
    <div className={`progress-container ${className}`}>
      {showLabel && (
        <div className="progress-label">
          <span>{label || `${Math.round(percentage)}%`}</span>
        </div>
      )}
      <div className={`progress-bar ${sizes[size]}`}>
        <div 
          className={`progress-fill ${variants[variant]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

