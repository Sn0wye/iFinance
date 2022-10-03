import { Header } from '../../components/Header';
import { SearchForm } from '../../components/SearchForm';
import { Summary } from '../../components/Summary';
import { dateFormatter, priceFormatter } from '../../utils/formatter';
import { trpc } from '../../utils/trpc';
import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable
} from './styles';

const Dashboard = () => {
  const { data: transactions } = trpc.useQuery(['transactions.getAll']);

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />

        <TransactionsTable>
          <tbody>
            {transactions &&
              transactions.map(transaction => (
                <tr key={transaction.id}>
                  <td width='50%'>{transaction.description}</td>
                  <td>
                    <PriceHighlight variant={transaction.type}>
                      {transaction.type === 'outcome' && '- '}
                      {priceFormatter.format(transaction.amount)}
                    </PriceHighlight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>
                    {dateFormatter.format(new Date(transaction.createdAt))}
                  </td>
                </tr>
              ))}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  );
};

export default Dashboard;
