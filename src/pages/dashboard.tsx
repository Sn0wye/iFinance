import { Cardholder } from 'phosphor-react';
import { Header } from '~/components/Header';
import { SearchForm } from '~/components/SearchForm';
import { Summary } from '~/components/Summary';
import { TransactionsTable } from '~/components/TransactionsTable';
import { useTransaction } from '../hooks/useTransaction';
import { api } from '../utils/api';
import { RedirectToSignIn, SignedOut } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';

const Dashboard = () => {
  const { setTransactions, transactions } = useTransaction();

  const { isLoading } = api.transactions.getAll.useQuery(undefined, {
    onSuccess: data => setTransactions(data),
    refetchOnWindowFocus: false
  });

  return (
    <div>
      <Header />
      <Summary />

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>

      <div className='mx-auto mt-16 w-full max-w-[1120px] px-6'>
        <SearchForm />

        {isLoading ? (
          <div className='flex h-[300px] w-full items-center justify-center'>
            <Loader2 className='h-6 w-6 animate-spin' />
          </div>
        ) : (
          <TransactionsTable />
        )}
        {!isLoading && transactions.length === 0 && <NoTransactions />}
      </div>
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
