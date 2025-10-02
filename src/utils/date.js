export function formatDateISO(date) {
  const d = date instanceof Date ? date : new Date(date)
  return d.toISOString().split("T")[0]
}

export function formatDateTime(date) {
  const d = date instanceof Date ? date : new Date(date)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  const hh = String(d.getHours()).padStart(2, "0")
  const mm = String(d.getMinutes()).padStart(2, "0")
  return `${y}-${m}-${day} ${hh}:${mm}`
}

export function addDays(date, days) {
  const d = date instanceof Date ? new Date(date.getTime()) : new Date(date)
  d.setDate(d.getDate() + Number(days || 0))
  return d
}



