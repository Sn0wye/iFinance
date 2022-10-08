import { Action } from 'kbar';
import { signOut } from 'next-auth/react';
import { Cardholder, SignOut } from 'phosphor-react';

import { useNewTransactionModal } from './useNewTransactionModal';

export const useActions = () => {
  const { toggle: newTransactionModal } = useNewTransactionModal();

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
      perform: () => signOut(),
      section: 'Account'
    }
  ];

  return actions;
};
