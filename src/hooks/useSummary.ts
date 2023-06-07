import { useMemo } from 'react';

import { useTransaction } from './useTransaction';

export const useSummary = () => {
  const { transactions } = useTransaction();

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
