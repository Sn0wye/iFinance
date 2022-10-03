import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog';
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';
import { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useTransaction } from '../../hooks/useTransaction';
import {
  Close,
  Content,
  Error,
  Overlay,
  TransactionType,
  TransactionTypeButton
} from './styles';

const newTransactionFormSchema = z.object({
  description: z.string(),
  amount: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome'])
});

type FormFields = z.infer<typeof newTransactionFormSchema>;

export const NewTransactionModal = () => {
  const closeRef = useRef<HTMLButtonElement>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<FormFields>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: {
      type: 'income'
    }
  });

  const { createTransaction } = useTransaction();

  const handleCreateNewTransaction = async (data: FormFields) => {
    await createTransaction(data);
    reset();
    closeRef.current?.click();
  };

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>New Title</Dialog.Title>

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
