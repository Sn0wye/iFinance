import { Combobox, Dialog, Transition } from '@headlessui/react';
import { MagnifyingGlass, SmileySad } from 'phosphor-react';
import {
  cloneElement,
  Fragment,
  ReactElement,
  SVGProps,
  useEffect,
  useState
} from 'react';

import { useCommandPalette } from '../../hooks/useCommandPalette';
import { Option, useOptions } from '../../hooks/useOptions';
import { cn } from '../../utils/classnames';

export const CommandPalette = () => {
  const options = useOptions();

  const { isOpen, toggle } = useCommandPalette();
  const [query, setQuery] = useState('');

  const filteredOptions = query
    ? options.filter(option =>
        option.title.toLowerCase().includes(query.toLowerCase())
      )
    : options;

  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey || e.altKey) && e.key === 'k') {
        toggle();
      }
    };

    window.addEventListener('keydown', onKeydown);

    return () => window.removeEventListener('keydown', onKeydown);
  }, [toggle]);

  const handleSelection = async (option: Option) => {
    toggle();
    option.action && option.action();
  };

  return (
    <Transition.Root
      show={isOpen}
      as={Fragment}
      afterLeave={() => setQuery('')}
    >
      <Dialog
        onClose={toggle}
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
                className='w-full border border-b-white bg-transparent p-4 text-base text-zinc-100 placeholder:text-zinc-400 focus:ring-0'
                placeholder='Search...'
                onChange={e => setQuery(e.target.value)}
                value={query}
              />
            </div>
            {filteredOptions.length > 0 && (
              <Combobox.Options static className='max-h-96 py-3 text-base'>
                {filteredOptions.map(option => (
                  <Combobox.Option key={option.id} value={option}>
                    {({ active }) => (
                      <div
                        className={`mx-3 flex items-center gap-3 rounded-lg p-3 ${cn(
                          active,
                          'cursor-pointer bg-zinc-900'
                        )}`}
                      >
                        <Icon
                          icon={option.icon}
                          className={cn(active, 'animate-shake')}
                        />

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
  icon?: ReactElement;
}

const Icon = ({ icon, ...props }: IconProps) => {
  if (!icon) return null;
  const element = cloneElement(icon, { ...props });

  return element;
};
