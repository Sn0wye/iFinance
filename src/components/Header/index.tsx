import * as Dialog from '@radix-ui/react-dialog';

import { NewTransactionModal } from '../NewTransactionModal';
import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles';

export const Header = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src='/img/logo-64x64.svg' alt='DT Money' />

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTransactionButton>New Transaction</NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  );
};
