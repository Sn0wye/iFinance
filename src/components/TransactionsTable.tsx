import * as Dialog from '@radix-ui/react-dialog';
import { TrashSimple } from 'phosphor-react';

import { useTransaction } from '~/hooks/useTransaction';
import { api } from '~/utils/api';
import { dateFormatter, priceFormatter } from '~/utils/formatter';
import { Confirm } from './ui/confirm';

export const TransactionsTable = () => {
  const { filteredTransactions } = useTransaction();

  const { deleteTransaction } = useTransaction();
  const deleteMutation = api.transactions.delete.useMutation({
    onSuccess: deletedTransaction => deleteTransaction(deletedTransaction)
  });

  const handleDeleteTransaction = (transactionId: string) => {
    deleteMutation.mutate({ id: transactionId });
  };

  return (
    <table className='table'>
      <tbody>
        {filteredTransactions.map(transaction => (
          <tr key={transaction.id}>
            <td width='50%'>{transaction.description}</td>
            <td>
              <span
                className={
                  transaction.type === 'INCOME'
                    ? 'text-emerald-300'
                    : 'text-red-300'
                }
              >
                {transaction.type === 'EXPENSE' && '- '}
                {priceFormatter.format(transaction.amount)}
              </span>
            </td>
            <td>{transaction.category}</td>
            <td>{dateFormatter.format(transaction.createdAt)}</td>
            <td>
              <Confirm
                title='Delete Transaction'
                description='Are you sure you want to delete this transaction?'
                confirmMessage='Yes, delete'
                onConfirm={() => handleDeleteTransaction(transaction.id)}
                isLoading={deleteMutation.isLoading}
              >
                <button className='rounded p-2 leading-none text-red-500 transition-colors hover:bg-zinc-900'>
                  <TrashSimple size={20} />
                </button>
              </Confirm>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
