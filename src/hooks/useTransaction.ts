import { Transaction } from '@prisma/client';
import create from 'zustand';

interface TransactionsContext {
  transactions: Transaction[];
  filteredTransactions: Transaction[];
  createTransaction: (transaction: Transaction) => void;
  setTransactions: (transactions: Transaction[]) => void;
  filterByQuery: (q: string) => void;
}

export const useTransaction = create<TransactionsContext>((set, get) => ({
  transactions: [],
  filteredTransactions: [],
  setTransactions: transactions => {
    set({ transactions, filteredTransactions: transactions });
  },
  filterByQuery: q => {
    if (q.trim() === '') {
      set(state => ({ filteredTransactions: state.transactions }));
      return;
    }
    set(state => ({
      filteredTransactions: state.transactions.filter(transaction =>
        transaction.description.toLowerCase().includes(q.toLowerCase())
      )
    }));
  },
  createTransaction: transaction => {
    set(state => ({
      transactions: [transaction, ...state.transactions],
      filteredTransactions: [transaction, ...state.transactions]
    }));
  }
}));
