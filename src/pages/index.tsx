import type { NextPage } from 'next';
import Image from 'next/image';
import { GithubLogo, List, Snowflake } from 'phosphor-react';

const Home: NextPage = () => {
  return (
    <>
      <div className='flex flex-col justify-between'>
        <nav className='z-10 mx-auto mt-8 flex w-full max-w-[1172px] items-center justify-between p-4'>
          <div className='flex items-center gap-5'>
            <a
              className='cursor-pointer text-[#27AE60] hover:text-white'
              href='https://github.com/Sn0wye/iFinance'
              target='_blank'
              rel='noreferrer'
            >
              <GithubLogo size={20} weight='bold' />
            </a>

            <a
              className='cursor-pointer text-[#27AE60] hover:text-white'
              href='https://snowye.dev'
              target='_blank'
              rel='noreferrer'
            >
              <Snowflake size={20} weight='bold' />
            </a>
          </div>
          <div className='flex items-center gap-4'>
            <Image
              alt='Three green bars side by side'
              src='/home/logo.svg'
              width={36}
              height={36}
            />
            <span className='font-overpass text-2xl font-medium text-[#EEE]'>
              iFinance
            </span>
          </div>

          <List
            size={34}
            className='cursor-pointer text-[#27AE60] hover:text-white'
          />
        </nav>

        <main className='mx-auto mt-44 flex w-full max-w-[1172px] items-center justify-between'>
          <section className='w-1/2'>
            <h1 className='break-words font-overpass text-5xl font-bold text-[#D2D2D2]'>
              Organizing your finances was never been so easy!
            </h1>
            <p className='text=[#A9A9A9] mt-6 text-2xl'>
              At iFinance we care about your future. We help you keep track of
              your money. So you can relax, have fun and turn your dreams
              possible.
            </p>
            <button className='mt-16 select-none rounded-lg border-2 border-solid border-black bg-[#27AE60] px-8 py-4 font-overpass text-2xl font-semibold shadow-[4px_4px_0_0_#000] transition-all  duration-200 ease-linear focus:shadow-none active:translate-x-1 active:translate-y-1 active:shadow-none'>
              Join us
            </button>
          </section>
          <aside className='h-full w-auto'>
            <Image
              src='/home/cards.svg'
              alt='two credit cards stack on top of each other'
              priority
              width='532'
              height='483'
            />
          </aside>
        </main>

        <div className='fixed inset-0 -z-10 h-screen w-screen'>
          <Image
            src='/home/mask.svg'
            objectFit='cover'
            layout='fill'
            alt=''
            priority
          />
        </div>
      </div>
    </>
  );
};

export default Home;
