
export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export interface Transaction {
  id: string;
  date: string; // YYYY-MM-DD
  description: string;
  amount: number;
  type: TransactionType;
}

export enum ViewMode {
  DAILY = 'Daily',
  MONTHLY = 'Monthly',
  ANNUAL = 'Annual',
}
