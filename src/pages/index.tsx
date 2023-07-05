import type { NextPage } from 'next';
import Image from 'next/image';
import { Github, Snowflake, Menu } from 'lucide-react';

import { useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const { openSignIn, user } = useClerk();
  const { push } = useRouter();

  if (user) {
    push('/dashboard');
  }

  return (
    <>
      <div className='flex flex-col justify-between'>
        <nav className='z-10 mx-auto mt-8 flex w-full max-w-[1172px] items-center justify-between p-4'>
          <div className='flex items-center gap-5'>
            <a
              className='text-brand-500 cursor-pointer hover:text-white'
              href='https://github.com/Sn0wye/iFinance'
              target='_blank'
              rel='noreferrer'
            >
              <Github size={20} />
            </a>

            <a
              className='text-brand-500 cursor-pointer hover:text-white'
              href='https://snowye.dev'
              target='_blank'
              rel='noreferrer'
            >
              <Snowflake size={20} />
            </a>
          </div>
          <div className='flex items-center gap-4'>
            <Image
              alt='Three brand bars side by side'
              src='/home/logo.svg'
              width={36}
              height={36}
            />
            <span className='font-overpass text-2xl font-medium text-gray-100'>
              iFinance
            </span>
          </div>

          <Menu
            size={34}
            className='text-brand-500 cursor-pointer hover:text-white'
          />
        </nav>

        <main className='mx-auto mt-44 flex w-full max-w-[1172px] items-center justify-between'>
          <section className='w-1/2'>
            <h1 className='font-overpass break-words text-5xl font-bold text-gray-300'>
              Organizing your finances was never been so easy!
            </h1>
            <p className='mt-6 text-2xl text-gray-400'>
              At iFinance we care about your future. We help you keep track of
              your money. So you can relax, have fun and turn your dreams
              possible.
            </p>

            <button
              onClick={() =>
                openSignIn({
                  afterSignInUrl: '/dashboard'
                })
              }
              className='bg-brand-500 font-overpass mt-16 select-none rounded-lg border-2 border-solid border-black px-8 py-4 text-2xl font-semibold shadow-[4px_4px_0_0_#000] transition-all  duration-200 ease-linear focus:shadow-none active:translate-x-1 active:translate-y-1 active:shadow-none'
            >
              Join us
            </button>
          </section>
          <aside className='h-full w-auto'>
            <Image
              src='/home/cards.svg'
              alt='two credit cards stack on top of each other'
              priority
              width='425'
              height='386'
            />
          </aside>
        </main>

        <div className='fixed inset-0 -z-10 h-screen w-screen'>
          <Image
            src='/home/mask.svg'
            style={{
              objectFit: 'cover'
            }}
            fill
            alt=''
            priority
          />
        </div>
      </div>
    </>
  );
};

export default Home;
