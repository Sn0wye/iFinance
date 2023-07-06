import { useMemo } from 'react';
import { api } from '~/utils/api';

export const useSummary = () => {
  const { data: transactions } = api.transactions.getAll.useQuery();

  if (!transactions)
    return {
      income: 0,
      expense: 0,
      total: 0
    };

  const summary = useMemo(() => {
    return transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === 'INCOME') {
          acc.income += transaction.amount;
          acc.total += transaction.amount;
        } else {
          acc.expense += transaction.amount;
          acc.total -= transaction.amount;
        }
        return acc;
      },
      {
        income: 0,
        expense: 0,
        total: 0
      }
    );
  }, [transactions]);

  return summary;
};
