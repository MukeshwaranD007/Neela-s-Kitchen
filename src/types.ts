export type Page = 'new-bill' | 'monthly-report' | 'history';

export interface BillItem {
  id: string;
  name: string;
  description: string;
  quantity: string;
  unitPrice: number;
  total: number;
}

export interface Transaction {
  id: string;
  date: string;
  client: string;
  clientInitials: string;
  total: number;
  status: 'PAID' | 'PENDING';
  type: 'LUNCH' | 'DINNER';
}

export interface ExportRecord {
  id: string;
  name: string;
  date: string;
  period: string;
  size: string;
  type: 'pdf' | 'doc';
}
