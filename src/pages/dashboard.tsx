import { Header } from '~/components/Header';
import { SearchForm } from '~/components/SearchForm';
import { Summary } from '~/components/Summary';
import { TransactionsTable } from '~/components/TransactionsTable';
import { api } from '../utils/api';
import { RedirectToSignIn, SignedOut } from '@clerk/nextjs';
import { Loader2, Wallet } from 'lucide-react';

const Dashboard = () => {
  const { data, isLoading } = api.transactions.getAll.useQuery();

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
        {!isLoading && data?.length === 0 && <NoTransactions />}
      </div>
    </div>
  );
};

const NoTransactions = () => {
  return (
    <div className='mx-auto flex flex-col items-center'>
      <Wallet className='mt-16 h-12 w-12' aria-label='Clipboard Icon' />
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
