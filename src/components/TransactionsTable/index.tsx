import { TrashSimple } from 'phosphor-react';

import { useTransaction } from '../../hooks/useTransaction';
import { dateFormatter, priceFormatter } from '../../utils/formatter';
import { trpc } from '../../utils/trpc';
import { DeleteButton, PriceHighlight, TableContainer } from './styles';

export const TransactionsTable = () => {
  const { filteredTransactions, deleteTransaction } = useTransaction();
  const deleteMutation = trpc.useMutation('transactions.delete', {
    onSuccess: deletedTransaction => deleteTransaction(deletedTransaction)
  });

  const handleDeleteTransaction = (transactionId: string) => {
    deleteMutation.mutate(transactionId);
  };

  return (
    <TableContainer>
      <tbody>
        {filteredTransactions.map(transaction => (
          <tr key={transaction.id}>
            <td width='50%'>{transaction.description}</td>
            <td>
              <PriceHighlight
                variant={transaction.type === 'income' ? 'income' : 'outcome'}
              >
                {transaction.type === 'outcome' && '- '}
                {priceFormatter.format(transaction.amount)}
              </PriceHighlight>
            </td>
            <td>{transaction.category}</td>
            <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
            <td>
              <DeleteButton
                onClick={() => handleDeleteTransaction(transaction.id)}
              >
                <TrashSimple size={20} />
              </DeleteButton>
            </td>
          </tr>
        ))}
      </tbody>
    </TableContainer>
  );
};
