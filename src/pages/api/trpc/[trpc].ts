// src/pages/api/trpc/[trpc].ts
import { createNextApiHandler } from '@trpc/server/adapters/next';

import { env } from '~/env.mjs';
import { rootRouter } from '../../../server/routers/root';
import { createTRPCContext } from '~/server/trpc';

// export API handler
export default createNextApiHandler({
  router: rootRouter,
  createContext: createTRPCContext,
  onError:
    env.NODE_ENV === 'development'
      ? ({ path, error }) => {
          console.error(`❌ tRPC failed on ${path}: ${error}`);
        }
      : undefined
});
