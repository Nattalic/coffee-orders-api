export type LoanStatus = 'borrowed' | 'returned';

export interface Loan {
  id: number;
  student: string;
  equipment: string;
  status: LoanStatus;
}
