import { publicProcedure, router } from '../trpc';
import { transactionRouter } from './transaction';

export const rootRouter = router({
  transactions: transactionRouter
});

// export type definition of API
export type RootRouter = typeof rootRouter;
