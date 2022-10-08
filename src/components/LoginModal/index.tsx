import * as Dialog from '@radix-ui/react-dialog';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { X } from 'phosphor-react';

import { Button, Close, Content, Group, Overlay, Title } from './styles';

export const LoginModal = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (session) {
    router.push('/dashboard');
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Close>
          <X size={24} />
        </Close>
        <Title>Log in</Title>

        <Group>
          <Button
            onClick={() => signIn('github')}
            disabled={status === 'loading'}
          >
            <Image
              src='/img/github.svg'
              width={24}
              height={24}
              alt='Github icon'
            />
            Github
          </Button>
        </Group>
      </Content>
    </Dialog.Portal>
  );
};
