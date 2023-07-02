import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react';

import { useSummary } from '../hooks/useSummary';
import { priceFormatter } from '../utils/formatter';
import { cn } from '~/utils/cn';
import { ReactNode } from 'react';

export const Summary = () => {
  const summary = useSummary();

  return (
    <section className='mx-auto -mt-20 grid w-full max-w-[1120px] grid-cols-3 gap-8 px-6'>
      <SummaryCard
        title='Incomes'
        icon={<ArrowCircleUp size={32} color='#00b37e' />}
        value={summary.income}
      />

      <SummaryCard
        title='Expenses'
        icon={<ArrowCircleDown size={32} color='#f75a68' />}
        value={summary.expense}
      />

      <SummaryCard
        variant='highlight'
        title='Total'
        icon={<CurrencyDollar size={32} color='#fff' />}
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
        variant === 'highlight' ? 'bg-emerald-500' : 'bg-zinc-800'
      )}
    >
      <header
        className={cn(
          'flex items-center justify-between',
          variant === 'highlight'
            ? 'text-lg font-bold text-white'
            : 'text-zinc-300'
        )}
      >
        <h3>{title}</h3>
        {icon}
      </header>
      <strong className='mt-4 block text-3xl'>
        {priceFormatter.format(value)}
      </strong>
    </div>
  );
};
