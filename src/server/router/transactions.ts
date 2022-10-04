import { z } from 'zod';

import { newTransactionInput } from '../../schemas/transaction/newTransactionInput';
import { createRouter } from './context';

export const transactionsRouter = createRouter()
  .query('getAll', {
    async resolve({ ctx }) {
      return await ctx.prisma.transaction.findMany();
    }
  })
  .mutation('create', {
    input: newTransactionInput,
    async resolve({ input, ctx }) {
      return await ctx.prisma.transaction.create({
        data: input
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
