import { z } from 'zod';

export const newTransactionInput = z.object({
  description: z.string(),
  amount: z.number(),
  category: z.string(),
  type: z.enum(['INCOME', 'EXPENSE'])
});

export type TNewTransactionInput = z.infer<typeof newTransactionInput>;
