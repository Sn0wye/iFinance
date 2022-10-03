import { Combobox, Dialog, Transition } from '@headlessui/react';
import { ArrowRight, MagnifyingGlass, SmileySad } from 'phosphor-react';
import {
  cloneElement,
  Fragment,
  ReactElement,
  SVGProps,
  useEffect,
  useState
} from 'react';

import { cn } from '../../utils/classnames';

interface Option {
  id: number;
  title: string;
  icon?: ReactElement;
  action?: () => void;
}

const options: Option[] = [
  {
    id: 1,
    title: 'Project 1',
    icon: <ArrowRight size={20} />,
    action: () => console.log('Project 1')
  },
  {
    id: 2,
    title: 'Project 2',
    icon: <ArrowRight size={20} />,
    action: () => console.log('Project 2')
  }
];

export const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  const filteredOptions = query
    ? options.filter(option =>
        option.title.toLowerCase().includes(query.toLowerCase())
      )
    : options;

  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey || e.altKey) && e.key === 'k') {
        setIsOpen(state => !state);
      }
    };

    window.addEventListener('keydown', onKeydown);

    return () => window.removeEventListener('keydown', onKeydown);
  }, [isOpen]);

  const handleSelection = (option: Option) => {
    setIsOpen(false);
    option.action && option.action();
  };

  return (
    <Transition.Root
      show={isOpen}
      as={Fragment}
      afterLeave={() => setQuery('')}
    >
      <Dialog
        onClose={setIsOpen}
        className='fixed inset-0 overflow-y-auto p-4 pt-[25vh]'
      >
        <Transition.Child
          enter='duration-300 ease-out'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='duration-200 ease-in'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Dialog.Overlay className='fixed inset-0 bg-black/75' />
        </Transition.Child>
        <Transition.Child
          enter='duration-300 ease-out'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='duration-200 ease-in'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
        >
          <Combobox
            as='div'
            onChange={handleSelection}
            className='relative mx-auto max-w-xl divide-y divide-zinc-700 overflow-hidden rounded-xl bg-zinc-800 shadow-2xl ring-1 ring-white/5'
          >
            <div className='flex items-center px-4'>
              <MagnifyingGlass size={24} className='text-zinc-100' />
              <Combobox.Input
                className='w-full border-0 bg-transparent p-4 text-base text-zinc-100 placeholder:text-zinc-400 focus:ring-0'
                placeholder='Search...'
                onChange={e => setQuery(e.target.value)}
                value={query}
              />
            </div>
            {filteredOptions.length > 0 && (
              <Combobox.Options static className='max-h-96 pt-4 text-base'>
                {filteredOptions.map(option => (
                  <Combobox.Option key={option.id} value={option}>
                    {({ active }) => (
                      <div
                        className={`flex items-center gap-3 p-3 ${cn(
                          active,
                          'cursor-pointer bg-zinc-900'
                        )}`}
                      >
                        {option.icon && (
                          <Icon
                            icon={option.icon}
                            className={cn(active, 'animate-shake')}
                          />
                        )}
                        <span
                          className={cn(active, 'text-white', 'text-zinc-400')}
                        >
                          {option.title}
                        </span>
                      </div>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}
            {query && filteredOptions.length === 0 && (
              <p className='flex items-center gap-3 p-3 text-zinc-400'>
                <SmileySad size={20} />
                No results found.
              </p>
            )}
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};

interface IconProps extends SVGProps<SVGSVGElement> {
  icon: ReactElement;
}

const Icon = ({ icon, ...props }: IconProps) => {
  const element = cloneElement(icon, { ...props });

  return element;
};
