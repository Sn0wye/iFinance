import { Transaction } from '@prisma/client';
import create from 'zustand';

interface TransactionsContext {
  transactions: Transaction[];
  createTransaction: (transaction: Transaction) => void;
  setTransactions: (transactions: Transaction[]) => void;
}

export const useTransaction = create<TransactionsContext>((set, get) => ({
  transactions: [],
  setTransactions: transactions => {
    set({ transactions });
  },
  createTransaction: transaction => {
    set(state => ({ transactions: [transaction, ...state.transactions] }));
  }
}));
