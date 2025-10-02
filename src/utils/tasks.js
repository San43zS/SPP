// Filter tasks by status. tasks: Array<{ id, title, status }>
export function filterTasksByStatus(tasks, status) {
  if (!Array.isArray(tasks)) return []
  if (!status) return tasks
  return tasks.filter(t => t && String(t.status).toLowerCase() === String(status).toLowerCase())
}



