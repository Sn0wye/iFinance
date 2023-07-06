import { z } from 'zod';

import { newTransactionInput } from '../../schemas/transaction/newTransactionInput';
import { protectedProcedure, router } from '../trpc';
import { transactions } from '~/db/schema';
import { eq } from 'drizzle-orm';
import cuid from 'cuid';

export const transactionRouter = router({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.transactions.findMany({
      where: (transactions, { eq }) => eq(transactions.userId, ctx.auth.userId)
    });
  }),
  create: protectedProcedure
    .input(newTransactionInput)
    .mutation(({ ctx, input }) => {
      const id = cuid();

      return ctx.db.insert(transactions).values({
        ...input,
        id,
        userId: ctx.auth.userId
      });
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1)
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.delete(transactions).where(eq(transactions.id, input.id));
    })
});
