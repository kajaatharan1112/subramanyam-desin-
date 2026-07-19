import type { UserRole, PermissionHelpers } from '../types/permissions';

export const isAdmin = (role: UserRole | null): boolean => role === 'admin';

export const canEditBill = (role: UserRole | null): boolean => isAdmin(role);
export const canDeleteBill = (role: UserRole | null): boolean => isAdmin(role);
export const canDownloadBill = (role: UserRole | null): boolean => role === 'admin' || role === 'customer';
export const canViewAdminControls = (role: UserRole | null): boolean => isAdmin(role);

export const permissionHelpers: PermissionHelpers = {
  isAdmin,
  canEditBill,
  canDeleteBill,
  canDownloadBill,
  canViewAdminControls
};
