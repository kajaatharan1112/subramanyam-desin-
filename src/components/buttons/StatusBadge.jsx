import { getStatusColor, getPriorityColor } from '../../utils/formatters.js'
import { ORDER_STATUSES, PRIORITY_LEVELS } from '../../constants/status.js'
import './StatusBadge.css'

export function StatusBadge({ status }) {
  const found = ORDER_STATUSES.find((s) => s.key === status)
  const color = getStatusColor(status)
  const label = found?.label || status

  return (
    <span
      className="status-badge"
      style={{
        background: `${color}18`,
        color: color,
        border: `1px solid ${color}30`,
      }}
    >
      <span className="status-badge__dot" style={{ background: color }} />
      {label}
    </span>
  )
}

export function PriorityBadge({ priority }) {
  const found = PRIORITY_LEVELS.find((p) => p.key === priority)
  const color = getPriorityColor(priority)
  const label = found?.label || priority

  return (
    <span
      className="priority-badge"
      style={{
        background: `${color}18`,
        color: color,
        border: `1px solid ${color}30`,
      }}
    >
      {label}
    </span>
  )
}
