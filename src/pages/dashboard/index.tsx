import { Header } from '../../components/Header';
import { SearchForm } from '../../components/SearchForm';
import { Summary } from '../../components/Summary';
import { useTransaction } from '../../hooks/useTransaction';
import { dateFormatter, priceFormatter } from '../../utils/formatter';
import { trpc } from '../../utils/trpc';
import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable
} from './styles';

const Dashboard = () => {
  const { setTransactions, filteredTransactions } = useTransaction();

  trpc.useQuery(['transactions.getAll'], {
    onSuccess: data => setTransactions(data)
  });

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />

        <TransactionsTable>
          <tbody>
            {filteredTransactions.map(transaction => (
              <tr key={transaction.id}>
                <td width='50%'>{transaction.description}</td>
                <td>
                  <PriceHighlight
                    variant={
                      transaction.type === 'income' ? 'income' : 'outcome'
                    }
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
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  );
};

export default Dashboard;
