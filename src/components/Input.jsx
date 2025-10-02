import { useState } from "react"

export default function Input({ 
  label, 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  error,
  icon,
  className = "",
  ...props 
}) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className={`input-group ${className}`}>
      {label && <label className="input-label">{label}</label>}
      <div className={`input-wrapper ${isFocused ? 'focused' : ''} ${error ? 'error' : ''}`}>
        {icon && <div className="input-icon">{icon}</div>}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="input-field"
          {...props}
        />
      </div>
      {error && <div className="input-error">{error}</div>}
    </div>
  )
}

