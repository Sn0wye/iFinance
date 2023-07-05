import { type ReactNode, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '~/components/ui/alert-dialog';
import { Button } from '~/components/ui/button';

interface Props {
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmMessage?: string;
  children?: ReactNode;
  isLoading?: boolean;
}

export function Confirm({
  onConfirm,
  title,
  description = 'Are you sure you want to confirm?',
  confirmMessage = 'Yes, confirm',
  isLoading = false,
  children
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant='secondary'>Cancel</Button>
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} asChild>
            <Button disabled={isLoading} isLoading={isLoading}>
              {confirmMessage}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
