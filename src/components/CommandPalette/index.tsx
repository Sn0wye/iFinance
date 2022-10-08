import { Action, ActionImpl, KBarPortal, KBarResults, useMatches } from 'kbar';
import { Fragment } from 'react';

import {
  Animator,
  Kbd,
  Positioner,
  ResultItemStyle,
  Search,
  Section,
  Shortcut
} from './styles';

export const CommandPalette = () => {
  return (
    <KBarPortal>
      <Positioner>
        <Animator>
          <Search placeholder='Type a command or search…' />
          <Results />
        </Animator>
      </Positioner>
    </KBarPortal>
  );
};

interface RenderParams {
  item: ActionImpl | string;
  active: boolean;
}

const Results = () => {
  const { results } = useMatches();

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }: RenderParams) =>
        typeof item === 'string' ? (
          <Section>{item}</Section>
        ) : (
          <ResultItem action={item} active={active} />
        )
      }
    />
  );
};

interface ResultItemProps {
  action: Action;
  active: boolean;
}

const ResultItem = ({ action, active }: ResultItemProps) => {
  const { icon = <Fragment />, name, shortcut: shortcuts } = action;
  return (
    <ResultItemStyle active={active}>
      {icon}
      <span>{name}</span>
      {shortcuts && (
        <Shortcut aria-hidden>
          {shortcuts.map(shortcut => (
            <Kbd key={shortcut}>{shortcut}</Kbd>
          ))}
        </Shortcut>
      )}
    </ResultItemStyle>
  );
};

ResultItem.displayName = 'ResultItem';
