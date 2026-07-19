export interface OrganizationSettings {
  organizationId: string;
  organizationName: string;
  currencyCode: string;       // ISO 4217, e.g. "LKR"
  currencyLocale: string;     // e.g. "en-LK"
  currencyDisplayMode: 'code' | 'symbol';
  defaultBillStatusId: string;
  defaultWorkflowId: string | null;
}
