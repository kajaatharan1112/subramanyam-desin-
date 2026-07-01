export const ORDER_STATUSES = [
  { key: 'created', label: 'Created', color: '#6366f1', icon: '📋' },
  { key: 'design_started', label: 'Design Started', color: '#8b5cf6', icon: '🎨' },
  { key: 'in_progress', label: 'In Progress', color: '#f59e0b', icon: '⚙️' },
  { key: 'quality_check', label: 'Quality Check', color: '#06b6d4', icon: '🔍' },
  { key: 'ready_delivery', label: 'Ready for Delivery', color: '#10b981', icon: '📦' },
  { key: 'delivered', label: 'Delivered', color: '#22c55e', icon: '🚚' },
  { key: 'completed', label: 'Completed', color: '#059669', icon: '✅' },
]

export const PRIORITY_LEVELS = [
  { key: 'low', label: 'Low', color: '#6b7280' },
  { key: 'medium', label: 'Medium', color: '#f59e0b' },
  { key: 'high', label: 'High', color: '#f97316' },
  { key: 'urgent', label: 'Urgent', color: '#ef4444' },
]

export const BILL_FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'today', label: 'Today' },
  { key: 'yesterday', label: 'Yesterday' },
  { key: 'this_week', label: 'This Week' },
  { key: 'this_month', label: 'This Month' },
  { key: 'pending', label: 'Pending' },
  { key: 'completed', label: 'Completed' },
  { key: 'cancelled', label: 'Cancelled' },
]

export const REMINDER_TYPES = [
  { key: 'delivery', label: 'Delivery Reminder', icon: '🚚' },
  { key: 'payment', label: 'Payment Reminder', icon: '💰' },
  { key: 'pickup', label: 'Pickup Reminder', icon: '📥' },
  { key: 'custom', label: 'Custom Reminder', icon: '📝' },
]

export const NOTIFICATION_TYPES = [
  'Customer Created',
  'Bill Created',
  'Bill Updated',
  'Status Changed',
  'Reminder Sent',
  'Bill Completed',
  'Bill Cancelled',
  'Invoice Generated',
  'Delivery Reminder',
  'Payment Reminder',
]
