export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export enum CardStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  balance: number; // In BDT
  isActive: boolean;
  createdAt: string;
}

export interface GiftCardRate {
  id: string;
  type: string; // Apple, Visa, etc.
  rate: number; // Exchange rate to BDT
  isEnabled: boolean;
}

export interface PaymentMethod {
  id: string;
  name: string; // bKash, Rocket, etc.
  isEnabled: boolean;
  limitPerTrx: number;
}

export interface Transaction {
  id: string;
  userId: string;
  userName: string;
  cardType: string;
  cardLink: string;
  cardAmountUsd: number;
  exchangeRate: number;
  payoutAmountBdt: number;
  payoutMethod: string;
  payoutNumber: string;
  status: CardStatus;
  adminNote?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface DashboardStats {
  totalUsers: number;
  totalTransactions: number;
  totalVolumeBdt: number;
  pendingCount: number;
}
