import Image from 'next/image';

import { UserButton } from '@clerk/nextjs';
import { NewTransactionModal } from './NewTransactionModal';
import { Button } from './ui/button';

export const Header = () => {
  return (
    <header className='bg-zinc-950 pb-32 pt-10'>
      <div className='mx-auto flex w-full max-w-[1120px] items-center justify-between px-6'>
        <Image
          width={36}
          height={36}
          style={{
            width: '36px',
            height: '36px'
          }}
          src='logo.svg'
          alt='iFinance logo'
        />
        <div className='flex items-center gap-2'>
          <NewTransactionModal>
            <Button>New Transaction</Button>
          </NewTransactionModal>
          <UserButton
            afterSignOutUrl='/'
            appearance={{
              variables: {
                colorPrimary: '#10b981',
                colorText: '#fff',
                colorTextSecondary: '#f4f4f5',
                colorBackground: '#18181b',
                fontFamily: 'Roboto',
                colorAlphaShade: '#fff',
                fontSmoothing: 'antialiased'
              }
            }}
          />
        </div>
      </div>
    </header>
  );
};
