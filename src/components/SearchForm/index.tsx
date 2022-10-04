import { zodResolver } from '@hookform/resolvers/zod';
import { MagnifyingGlass } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useTransaction } from '../../hooks/useTransaction';
import { SearchFormContainer } from './styles';

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

  const handleSearch = async (data: FormFields) => {
    const { query } = data;
    filterByQuery(query);
  };

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearch)}>
      <input
        type='text'
        placeholder='Search for a transaction'
        {...register('query')}
      />
      <button type='submit' disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Search
      </button>
    </SearchFormContainer>
  );
};
