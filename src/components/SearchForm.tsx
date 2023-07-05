import { zodResolver } from '@hookform/resolvers/zod';
import { MagnifyingGlass } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useTransaction } from '../hooks/useTransaction';

const searchFormSchema = z.object({
  query: z.string()
});

type FormFields = z.infer<typeof searchFormSchema>;

export const SearchForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<FormFields>({
    resolver: zodResolver(searchFormSchema)
  });

  const { filterByQuery } = useTransaction();

  const handleSearch = (data: FormFields) => {
    const { query } = data;
    filterByQuery(query);
  };

  return (
    <form className='flex gap-4' onSubmit={handleSubmit(handleSearch)}>
      <input
        className='placeholder:color-zinc-500 flex-1 rounded-md bg-zinc-950 p-4 text-zinc-300 focus:outline-none focus:ring-1 focus:ring-white'
        type='text'
        placeholder='Search for a transaction'
        {...register('query')}
      />
      <button
        className='flex cursor-pointer items-center gap-3 rounded-md border border-white bg-transparent p-4 text-white transition-colors hover:border-white hover:bg-white hover:text-zinc-900 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-70'
        type='submit'
        disabled={isSubmitting}
      >
        <MagnifyingGlass size={20} />
        Search
      </button>
    </form>
  );
};