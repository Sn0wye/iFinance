import { z } from 'zod';

import { newTransactionInput } from '../../schemas/transaction/newTransactionInput';
import { protectedProcedure, router } from './context';

export const transactionRouter = router({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.transaction.findMany({
      where: {
        userId: ctx.auth.userId
      }
    });
  }),
  create: protectedProcedure
    .input(newTransactionInput)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.transaction.create({
        data: {
          ...input,
          userId: ctx.auth.userId
        }
      });
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1)
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.transaction.delete({
        where: {
          id: input.id
        }
      });
    })
});
