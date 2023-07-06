import {
  datetime,
  float,
  index,
  mysqlEnum,
  mysqlTable,
  text,
  varchar
} from 'drizzle-orm/mysql-core';
import { createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

const transactionTypeEnum = mysqlEnum('transactionType', ['INCOME', 'EXPENSE']);

export const transactions = mysqlTable(
  'transactions',
  {
    id: varchar('id', { length: 36 }).primaryKey(),
    userId: varchar('userId', { length: 36 }).notNull(),
    description: text('description').notNull(),
    type: transactionTypeEnum.notNull(),
    category: varchar('category', { length: 255 }).notNull(),
    amount: float('amount').notNull(),
    createdAt: datetime('createdAt').notNull().default(new Date())
  },
  table => ({
    userIdIndex: index('userIdIndex').on(table.userId)
  })
);

export const transactionSchema = createSelectSchema(transactions, {
  userId: z.string().min(1),
  amount: z.number().int().positive(),
  category: z.string().min(1),
  createdAt: z.date(),
  description: z.string().min(1),
  id: z.string().cuid2(),
  type: z.enum(['INCOME', 'EXPENSE'])
});

export type Transaction = z.infer<typeof transactionSchema>;
