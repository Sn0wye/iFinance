import { z } from 'zod';

import { newTransactionInput } from '../../schemas/transaction/newTransactionInput';
import { createProtectedRouter } from './context';

export const transactionsRouter = createProtectedRouter()
  .query('getAll', {
    async resolve({ ctx }) {
      return await ctx.prisma.transaction.findMany({
        where: {
          userId: ctx.session.user.id
        }
      });
    }
  })
  .mutation('create', {
    input: newTransactionInput,
    async resolve({ input, ctx }) {
      return await ctx.prisma.transaction.create({
        data: {
          ...input,
          userId: ctx.session.user.id
        }
      });
    }
  })
  .mutation('delete', {
    input: z.string(),
    async resolve({ input, ctx }) {
      return await ctx.prisma.transaction.delete({
        where: {
          id: input
        }
      });
    }
  });
