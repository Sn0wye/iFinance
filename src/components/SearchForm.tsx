import { Search } from 'lucide-react';
// import { z } from 'zod';

// const searchFormSchema = z.object({
//   query: z.string()
// });

// type FormFields = z.infer<typeof searchFormSchema>;

export const SearchForm = () => {
  // const [query, setQuery] = useState('');
  // const { data: transactions } = api.transactions.getAll.useQuery();

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { isSubmitting }
  // } = useForm<FormFields>({
  //   resolver: zodResolver(searchFormSchema)
  // });

  // // const handleSearch = (data: FormFields) => {
  // //   const { query } = data;
  // // };

  // const filteredTransactions = transactions?.filter(
  //   transaction =>
  //     transaction.description.toLowerCase().includes(query.toLowerCase()) ||
  //     transaction.category.toLowerCase().includes(query.toLowerCase())
  // );

  return (
    <form className='flex gap-4'>
      <input
        className='placeholder:color-zinc-500 flex-1 rounded-md bg-zinc-950 p-4 text-zinc-300 focus:outline-none focus:ring-1 focus:ring-white'
        type='text'
        placeholder='Search for a transaction'
        // value={query}
        // onChange={e => setQuery(e.target.value)}
      />
      <button
        className='flex cursor-pointer items-center gap-3 rounded-md border border-white bg-transparent p-4 text-white transition-colors hover:border-white hover:bg-white hover:text-zinc-900 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-70'
        type='submit'
        // disabled={isSubmitting}
      >
        <Search className='h-5 w-5' />
        Search
      </button>
    </form>
  );
};
