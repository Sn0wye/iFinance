import { useTransaction } from '../../hooks/useTransaction';
import { dateFormatter, priceFormatter } from '../../utils/formatter';
import { PriceHighlight, TableContainer } from './styles';

export const TransactionsTable = () => {
  const { filteredTransactions } = useTransaction();

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
          </tr>
        ))}
      </tbody>
    </TableContainer>
  );
};
