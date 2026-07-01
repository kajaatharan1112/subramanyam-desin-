export const VIEWS = {
  LOGIN: 'login',
  ADMIN_DASHBOARD: 'admin_dashboard',
  CUSTOMER_LIST: 'customer_list',
  CUSTOMER_DETAIL: 'customer_detail',
  BILL_LIST: 'bill_list',
  BILL_CREATE: 'bill_create',
  BILL_DETAIL: 'bill_detail',
  ORDER_TRACKING: 'order_tracking',
  REPORTS: 'reports',
  SETTINGS: 'settings',
  CUST_DASHBOARD: 'cust_dashboard',
  CUST_BILLS: 'cust_bills',
  CUST_ORDER_STATUS: 'cust_order_status',
}

export const ADMIN_NAV = [
  { view: VIEWS.ADMIN_DASHBOARD, label: 'Dashboard', icon: 'grid' },
  { view: VIEWS.CUSTOMER_LIST, label: 'Customers', icon: 'users' },
  { view: VIEWS.BILL_LIST, label: 'Bills', icon: 'file-text' },
  { view: VIEWS.SETTINGS, label: 'Settings', icon: 'settings' },
]

export const CUSTOMER_NAV = [
  { view: VIEWS.CUST_DASHBOARD, label: 'Dashboard', icon: 'grid' },
  { view: VIEWS.CUST_BILLS, label: 'My Bills', icon: 'file-text' },
]
