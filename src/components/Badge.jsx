export default function Badge({ 
  children, 
  variant = "default", 
  size = "medium",
  className = "" 
}) {
  const variants = {
    default: "badge-default",
    primary: "badge-primary", 
    success: "badge-success",
    warning: "badge-warning",
    danger: "badge-danger",
    info: "badge-info"
  }

  const sizes = {
    small: "badge-sm",
    medium: "badge-md",
    large: "badge-lg"
  }

  return (
    <span className={`badge ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  )
}

