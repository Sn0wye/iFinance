import { type Action } from 'kbar';
import { Wallet, LogOut } from 'lucide-react';

import { useNewTransactionModal } from './useNewTransactionModal';
// import { useClerk } from '@clerk/nextjs';

export const useActions = () => {
  const { toggle: newTransactionModal } = useNewTransactionModal();

  // const { signOut } = useClerk();

  const actions: Action[] = [
    {
      id: 'create_new_transaction',
      name: 'Create new Transaction',
      icon: <Wallet className='h-5 w-5' />,
      perform: () => newTransactionModal(),
      keywords: 'create-new-transaction',
      shortcut: ['n', 't']
    },
    {
      id: 'signout',
      name: 'Sign out',
      icon: <LogOut className='h-5 w-5' />,
      // perform: () => signOut(),
      section: 'Account'
    }
  ];

  return actions;
};
