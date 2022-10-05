import { ArrowRight, Cardholder } from 'phosphor-react';
import { ReactElement } from 'react';

import { useNewTransactionModal } from './useNewTransactionModal';

export interface Option {
  id: number;
  title: string;
  icon?: ReactElement;
  action?: () => void;
}

export const useOptions = () => {
  const { toggle: newTransactionModal } = useNewTransactionModal();

  const options: Option[] = [
    {
      id: 1,
      title: 'Create new Transaction',
      icon: <Cardholder size={20} />,
      action: () => newTransactionModal()
    },
    {
      id: 2,
      title: 'Project 2',
      icon: <ArrowRight size={20} />,
      action: () => console.log('Project 2')
    }
  ];

  return options;
};
