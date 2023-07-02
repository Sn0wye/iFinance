import { zodResolver } from '@hookform/resolvers/zod';
import React, { ReactNode } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '~/components/ui/dialog';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { useNewTransactionModal } from '~/hooks/useNewTransactionModal';
import { useTransaction } from '~/hooks/useTransaction';
import {
  TNewTransactionInput,
  newTransactionInput
} from '~/schemas/transaction/newTransactionInput';
import { api } from '~/utils/api';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from './ui/select';

type NewTransactionModalProps = {
  children: ReactNode;
};

export const NewTransactionModal = ({ children }: NewTransactionModalProps) => {
  const { isOpen, toggle } = useNewTransactionModal();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<TNewTransactionInput>({
    resolver: zodResolver(newTransactionInput),
    defaultValues: {
      type: 'INCOME'
    }
  });

  const { createTransaction } = useTransaction();

  const { mutate, isLoading } = api.transactions.create.useMutation({
    onSuccess: data => createTransaction(data)
  });

  const handleCreateNewTransaction = async (data: TNewTransactionInput) => {
    mutate(data, {
      onSuccess: () => {
        reset();
        toggle();
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>New transaction</DialogTitle>
        </DialogHeader>
        <form
          id='new-transaction-form'
          onSubmit={handleSubmit(handleCreateNewTransaction, e =>
            console.error(e)
          )}
          className='grid gap-4 py-4'
        >
          <div className='flex flex-col gap-2'>
            <Label htmlFor='description'>Description</Label>
            <Input
              id='description'
              placeholder='Cheeseburger'
              {...register('description')}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='amount'>Amount</Label>
            <Input
              id='amount'
              placeholder='$15,00'
              {...register('amount', {
                setValueAs: Number
              })}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='category'>Category</Label>
            <Input id='category' placeholder='Food' {...register('category')} />
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='type'>Type</Label>
            <Controller<TNewTransactionInput>
              name='type'
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select a type' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='INCOME'>Income</SelectItem>
                    <SelectItem value='EXPENSE'>Expense</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </form>
        <DialogFooter>
          <Button variant='secondary' onClick={toggle}>
            Cancel
          </Button>
          <Button
            type='submit'
            form='new-transaction-form'
            isLoading={isLoading}
            disabled={isLoading}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
