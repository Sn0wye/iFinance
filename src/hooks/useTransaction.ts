import create from 'zustand';

// import { api } from '../services/api';

export interface Transaction {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  category: string;
  amount: number;
  createdAt: string;
}

type CreateTransactionData = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionsContext {
  transactions: Transaction[];
  createTransaction: (data: CreateTransactionData) => Promise<void>;
  fetchTransactions: (query?: string) => Promise<void>;
}

export const useTransaction = create<TransactionsContext>((set, get) => ({
  transactions: [],
  fetchTransactions: async query => {
    // const response = await api.get<Transaction[]>('/transactions', {
    //   params: {
    //     _sort: 'createdAt',
    //     _order: 'desc',
    //     q: query
    //   }
    // });
    // const { data } = response;
    // set({ transactions: data });
  },
  createTransaction: async data => {
    // const response = await api.post('/transactions', {
    //   ...data,
    //   createdAt: new Date()
    // });
    // if (response.status === 201) {
    //   set(state => ({ transactions: [response.data, ...state.transactions] }));
    // }
  }
}));
