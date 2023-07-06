import { Trash2 } from 'lucide-react';

import { api } from '~/utils/api';
import { dateFormatter, priceFormatter } from '~/utils/formatter';
import { Confirm } from './ui/confirm';
import { cn } from '~/utils/cn';

export const TransactionsTable = () => {
  const utils = api.useContext();
  const { data } = api.transactions.getAll.useQuery();

  const { mutate, isLoading } = api.transactions.delete.useMutation({
    onSuccess() {
      utils.transactions.getAll.invalidate();
    },
    async onMutate(deletedTransaction) {
      await utils.transactions.getAll.cancel();
      const prevData = utils.transactions.getAll.getData();
      utils.transactions.getAll.setData(undefined, old => {
        return old?.filter(
          transaction => transaction.id !== deletedTransaction.id
        );
      });
      return { prevData };
    },
    onError(err, _newPost, ctx) {
      utils.transactions.getAll.setData(undefined, ctx?.prevData);
    },
    onSettled() {
      utils.transactions.getAll.invalidate();
    }
  });

  if (!data) {
    return null;
  }

  return (
    <table className='table'>
      <tbody>
        {data.map(transaction => (
          <tr key={transaction.id}>
            <td width='50%'>{transaction.description}</td>
            <td>
              <span
                className={cn(
                  'text-lg font-medium',
                  transaction.type === 'INCOME'
                    ? 'text-emerald-500'
                    : 'text-red-500'
                )}
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
                onConfirm={() =>
                  mutate({
                    id: transaction.id
                  })
                }
                isLoading={isLoading}
              >
                <button className='rounded p-2 leading-none text-red-500 transition-colors hover:bg-zinc-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white'>
                  <Trash2 className='h-5 w-5' />
                </button>
              </Confirm>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
