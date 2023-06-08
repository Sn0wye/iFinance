import Image from 'next/image';

import { NewTransactionModal } from '../NewTransactionModal';
import {
  HeaderContainer,
  HeaderContent,
  NewTransactionButton,
  RightGroup
} from './styles';
import { UserButton, useUser } from '@clerk/nextjs';

export const Header = () => {
  const { user } = useUser();
  return (
    <HeaderContainer>
      <HeaderContent>
        <Image width={36} height={36} src='/logo.svg' alt='iFinance logo' />

        <RightGroup>
          <NewTransactionModal>
            <NewTransactionButton>New Transaction</NewTransactionButton>
          </NewTransactionModal>
          <UserButton afterSignOutUrl='/' />
        </RightGroup>
      </HeaderContent>
    </HeaderContainer>
  );
};
