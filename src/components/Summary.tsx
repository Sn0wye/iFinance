import { useSummary } from '../hooks/useSummary';
import { priceFormatter } from '../utils/formatter';
import { cn } from '~/utils/cn';
import { type ReactNode } from 'react';
import { TrendingDown, TrendingUp, Wallet } from 'lucide-react';

export const Summary = () => {
  const summary = useSummary();

  return (
    <section className='mx-auto -mt-20 grid w-full max-w-[1120px] grid-cols-3 gap-8 px-6'>
      <SummaryCard
        title='Incomes'
        icon={<TrendingUp className='h-8 w-8 text-emerald-500' />}
        value={summary.income}
      />

      <SummaryCard
        title='Expenses'
        icon={<TrendingDown className='h-8 w-8 text-red-500' />}
        value={summary.expense}
      />

      <SummaryCard
        variant='highlight'
        title='Total'
        icon={<Wallet className='h-8 w-8 text-zinc-900' />}
        value={summary.total}
      />
    </section>
  );
};

type SummaryCardProps = {
  variant?: 'highlight' | 'default';
  value: number;
  title?: string;
  icon?: ReactNode;
};

const SummaryCard = ({
  variant = 'default',
  value,
  title,
  icon
}: SummaryCardProps) => {
  return (
    <div
      className={cn(
        'rounded-md p-8',
        variant === 'highlight'
          ? 'bg-zinc-100 text-zinc-900'
          : 'bg-zinc-800 text-white'
      )}
    >
      <header className={cn('flex items-center justify-between')}>
        <h3>{title}</h3>
        {icon}
      </header>
      <strong className='mt-4 block text-3xl'>
        {priceFormatter.format(value)}
      </strong>
    </div>
  );
};
