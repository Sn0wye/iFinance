// src/server/router/index.ts
import superjson from 'superjson';

import { createRouter } from './context';
import { protectedExampleRouter } from './protected-example-router';
import { transactionsRouter } from './transactions';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('transactions.', transactionsRouter)
  .merge('auth.', protectedExampleRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
