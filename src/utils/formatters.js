export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export function formatDateShort(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
  })
}

export function getInitials(name) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function generateBillNumber(index) {
  const year = new Date().getFullYear()
  const num = String(index).padStart(6, '0')
  return `INV-${year}-${num}`
}

export function getStatusColor(statusKey) {
  const colors = {
    created: '#6366f1',
    design_started: '#8b5cf6',
    in_progress: '#f59e0b',
    quality_check: '#06b6d4',
    ready_delivery: '#10b981',
    delivered: '#22c55e',
    completed: '#059669',
    cancelled: '#ef4444',
  }
  return colors[statusKey] || '#6b7280'
}

export function getPriorityColor(priorityKey) {
  const colors = {
    low: '#6b7280',
    medium: '#f59e0b',
    high: '#f97316',
    urgent: '#ef4444',
  }
  return colors[priorityKey] || '#6b7280'
}
