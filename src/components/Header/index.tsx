import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';

import { useNewTransactionModal } from '../../hooks/useNewTransactionModal';
import { NewTransactionModal } from '../NewTransactionModal';
import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles';

export const Header = () => {
  const { isOpen, toggle } = useNewTransactionModal();
  return (
    <HeaderContainer>
      <HeaderContent>
        <Image
          width={64}
          height={64}
          src='/img/logo-64x64.svg'
          alt='DT Money'
        />

        <Dialog.Root open={isOpen} onOpenChange={toggle}>
          <Dialog.Trigger asChild>
            <NewTransactionButton>New Transaction</NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  );
};
