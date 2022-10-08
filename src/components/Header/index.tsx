import { useSession } from 'next-auth/react';
import Image from 'next/image';

import { NewTransactionModal } from '../NewTransactionModal';
import { ProfileSettingsPopover } from '../ProfileSettingsPopover';
import {
  HeaderContainer,
  HeaderContent,
  NewTransactionButton,
  ProfileImageWrapper,
  RightGroup
} from './styles';

export const Header = () => {
  const { data: session } = useSession();
  return (
    <HeaderContainer>
      <HeaderContent>
        <Image
          width={64}
          height={64}
          src='/img/logo-64x64.svg'
          alt='DT Money'
        />

        <RightGroup>
          <NewTransactionModal>
            <NewTransactionButton>New Transaction</NewTransactionButton>
          </NewTransactionModal>

          <ProfileSettingsPopover>
            <button>
              {session && session.user && session.user.image && (
                <ProfileImageWrapper title='Profile Settings'>
                  <Image
                    src={session?.user?.image}
                    alt=''
                    objectFit='cover'
                    layout='fill'
                    priority
                  />
                </ProfileImageWrapper>
              )}
            </button>
          </ProfileSettingsPopover>
        </RightGroup>
      </HeaderContent>
    </HeaderContainer>
  );
};
