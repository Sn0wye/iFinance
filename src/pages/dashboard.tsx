import { Cardholder } from 'phosphor-react';

import { Header } from '../components/Header';
import { SearchForm } from '../components/SearchForm';
import { Summary } from '../components/Summary';
import { TransactionsTable } from '../components/TransactionsTable';
import { useTransaction } from '../hooks/useTransaction';
import { trpc } from '../utils/trpc';

const Dashboard = () => {
  const { setTransactions, transactions } = useTransaction();

  trpc.useQuery(['transactions.getAll'], {
    onSuccess: data => setTransactions(data)
  });

  return (
    <div>
      <Header />
      <Summary />

      <main className='mx-auto mt-16 w-full max-w-[1120px] px-6'>
        <SearchForm />
        <TransactionsTable />
        {transactions.length === 0 && <NoTransactions />}
      </main>
    </div>
  );
};

const NoTransactions = () => {
  return (
    <div className='mx-auto flex flex-col items-center'>
      <Cardholder size={48} alt='Clipboard Icon' className='mt-16' />
      <p className='mt-4 font-bold leading-6'>
        You don&apos;t have registered any transactions yet
      </p>
      <p className='leading-6'>
        Create new transactions and organize your finances
      </p>
    </div>
  );
};

export default Dashboard;
