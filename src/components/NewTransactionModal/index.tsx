import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog';
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';
import { PropsWithChildren } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useNewTransactionModal } from '../../hooks/useNewTransactionModal';
import { useTransaction } from '../../hooks/useTransaction';
import {
  newTransactionInput,
  TNewTransactionInput
} from '../../schemas/transaction/newTransactionInput';
import { api } from '../../utils/api';
import {
  Close,
  Content,
  Error,
  Overlay,
  Title,
  TransactionType,
  TransactionTypeButton
} from './styles';

const Root = Dialog.Root;
const Trigger = Dialog.Trigger;
const Portal = Dialog.Portal;

const newTransactionFormSchema = newTransactionInput;

export const NewTransactionModal = ({ children }: PropsWithChildren) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<TNewTransactionInput>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: {
      type: 'INCOME'
    }
  });

  const { createTransaction } = useTransaction();

  const mutation = api.transactions.create.useMutation({
    onSuccess: data => createTransaction(data)
  });

  const handleCreateNewTransaction = async (data: TNewTransactionInput) => {
    mutation.mutate(data);
    reset();
    toggle();
  };

  const { isOpen, toggle } = useNewTransactionModal();

  return (
    <Root open={isOpen} onOpenChange={toggle}>
      <Trigger asChild>{children}</Trigger>
      <Portal>
        <Overlay />
        <Content>
          <Title>New Transaction</Title>

          <Close>
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

            <input
              type='text'
              placeholder='Category'
              {...register('category')}
            />
            {errors.category && <Error>{errors.category.message}</Error>}

            <Controller
              control={control}
              name='type'
              render={({ field }) => (
                <TransactionType
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <TransactionTypeButton variant='INCOME' value='INCOME'>
                    <ArrowCircleUp size={24} />
                    Income
                  </TransactionTypeButton>
                  <TransactionTypeButton variant='EXPENSE' value='EXPENSE'>
                    <ArrowCircleDown size={24} />
                    Expense
                  </TransactionTypeButton>
                </TransactionType>
              )}
            />

            <button type='submit' disabled={isSubmitting}>
              Create
            </button>
          </form>
        </Content>
      </Portal>
    </Root>
  );
};
