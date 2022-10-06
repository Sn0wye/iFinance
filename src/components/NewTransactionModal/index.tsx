import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog';
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';
import { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useTransaction } from '../../hooks/useTransaction';
import {
  newTransactionInput,
  TNewTransactionInput
} from '../../schemas/transaction/newTransactionInput';
import { trpc } from '../../utils/trpc';
import {
  Close,
  Content,
  Error,
  Overlay,
  Title,
  TransactionType,
  TransactionTypeButton
} from './styles';

const newTransactionFormSchema = newTransactionInput;

export const NewTransactionModal = () => {
  const closeRef = useRef<HTMLButtonElement>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<TNewTransactionInput>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: {
      type: 'income'
    }
  });

  const { createTransaction } = useTransaction();

  const mutation = trpc.useMutation(['transactions.create'], {
    onSuccess: data => createTransaction(data)
  });

  const handleCreateNewTransaction = async (data: TNewTransactionInput) => {
    mutation.mutate(data);
    reset();
    closeRef.current?.click();
  };

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Title>New Transaction</Title>

        <Close ref={closeRef}>
          <X size={24} />
        </Close>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type='text'
            placeholder='Description'
            {...register('description')}
          />

          {errors.description && <Error>{errors.description.message}</Error>}
          <input
            type='number'
            placeholder='Amount'
            {...register('amount', { valueAsNumber: true })}
          />
          {errors.amount && <Error>{errors.amount.message}</Error>}

          <input type='text' placeholder='Category' {...register('category')} />
          {errors.category && <Error>{errors.category.message}</Error>}

          <Controller
            control={control}
            name='type'
            render={({ field }) => (
              <TransactionType
                onValueChange={field.onChange}
                value={field.value}
              >
                <TransactionTypeButton variant='income' value='income'>
                  <ArrowCircleUp size={24} />
                  Income
                </TransactionTypeButton>
                <TransactionTypeButton variant='outcome' value='outcome'>
                  <ArrowCircleDown size={24} />
                  Outcome
                </TransactionTypeButton>
              </TransactionType>
            )}
          />

          <button type='submit' disabled={isSubmitting}>
            Create
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  );
};
