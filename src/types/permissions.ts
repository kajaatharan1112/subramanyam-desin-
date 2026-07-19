export type UserRole = 'admin' | 'customer';

export interface PermissionHelpers {
  isAdmin: (role: UserRole | null) => boolean;
  canEditBill: (role: UserRole | null) => boolean;
  canDeleteBill: (role: UserRole | null) => boolean;
  canDownloadBill: (role: UserRole | null) => boolean;
  canViewAdminControls: (role: UserRole | null) => boolean;
}
