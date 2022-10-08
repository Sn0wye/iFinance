import * as Popover from '@radix-ui/react-popover';
import { signOut } from 'next-auth/react';
import { SignOut } from 'phosphor-react';
import { PropsWithChildren } from 'react';

import { Arrow, Button, Content } from './styles';
const Root = Popover.Root;
const Trigger = Popover.Trigger;
const Portal = Popover.Portal;

export const ProfileSettingsPopover = ({ children }: PropsWithChildren) => {
  return (
    <Root>
      <Trigger asChild>{children}</Trigger>
      <Portal>
        <Content>
          <Arrow />
          <Button onClick={() => signOut()}>
            <SignOut size={24} />
            Sign Out
          </Button>
        </Content>
      </Portal>
    </Root>
  );
};
