import { type Action } from 'kbar';
import { Cardholder, SignOut } from 'phosphor-react';

import { useNewTransactionModal } from './useNewTransactionModal';
// import { useClerk } from '@clerk/nextjs';

export const useActions = () => {
  const { toggle: newTransactionModal } = useNewTransactionModal();

  // const { signOut } = useClerk();

  const actions: Action[] = [
    {
      id: 'create_new_transaction',
      name: 'Create new Transaction',
      icon: <Cardholder size={20} />,
      perform: () => newTransactionModal(),
      keywords: 'create-new-transaction',
      shortcut: ['n', 't']
    },
    {
      id: 'signout',
      name: 'Sign out',
      icon: <SignOut size={20} />,
      // perform: () => signOut(),
      section: 'Account'
    }
  ];

  return actions;
};
