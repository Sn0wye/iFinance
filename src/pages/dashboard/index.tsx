import { Header } from '../../components/Header';
import { SearchForm } from '../../components/SearchForm';
import { Summary } from '../../components/Summary';
import { TransactionsTable } from '../../components/TransactionsTable';
import { useTransaction } from '../../hooks/useTransaction';
import { trpc } from '../../utils/trpc';
import { TransactionsContainer } from './styles';

const Dashboard = () => {
  const { setTransactions } = useTransaction();

  trpc.useQuery(['transactions.getAll'], {
    onSuccess: data => setTransactions(data)
  });

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable />
      </TransactionsContainer>
    </div>
  );
};

export default Dashboard;
