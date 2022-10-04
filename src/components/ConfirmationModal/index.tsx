import * as Dialog from '@radix-ui/react-dialog';
import { Warning, X } from 'phosphor-react';
import { ReactElement, ReactNode, useRef } from 'react';

import { Actions, Button, Close, Content, Overlay, Title } from './styles';

interface Props {
  onConfirm: () => void;
  title: string;
  message?: string;
  // eslint-disable-next-line no-undef
  icon?: ReactElement | JSX.Element | ReactNode;
  confirmMessage?: string;
}

export const ConfirmationModal = ({
  onConfirm,
  title,
  message = 'Are you sure you want to confirm?',
  confirmMessage = 'Yes, confirm',
  icon = <Warning size={48} color='#F75A68' />
}: Props) => {
  const closeRef = useRef<HTMLButtonElement>(null);

  const handleCancel = () => {
    closeRef.current?.click();
  };

  const handleConfirm = () => {
    onConfirm();
    closeRef.current?.click();
  };

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Close ref={closeRef}>
          <X size={24} />
        </Close>
        {icon}
        <Title>{title}</Title>
        <Dialog.Description>{message}</Dialog.Description>

        <Actions>
          <Button variant='secondary' onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant='primary' onClick={handleConfirm}>
            {confirmMessage}
          </Button>
        </Actions>
      </Content>
    </Dialog.Portal>
  );
};
