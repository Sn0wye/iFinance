import { router } from './context';
import { transactionRouter } from './transaction';

export const appRouter = router({
  transactions: transactionRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
